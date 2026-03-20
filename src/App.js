import logo from './img/logo.svg';
import './style/App.css';
import data from './data/data.json';

function App (){
  return (
    <div class="folderArea">
      <div class="list">
        <h1>Vos catégories:</h1>
        {data.categories.map((categories)=>
          <div class="item" key = {categories.id}
          style={{backgroundColor:categories.color}}>
            <h3>{categories.title}</h3>
            <img src={categories.icon}></img>
          </div>
        )}
        
      </div>
    <div class="text"></div>
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