import task from '../img/task.svg';
import folder from '../img/folder.svg';
import { useState } from "react";

function Toggle({onClick1,onClick2}){
    return (
        <footer className="toggle">
            <div className="button" id="folderButton" onClick={onClick1}>Dossier<img src={folder} alt="illustration fichier"></img></div>
            <div className="button" id="taskButton" onClick={onClick2}>Tâche<img src={task} alt="illustration tâche"></img></div>
        </footer>
    )
}
export default Toggle