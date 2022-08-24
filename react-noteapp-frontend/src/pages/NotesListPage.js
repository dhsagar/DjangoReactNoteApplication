import React, {useState, useEffect} from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListpage = ()=>{
    let [notes, setNotes] = useState([])

    useEffect(()=>{
        getNotes()
        }, [])

    let getNotes = async ()=> {
        let response = await fetch('/api/notes/')
        let data = await response.json()
        //console.log('Data:', data)
        setNotes(data)
    }
    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className={"notes-title"}>&#9782; Notes</h2>
                <p className={"notes-count"}>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {
                    notes.map((note, index) => (
                        <ListItem key={index} note={note}/>
                        //<h3>{note.body}</h3>
                    ))
                }
            </div>
            <AddButton />
        </div>
    );
}
export default NotesListpage;