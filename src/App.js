import './style/App.css';
import data from './data/data.json';
import { useState } from 'react';

import ButtonCreate from './componement/add.jsx';
import crossAdd from './img/crossAdd.svg';
import task from './img/task.svg';
import folder from './img/folder.svg';

import FormTask from './componement/form.jsx';
import Toggle from './componement/toggle.jsx';

function getTasksByFolder(folderId, relations, tasks){
  const LItems = relations.filter(relation => Number(relation.categorie) === Number(folderId));
  const idDesTaches = LItems.map(relation => relation.tache);
  const LTask = tasks.filter(task => idDesTaches.includes(task.id));
  return LTask;
}

function getcolorForTask(taskId, relations, categories){
  const LItems = relations.filter(relation => Number(relation.tache) === Number(taskId));
  if (LItems.length === 0) {
    return "#e0e0e0"; 
  }
  const idPremiereCategorie = LItems[0].categorie;
  const categorieTrouvee = categories.find(cat => Number(cat.id) === Number(idPremiereCategorie));
  return categorieTrouvee ? categorieTrouvee.color : "#e0e0e0";
}

function getColorForFolder(folderId, categories){
  const colorJson = categories.filter(categorie => Number(categorie.id) === Number(folderId))
  const color = colorJson.map(categorie => categorie.color)
  return color
}

let foldertitle = null;
let idFolder = null;

function DisplayContent({ id, isfolder, setCurrentItems, categories, tasks, relations }){
  if (id === null){
    return null;
  }
  if (isfolder){
    const currentFolder = categories.find(categorie => categorie.id === id);
    const folderColor = currentFolder ? currentFolder.color : '#e0e0e0';
    const LTask = getTasksByFolder(id, relations, tasks)

    let folderName = categories.filter(categorie => categorie.id === id)
    foldertitle = folderName.map(categorie => categorie.title)
    idFolder = id
    
    const cat = document.getElementById("categorie")
    if(cat) cat.textContent = foldertitle 

    return (
          <div className="text">
            {LTask.map((task) => (
              <div className="item" key={task.id} style={{ backgroundColor: folderColor }} onClick={() => setCurrentItems('Task')}>
                <h4>{task.title}</h4>
                <p>description : {task.description}</p>
                <p>date de creation : {task.date_creation}</p>
                <p>date d'echéance : {task.date_echeance}</p>
              </div>
            ))}
          </div>
        );
  }else{
    const currentTask = tasks.find(task => task.id === id);
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
        </div>
      </div>         
    );
  }
}


function App (){
  const [mesDossiers, setMesDossiers] = useState(data.categories);
  const [mesTaches, setMesTaches] = useState(data.tasks);
  const [mesRelations, setMesRelations] = useState(data.relations);

  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [currentView, setCurrentView] = useState('accueil');
  const [currentItems, setCurrentItems] = useState('Folder');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [critereTri, setCritereTri] = useState('titre'); 

  const ordreStatuts = {
    "nouveau": 1,
    "en attente": 2,
    "en cours": 3,
    "reussi": 4,
    "abandonné": 5
  };

  const trierTaches = (listeDeTaches) => {
    const copieTaches = [...listeDeTaches];

    if (critereTri === 'titre') {
      copieTaches.sort((a, b) => a.title.localeCompare(b.title));
    } 
    else if (critereTri === 'echeance') {
      copieTaches.sort((a, b) => new Date(a.date_echeance) - new Date(b.date_echeance));
    }
    else if (critereTri === 'etat') {

      copieTaches.sort((a, b) => ordreStatuts[a.etat] - ordreStatuts[b.etat]);
    }

    return copieTaches;
  }


  const ajouterTache = (nouvelleTache, folderId) => {
      setMesTaches([...mesTaches, nouvelleTache]); 
      if (folderId) {
          const nouvelleRelation = { tache: nouvelleTache.id, categorie: Number(folderId) };
          setMesRelations([...mesRelations, nouvelleRelation]); 
      }
  };

  const ajouterDossier = (nouveauDossier) => {
      setMesDossiers([...mesDossiers, nouveauDossier]); 
  };

  return (
    <>
      <div className="folderArea">
        {currentItems === 'Folder' &&
        <>
          <div className="list">
            <h1 id="categorie"> Vos catégories:</h1>
            {currentView === 'accueil' &&
              <ButtonCreate onClick= { () => setCurrentView('formulaireFolder')} symb={crossAdd} type={"add"}/>
            }
            {currentView === 'formulaireFolder' && 
              <>
                <FormTask 
                  onClose={() => setCurrentView('accueil')} 
                  onAddTache={ajouterTache} 
                  onAddDossier={ajouterDossier} 
                  categories={mesDossiers} 
                />
              </>
            }      
            {mesDossiers.map((categorie)=>
              <div className="item" key = {categorie.id}
              style={{backgroundColor:categorie.color}} onClick={() => setSelectedFolderId(categorie.id)}>
                <h3>{categorie.title}</h3>
                <img src={categorie.icon} alt=""></img>
              </div>
            )}
          </div>
          <DisplayContent id={selectedFolderId} isfolder={true} setCurrentItems={setCurrentItems} categories={mesDossiers} tasks={mesTaches} relations={mesRelations} />
        </>
        }
        
        {currentItems === 'Task' &&
          <>
            <div className="list">
              {foldertitle !== null &&
                <>
                <h1 id='categorie'>{foldertitle}</h1>
                {trierTaches(getTasksByFolder(idFolder, mesRelations, mesTaches)).map((task)=>
                    <div 
                    className="item" 
                    key={task.id}
                    style={{ backgroundColor: getColorForFolder(idFolder, mesDossiers)}}
                    onClick={() => setSelectedTaskId(task.id)}
                    >
                      <h3>{task.title}</h3>
                      <div>
                        {task.description}
                      </div>
                      </div>
                  )}
                </>
              }            
              <h1>Vos tâches:</h1>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Trier par :</label>
                <select value={critereTri} onChange={(e) => setCritereTri(e.target.value)} style={{ padding: '5px', borderRadius: '5px' }}>
                  <option value="titre">Ordre alphabétique</option>
                  <option value="echeance">Date d'échéance la plus proche</option>
                  <option value="etat">Statut (Nouveau → En cours → etc.)</option>
                </select>
              </div>
              {currentView === 'accueil' &&
                <ButtonCreate onClick= { () => setCurrentView('formulaireTask')} symb={crossAdd} type={"add"}/>
              }
              {currentView === 'formulaireTask' && 
                <>
                  <FormTask 
                    onClose={() => setCurrentView('accueil')} 
                    onAddTache={ajouterTache} 
                    onAddDossier={ajouterDossier} 
                    categories={mesDossiers} 
                  />
                </>
              }      
              {trierTaches(mesTaches).map((task)=>
                <div 
                className="item" 
                key={task.id}
                style={{ backgroundColor: getcolorForTask(task.id, mesRelations, mesDossiers)}}
                onClick={() => setSelectedTaskId(task.id)}
                >
                  <h3>{task.title}</h3>
                  <div>
                    {task.description}
                  </div>
                </div>
              )}
            </div>
            <DisplayContent id={selectedTaskId} isfolder={false} setCurrentItems={() => {}} categories={mesDossiers} tasks={mesTaches} relations={mesRelations} />
          </>
          }
      </div>
      <footer className='toggle'>
        <Toggle 
        content1={<img src={folder} alt="illustration fichier"></img>}
        content2={<img src={task} alt="illustration tâche"></img>}
        onClick1={ 
          () => {setCurrentItems('Folder');
          setCurrentView('accueil')}}
          onClick2={
          () => {setCurrentItems('Task');
          setCurrentView('accueil')}}/>
      </footer>
    </>
  )
}
export default App;