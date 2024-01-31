import './Styles/App.css';
import './Styles/Form.css';
import './Styles/Note.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  //  Populate the initial empty array with the data fetch from the API through the fetchNotes function
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(''); // Void by default
  const titleRef = useRef(null); // Added by Sandrine MANGUY for performance optimization
  const [content, setContent] = useState(''); // Void by default
  const contentRef = useRef(null); // Added by Sandrine MANGUY for performance optimization
  const [selectedNote, setSelectedNote] = useState(null); // Not selected by default

  // Check the rendering number
  console.log("render");

  //  Get all the notes.
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

  // Added to set the input value before sending the POST and PUT requests
  const handleInputOnBlur = () => {
    setTitle(titleRef.current.value);
  }
 // Added to set the textarea value before sending the POST and PUT requests
  const handleTextareaOnBlur = () => {
    setContent(contentRef.current.value);
  }

  /*///////// */
  /* Add note */
  /*///////// */
  const handleAddNote = async (event) => {
    event.preventDefault();

    // Check the title and content are already set before sending the request
    // console.log(title);
    // console.log(content);
    
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
      titleRef.current.value = null; // Clear the input
      setTitle(titleRef.current.value); // Clear the input
      contentRef.current.value = null; // Clear the input
      setContent(contentRef.current.value); // Clear the input
    } catch (error) {
      console.log(error);
    }
  };

  /*//////////// */
  /* Update note */
  /*//////////// */
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
      setTitle(note.title); // Set the title in the state
      setContent(note.content); // Set the title in the state
      titleRef.current.value = note.title; // Populate the title in the form
      contentRef.current.value = note.content; // Populate the title in the form

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

    // Check the title and content data are set before sending the request.
    // console.log(title);
    // console.log(content);

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
      titleRef.current.value = null; // Clear the input
      setTitle(titleRef.current.value); // Set the input to the initial state
      contentRef.current.value = null; // Clear the input
      setContent(contentRef.current.value); // Set the textarea to teh initial state
      setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
    } catch (error) {
      console.log(error);
    }  
  };

  const handleCancel = () => {
    handleNoteUnclickedAspect(selectedNote.id); // Remove the selected note aspect by resetting the initial CSS values.
    titleRef.current.value = null; // Clear the input
    setTitle(titleRef.current.value); // Set the input state to the initial value
    contentRef.current.value = null; // Clear the input
    setContent(contentRef.current.value); // Set the textarea state to the initial value
    setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
  };
  
  /*//////////// */
  /* Delete note */
  /*//////////// */

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
        <label htmlFor="title"  className='sr-only'>Note Title</label>
        <input 
          id="title"
          name="title"
          ref={titleRef}
          onBlur={handleInputOnBlur}
          type='text' 
          placeholder='Title' 
          required />
        <label htmlFor="content" className='sr-only'>Note Title</label>
        <textarea 
          id="content"
          name="content"
          ref={contentRef}
          onBlur={handleTextareaOnBlur}
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
