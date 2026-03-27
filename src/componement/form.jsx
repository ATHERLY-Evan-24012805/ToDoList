import Toggle from "./toggle"
import { useState } from "react"

// 1. On retire l'import de data.json ici. 
// À la place, FormTask reçoit les catégories et les fonctions d'ajout depuis App.js
function FormTask({ onClose, onAddTache, onAddDossier, categories }) {
    const [addWhat,setAddWhat] = useState("dossier")
    const [color, setColor] = useState('#ffffff')
    const [status, setStatus] = useState("nouveau");
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [mateList, setMateList] = useState('')
    const [folderId, setFolderId] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // On crée un ID unique basé sur l'heure exacte en millisecondes
        const nouvelId = Date.now();

        if (addWhat === "tache") {
            // On fabrique l'objet tâche complet
            const nouvelleTache = {
                id: nouvelId,
                title: title,
                description: description,
                date_creation: new Date().toLocaleDateString(), // Date automatique !
                date_echeance: dueDate,
                etat: status,
                equipiers: mateList
            };
            // On l'envoie à App.js avec l'ID du dossier de destination
            onAddTache(nouvelleTache, folderId);
        } else {
            // On fabrique l'objet dossier complet
            const nouveauDossier = {
                id: nouvelId,
                title: title,
                description: description,
                color: color,
                icon: "" // Vide par défaut
            };
            // On l'envoie à App.js
            onAddDossier(nouveauDossier);
        }

        // On vide les champs et on ferme la modale
        setTitle('');
        setDescription('');
        setDueDate('');
        setMateList('');
        setStatus('nouveau');
        setFolderId('');
        onClose(); 
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="taskForm">
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
                        <div style={{ backgroundColor: "aliceblue", borderRadius:"10px", padding:"1%"}}>
                            <h3>Création d'une tâche</h3>
                            <div className="gridForm">
                                <div className="el">
                                    <label>Titre (Min 5 caractères)</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" minLength="5" required /> 
                                </div>
                                <div className="el">
                                    <label>Description</label>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description de la tâche" />
                                </div>
                                <div className="el">
                                    <label>Date d'échéance</label>
                                    <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Dernier délai" required />
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
                                    <label>Collaborateur.e.s</label>
                                    <input type="text" value={mateList} onChange={(e) => setMateList(e.target.value)} placeholder="Ex: Alice, Bob" />
                                </div>
                                <div className="el">
                                    <label>Dossier de destination</label>
                                    <select value={folderId} onChange={(e) => setFolderId(e.target.value)} required>
                                        <option value="">-- Choisir un dossier --</option>
                                        {/* On utilise maintenant la variable categories reçue en prop ! */}
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit">Ajouter la tâche</button>
                        </div>
                    }
                    {addWhat === "dossier" &&
                        <div style={{ backgroundColor: "aliceblue", borderRadius:"10px", padding:"1%"}}>
                            <h3>Création d'un dossier</h3>
                            <div className="gridForm">
                                <div className="el">
                                    <label>Titre (Min 3 caractères)</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du dossier" minLength="3" required /> 
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
                                        <option value="black" style={{backgroundColor: 'black', color: 'white'}}>Noir</option>
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
export default FormTask;