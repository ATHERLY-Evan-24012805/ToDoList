import Toggle from "./toggle"
import { useState } from "react"
// On importe les données pour lire la liste des dossiers
import data from '../data/data.json'; 

// 1. On ajoute onClose dans les paramètres du composant
function FormTask({ onClose }) {
    const [addWhat,setAddWhat] = useState("dossier")
    const [color, setColor] = useState('#ffffff')
    const [status, setStatus] = useState("nouveau");
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [mateList, setMateList] = useState('')
    
    // État pour mémoriser l'ID du dossier sélectionné
    const [folderId, setFolderId] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // On inclut le dossier dans les données envoyées
        console.log({title, description, dueDate, mateList, status, folderId});

        setTitle('');
        setDescription('');
        setDueDate('');
        setMateList('');
        setStatus('nouveau');
        setFolderId(''); 
        
        // Optionnel : on ferme la modale automatiquement après l'ajout
        // onClose(); 
    };

    return (
        // 2. Le fond grisé de la modale. Un clic dessus déclenche onClose
        <div className="modal-overlay" onClick={onClose}>
            
            {/* 3. Le conteneur du formulaire. stopPropagation bloque le clic pour ne pas fermer la modale */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <form onSubmit={handleSubmit} className="taskForm">
                    
                    {/* Bouton de fermeture en haut à droite */}
                    <button type="button" className="close-modal" onClick={onClose}>✖</button>

                    <div className="toggleForm">
                        <Toggle 
                        content1={"ajouter un tache"}
                        content2={"ajouter un dossier"}
                        onClick1={() => setAddWhat("tache")}
                        onClick2={() => setAddWhat("dossier")}
                        />
                    </div>
                    {addWhat === "tache" &&
                        <>
                        <div style={{ backgroundColor: "aliceblue", borderRadius:"10px", padding:"1%"}}>
                            <h3>Création d'une tâche</h3>
                            <div className="gridForm">
                                
                                {/* Titre : max 5 caractères avec maxLength */}
                                <div className="el">
                                    <label>Titre (Max 5 caractères)</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        placeholder="Titre"
                                        maxLength="5" 
                                        required 
                                    /> 
                                </div>

                                <div className="el">
                                    <label>Description</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description de la tâche" />
                                </div>

                                <div className="el">
                                    <label>Date d'échéance</label>
                                    <input 
                                        type="date" 
                                        value={dueDate} 
                                        onChange={(e) => setDueDate(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div className="el">
                                    <label>Statut</label>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="nouveau">Nouveau</option>
                                        <option value="en cours">En cours</option>
                                        <option value="reussi">Réussi</option>
                                        <option value="en attente">En attente</option>
                                        <option value="abandonné">Abandonné</option>
                                    </select>
                                </div>

                                <div className="el">
                                    <label>Collaborateur.e.s (séparés par une virgule)</label>
                                    <input type="text" value={mateList} onChange={(e) => setMateList(e.target.value)} placeholder="Ex: Alice, Bob" />
                                </div>
                                <div className="el">
                                    <label>Dossier de destination</label>
                                    <select 
                                        value={folderId} 
                                        onChange={(e) => setFolderId(e.target.value)} 
                                        required
                                    >
                                        <option value="">-- Choisir un dossier --</option>
                                        {data.categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit">Ajouter la tache</button>
                        </div>
                        </>

                    }
                    {addWhat === "dossier" &&
                        <div style={{ backgroundColor: "aliceblue", borderRadius:"10px", padding:"1%"}}>
                            <h3>Création d'un dossier</h3>
                            <div className="gridForm">
                                
                                {/* Titre : min 3 caractères avec minLength */}
                                <div className="el">
                                    <label>Titre (Min 3 caractères)</label>
                                    <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        placeholder="Titre du dossier" 
                                        minLength="3"
                                        required
                                    /> 
                                </div>

                                <div className="el">
                                    <label>Description</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du dossier" />
                                </div>

                                <div className="el">
                                    <label>Couleur du dossier</label>
                                    <select value={color} onChange={(e) => setColor(e.target.value)} className="color-select">
                                        <option value="">-- Choisir une couleur --</option>
                                        <option value="red" style={{backgroundColor: 'red'}}>Rouge</option>
                                        <option value="green" style={{backgroundColor: 'green'}}>Vert</option>
                                        <option value="blue" style={{backgroundColor: 'blue'}}>Bleu</option>
                                        <option value="pink" style={{backgroundColor: 'pink'}}>Rose</option>
                                        <option value="orange" style={{backgroundColor: 'orange'}}>Orange</option>
                                        <option value="aqua" style={{backgroundColor: 'aqua'}}>Turquoise</option>
                                        <option value="purple" style={{backgroundColor: 'purple'}}>Violet</option>
                                        <option value="plum" style={{backgroundColor: 'plum'}}>Framboise</option>
                                        <option value="lawgreen" style={{backgroundColor: 'lawgreen'}}>Menthe</option>
                                        <option value="white" style={{backgroundColor: 'white', color: 'white'}}>Noir</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit">Ajouter le dossier</button>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}
export default FormTask