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
            <div>
                <label >Titre</label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Titre de la tache"></input> 
            </div>
            <div>
                <label for={description}>Description</label>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description de la tache"></input>
            </div>

            <div>
                <label for={dueDate}>Date d'écheance</label>
                <input type="text" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} placeholder="Dernier delait"></input>
            </div>

            <div>
                <label for={mateList}>Collaborateur.e.s</label>
                <input type="text" value={mateList} onChange={(e)=>setMateList(e.target.value)} placeholder="Collaborateur.e.s"></input>
            </div>
        </form>
    )
}
export default FormTask