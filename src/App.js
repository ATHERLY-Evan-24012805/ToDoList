import './style/App.css';
import data from './data/data.json';
import { useState } from 'react';

import ButtonCreate from './componement/add.jsx';
import crossAdd from './img/crossAdd.svg';
import minusAdd from './img/minusAdd.svg';

import FormTask from './componement/form.jsx';
import Toggle from './componement/toggle.jsx';


function getTasksByFolder(folderId){
  const LItems = data.relations.filter(relation => relation.categorie === folderId);
  const idDesTaches = LItems.map(relation => relation.tache);
  const LTask = data.tasks.filter(task => idDesTaches.includes(task.id));
  return LTask;
}
function getcolorForTask(taskId){
  const LItems = data.relations.filter(relation => relation.tache === taskId);
  if (LItems.length === 0) {
    return "#e0e0e0"; 
  }
  const idPremiereCategorie = LItems[0].categorie;

  // 3. On va chercher l'objet complet de cette catégorie dans data.categories
  const categorieTrouvee = data.categories.find(cat => cat.id === idPremiereCategorie);

  // 4. Si on a bien trouvé la catégorie, on renvoie sa couleur. Sinon, le gris par défaut.
  return categorieTrouvee ? categorieTrouvee.color : "#e0e0e0";
}
function getColorForFolder(folderId){
  const colorJson = data.categories.filter(categorie => categorie.id === folderId)
  const color = colorJson.map(categorie => categorie.color)
  return color
}

let foldertitle = null;
let idFolder = null;

function DisplayContent({ id,isfolder }){
  if (id === null){
    return null;
  }
  if (isfolder){

    const currentFolder = data.categories.find(categorie => categorie.id === id);
    
    const folderColor = currentFolder ? currentFolder.color : '#e0e0e0';

    const LTask = getTasksByFolder(id)

    let folderName = data.categories.filter(categorie => categorie.id === id)
    foldertitle = folderName.map(categorie => categorie.title)
    idFolder = id
    const cat = document.getElementById("categorie")
    cat.textContent = foldertitle 

    return (
          <div className="text">
            {LTask.map((task) => (
              <div className="item" key={task.id} style={{ backgroundColor: folderColor }}>
                <h4>{task.title}</h4>
                <p>description : {task.description}</p>
                <p>date de creation : {task.date_creation}</p>
                <p>date d'echéance : {task.date_echeance}</p>
              </div>
            ))}
          </div>
        );
  }else{
    const currentTask = data.tasks.find(task => task.id === id);
    if (!currentTask) {
      return <p>Tâche introuvable.</p>;
    }
    return (
      <div className="text">
        <div className='infoTask'>
          <h3>{currentTask.title}</h3>
          <p>description : {currentTask.description}</p>
          <p>date de creation : {currentTask.date_creation} | date d'écheance : {currentTask.date_echeance}</p>
          <p>État → {currentTask.etat}</p>
          {/* <p>Équipier.e.s : {currentTask.equipiers}</p> */}
        </div>
      </div>         
    );
  }
}


function App (){
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [currentView, setCurrentView] = useState('accueil');
  const [currentItems, setCurrentItems] = useState('Folder');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  return (
    <>
      <div class="folderArea">
        {currentItems === 'Folder' &&
        <>
          <div className="list">
            <h1 id="categorie"> Vos catégories:</h1>
            {currentView === 'accueil' &&
              <ButtonCreate onClick= { () => setCurrentView('formulaireFolder')} symb={crossAdd} type={"add"}/>
            }
            {currentView === 'formulaireFolder' && 
              <>
                <ButtonCreate onClick= { () => setCurrentView('accueil')} symb={minusAdd} type={"selected"}/>
                <FormTask/>
              </>
            }      
            {data.categories.map((categorie)=>
              <div class="item" key = {categorie.id}
              style={{backgroundColor:categorie.color}} onClick={() => setSelectedFolderId(categorie.id)}>
                <h3>{categorie.title}</h3>
                <img src={categorie.icon} alt=""></img>
              </div>
            )}
          </div>
          <DisplayContent id={selectedFolderId} isfolder={true}/>
        </>
        }
        
        {currentItems === 'Task' &&
          <>
            <div className="list">
              {foldertitle !== null &&
                <>
                <h1 id='categorie'>{foldertitle}</h1>
                {getTasksByFolder(idFolder).map((task)=>
                  <>
                    <div 
                    className="item" 
                    key={task.id}
                    style={{ backgroundColor: getColorForFolder(idFolder)}}
                    onClick={() => setSelectedTaskId(task.id)}
                    >
                      <h3>{task.title}</h3>
                      <div>
                        {task.description}
                      </div>
                    </div>
                    </>
                  )}
                </>
              }            
              <h1>Vos tâches:</h1>
              {currentView === 'accueil' &&
                <ButtonCreate onClick= { () => setCurrentView('formulaireTask')} symb={crossAdd} type={"add"}/>
              }
              {currentView === 'formulaireTask' && 
                <>
                  <ButtonCreate onClick= { () => setCurrentView('accueil')} symb={minusAdd} type={"selected"}/>
                  <FormTask/>
                </>
              }      
              {data.tasks.map((task)=>
                <div 
                className="item" 
                key={task.id}
                style={{ backgroundColor: getcolorForTask(task.id)}}
                onClick={() => setSelectedTaskId(task.id)}
                >
                  <h3>{task.title}</h3>
                  <div>
                    {task.description}
                  </div>
                </div>
              )}
            </div>
            <DisplayContent id={selectedTaskId} isfolder={false}/>
          </>
          }
      </div>
      <Toggle onClick1={ 
        () => {setCurrentItems('Folder');
        setCurrentView('accueil')}}
        onClick2={
        () => {setCurrentItems('Task');
        setCurrentView('accueil')}}/>
    </>
  )
}
export default App;
