import logo from './img/logo.svg';
import './style/App.css';
import data from './data/data.json';
import { useState } from 'react';


function getTasksByFolder(folderId){
  const LItems = data.relations.filter(relation => relation.categorie === folderId);
  const idsDesTaches = LItems.map(relation => relation.tache);
  const LTask = data.tasks.filter(task => idsDesTaches.includes(task.id));
  return LTask;
}

function DisplayContent({ folderId }){
  console.log("laaaaaaaaaaaaaaaaaaa")

  if (folderId === null){
    return null;
  }

  const LTask = getTasksByFolder(folderId)

  return (
    <div class = "text">
      {LTask.map((task)=> (
        <div class="item" key={task.id} style ={{backgroundColor:"#808080"}}>
          <h4>{task.title}</h4>
          <p>description : {task.description}</p>
          <p>date de creation : {task.date_creation}</p>
          <p>date d'echéance : {task.date_echeance}</p>
        </div>
      ))}
    </div>
  )
}


function App (){
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  return (
    <div class="folderArea">
      <div class="list">
        <h1>Vos catégories:</h1>
        {data.categories.map((categorie)=>
          <div class="item" key = {categorie.id}
          style={{backgroundColor:categorie.color}} onClick={() => setSelectedFolderId(categorie.id)}>
            <h3>{categorie.title}</h3>
            <img src={categorie.icon}></img>
          </div>
        )}   
      </div>
      <DisplayContent folderId={selectedFolderId} />
    </div>
  )
}
export default App;


  {/* const folderArea = document.createElement("div")
  folderArea.classList.add("folderArea")
  const listArea = document.createElement("div")
  listArea.classList.add("list")
  for (const folder in folders){
    el = "<div class = 'folderName' id='" + folder.name +"'>"+folder.name +"</div>"
    listArea.innerHTML=el
  }
  folderArea.appendChild(listArea)
  return (
      
      
    </div>
  ); */}