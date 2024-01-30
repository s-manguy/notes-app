import './Styles/App.css';
import './Styles/Form.css';
import './Styles/Note.css';
import { useState, useEffect } from 'react';


function App() {
  //  Populate the initial empty array with the data fetch from the API through the fetchNotes function
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(''); // Void by default
  const [content, setContent] = useState(''); // Void by default
  const [selectedNote, setSelectedNote] = useState(null); // Not selected by default

  useEffect(() => {
    //  Define the fetchNotes function
    const fetchNotes = async () => {
      try {
        // API call
        const response = await fetch("http://localhost:5000/api/notes");
        //  await for the response (an array) and convert it to JSON
        const gotNotes = await response.json();
        setNotes(gotNotes);

      } catch (error) {
        console.log(error);
      }
    };

    //  Call the fetchNotes function
    fetchNotes();
  }, []); // Only runs when the component is first mounted

  const handleAddNote = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );
      const newNote = await response.json();

      setNotes([newNote, ...notes]); // The most recent notes is the first displayed
      setTitle(''); // Clear the input
      setContent(''); // Clear the input
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteClickedAspect = (noteId) => {
    let selectedNoteId = document.getElementById(noteId);
    selectedNoteId.style.border = "1px solid black";
    selectedNoteId.style.boxShadow = "3px 3px 10px";
  }

  const handleNoteClick = (note) => {
    // prevent the user from selecting many notes and make him cancel the previous selection
    if (selectedNote === null) {
      setSelectedNote(note); // Save the clicked note
      // console.log(note);
      setTitle(note.title); // Populate the title in the form
      setContent(note.content); // Populate the title in the form
      handleNoteClickedAspect(note.id); 
    } else {
      handleCancel();
    }
  };

  const handleNoteUnclickedAspect = (noteId) => {
    let selectedNoteId = document.getElementById(noteId);
    selectedNoteId.style.border = "1px solid #ccc";
    selectedNoteId.style.boxShadow = "none";
  }

  const handleUpdateNote = async (event) => {
    // Prevent the form from automatically submitting when the "Save" button is clicked.
    event.preventDefault();

    // Check if a note is selected. If not, exits the function early to prevent potential errors.
    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch (
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const updatedNote = await response.json();

      // Generate the a new array of notes, replacing the selected note with the updated one where the id matches.
      const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

      handleNoteUnclickedAspect(selectedNote.id);
      setNotes(updatedNotesList); // Set the updated array in the state.
      setTitle(""); // Clean the form by resetting the value to the initial state.
      setContent(""); // Clean the form by resetting the value to the initial state.
      setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
    } catch (error) {
      console.log(error);
    }  
  };

  const handleCancel = () => {
    handleNoteUnclickedAspect(selectedNote.id); // Remove the selected note aspect by resetting the initial CSS values.
    setTitle(""); // Clean the form by resetting the value to the initial state.
    setContent(""); // Clean the form by resetting the value to the initial state.
    setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
  };
  
  // Check the note must be deleted with confirm window. Added by Sandrine MANGUY
  const deleteNote = async (event, noteId) => {
    // Prevent the deleteNote event from interfering with the click event on the note itself.
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      // Create an array composed of all the notes excepted the one that must be deleted.
      const updatedNotes = notes.filter(
        (note) => note.id !== noteId
      );
        
      setNotes(updatedNotes); // Set the updated array in the state.
    } catch (error) {
      console.log(error);
    }  
  };

  

  return (
    <div className='app-container'>
      <form 
        className='note-form'
        onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
        >
        <input 
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type='text' 
          placeholder='Title' 
          required />
        <textarea 
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='Content' 
          row={10} 
          required />
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type='submit'>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )
        : (
          <button type='submit'>Add note</button>
        )}
      </form>
      <div className='notes-grid'>
        {notes.map((note) => (
            <div 
              className='note-item' 
              key={note.id} 
              id={note.id} 
              onClick={() => handleNoteClick(note)}
            >
            <div className='note-header'>
              <button 
              onClick={(event) => {
                if(window.confirm("Please confirm you want to delete this note.")) {
                  deleteNote(event, note.id)
                }}}
              >X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>  
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
