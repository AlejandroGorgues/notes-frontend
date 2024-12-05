import { useState } from "react"
import noteService from '../services/notes.js'

const NoteForm = ({notes, setNotes}) =>{
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }
        noteService
            .create(noteObject)
            .then(returnedNote  => {
                setNotes(notes.concat(returnedNote ))
                setNewNote('')
            })
    }
    
    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    
    
    
    return (
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    )
}
export default NoteForm