import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes.js'
import Login from './components/Login.jsx'
import NoteForm from './components/NoteForm.jsx'
import Notification from './components/Notification.jsx'
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  
  useEffect(() => {
      noteService
      .getAll()
      .then(initialNotes  => {
          setNotes(initialNotes )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = (id) =>{
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
          .update(id, changedNote)
          .then(returnedNote => {
              setNotes(notes.map(note => note.id === id ? returnedNote : note))
            })
          .catch(() => {
              setErrorMessage(
                  `Note '${note.content}' was already removed from server`
                  )
                  setTimeout(() => {
                  setErrorMessage(null)
                  }, 5000)
          setNotes(notes.filter(n => n.id !== id))
          })
      
  }

  const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)
  return (
  <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ?
        <Login setUser={setUser} setErrorMessage={setErrorMessage}/> :
        <div>
          <p>{user.name} logged-in</p>
          {<NoteForm notes={notes} setNotes={setNotes}/>}
        </div>
      }
      <div>
          <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
          </button>
    </div>
      <ul>
      {notesToShow.map(note => 
          <Note key={note.id} 
              note={note}
              toggleImportance={()=> toggleImportanceOf(note.id)} />
      )}
      </ul>
    <Footer />
  </div>
  )
}

export default App