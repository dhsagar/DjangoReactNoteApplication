import React, {useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import { useNavigate } from 'react-router-dom';


const NotePage = ({match}) => {
    const { id } = useParams()
    const navigate = useNavigate();
    let noteId = id
    let [note, setNote] = useState(null)

    useEffect(()=>{
        getNote()
        }, [noteId])


    let getNote = async ()=> {
        if(noteId==='new') return

        let response = await fetch(`/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }
    let createNote = async ()=> {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/');
    }

    let updateNote = async ()=> {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/');

    }

    let deleteNote = async ()=> {
        fetch(`/api/notes/${noteId}/`,{
            method:"DELETE",
            headers: {
                'content-type':'applocation/json'
            }
        })
        navigate('/');
    }

    let handleSubmit = ()=> {
        if(noteId!=='new' && !note.body){
            //console.log('part1', note.body)
            deleteNote()
        } else if (noteId!=='new'){
            //console.log(note.body)
            updateNote()
        } else if (noteId==='new' && note!=null){
            //console.log('part3')
            createNote()
        }
        //issues with history, use navigate instead
    }


    return(
        <div className={"note"}>
            <div className={"note-header"}>
                <h3>

                    <ArrowLeft onClick= {handleSubmit} />

                </h3>
                {noteId!=='new'?(
                    <button onClick={deleteNote}>Delete</button>
                ):
                    (
                        <button onClick={handleSubmit}>Done</button>
                    )

                }

            </div>
            <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>

        </div>
    )
}
// do not use defuaultValue={note?.body} // use value={note?body} instead
export default NotePage