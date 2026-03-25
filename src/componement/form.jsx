import { useState } from "react"

function FormTask(){
    // titre
    const [title, setTitle] = useState('')

    // description
    const [description, setDescription] = useState('')

    // dueDate
    const [dueDate, setDueDate] = useState('')

    // mateList
    const [mateList, setMateList] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({title,description,dueDate,mateList});

        setTitle('');
        setDescription('');
        setDueDate('');
        setMateList('');
    };

    return (
        <form onSubmit={handleSubmit} className="taskForm">
            <h3>Création du tâches</h3>
            <div className="gridForm">
                <div className="el">
                    <label>Titre</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Titre de la tache"></input> 
                </div>

                <div className="el">
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description de la tache"></input>
                </div>

                <div className="el">
                    <label>Date d'écheance</label>
                    <input type="text" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} placeholder="Dernier delait"></input>
                </div>

                <div className="el">
                    <label>Collaborateur.e.s</label>
                    <input type="text" value={mateList} onChange={(e)=>setMateList(e.target.value)} placeholder="Collaborateur.e.s"></input>
                </div>
            </div>
            <button type="submit">Ajouter la tâche</button>
        </form>
    )
}
export default FormTask