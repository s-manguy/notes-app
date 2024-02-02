import ScrollButton from './Assets/ScrollButton';
import Note from './Components/Note';
import FormField from './Components/FormField';
import './Styles/App.css';
import './Styles/Form.css';
import './Styles/Note.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  //  Populate the initial empty array with the data fetch from the API through the fetchNotes function
  const [notes, setNotes] = useState([]);
  const titleRef = useRef(null); // Replaced by Sandrine MANGUY for performance optimization
  const contentRef = useRef(null); // Replaced by Sandrine MANGUY for performance optimization
  const [selectedNote, setSelectedNote] = useState(null); // Not selected by default
  const [visibilityButton, setVisibilityButton] = useState(false);

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

  // Scroll button visibility
  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setVisibilityButton(true) : setVisibilityButton(false);
    }

    window.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    }
  }, []);// Only runs when the component is first mounted

  // Added to improve the accessibility
  const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  };

  /*///////// */
  /* Add note */
  /*///////// */
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
            title: titleRef.current.value,
            content: contentRef.current.value,
          }),
        }
      );
      const newNote = await response.json();

      setNotes([newNote, ...notes]); // The most recent notes is the first displayed
      titleRef.current.value = null; // Clear the input
      contentRef.current.value = null; // Clear the input
    } catch (error) {
      console.log(error);
    }
  };

  /*//////////// */
  /* Update note */
  /*//////////// */
  // Added to improve the accessibility and the UX
  const handleNoteClickedAspect = (noteId) => {
    let selectedNoteId = document.getElementById(noteId);
    selectedNoteId.style.border = "1px solid black";
    selectedNoteId.style.boxShadow = "3px 3px 10px";
  }

  const handleNoteClick = (note) => {
    // prevent the user from selecting many notes and make him cancel the previous selection
    if (selectedNote === null) {
      handleScrollToTop();// Added to scroll to the filled form to apply changes
      
      setSelectedNote(note); // Save the clicked note
      // console.log(note);
      titleRef.current.value = note.title; // Added to Populate the title in the form improving performance
      contentRef.current.value = note.content; // Added to Populate the title in the form improving performance

      handleNoteClickedAspect(note.id); // Added to improve the UX
    } else {
      handleCancel();
    }
  };

  // Added to improve the accessibility and the UX
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
            title: titleRef.current.value,
            content: contentRef.current.value,
          }),
        }
      );

      const updatedNote = await response.json();

      // Generate the a new array of notes, replacing the selected note with the updated one where the id matches.
      const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

      handleNoteUnclickedAspect(selectedNote.id);
      setNotes(updatedNotesList); // Set the updated array in the state.
      titleRef.current.value = null; // Clear the input
      contentRef.current.value = null; // Clear the input
      setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
    } catch (error) {
      console.log(error);
    }  
  };

  const handleCancel = () => {
    handleNoteUnclickedAspect(selectedNote.id); // Remove the selected note aspect by resetting the initial CSS values.
    titleRef.current.value = null; // Clear the input
    contentRef.current.value = null; // Clear the input
    setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
  };
  
  /*//////////// */
  /* Delete note */
  /*//////////// */
  // Check the note must be deleted with confirm window. Added by Sandrine MANGUY
  const deleteNote = async (event, noteId) => {
    // Prevent the deleteNote event from interfering with the click event on the note itself.
    event.stopPropagation();

    // Check if there is a selected note in the form 
    // because in case the note to be deleted has been selected, 
    // it won't be possible to clean the form after deleting the note.
    // Then clean the form whatever is the selected note.
    if (selectedNote) {
      handleCancel(); // clean the form
    }

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
          <FormField 
              tagName="input"
              id="title"
              placeholder="Title"
              ref={titleRef}
              />
          <FormField 
              tagName="textarea"
              id="content"
              placeholder="Content"
              row={10}
              ref={contentRef}
              />
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
          <Note
            note={note}
            onNoteClick={handleNoteClick}
            onDeleteNote={deleteNote}
            key={note.id}
          />
          ))
        }
      </div>
      { visibilityButton && (
        <ScrollButton
          onClick={handleScrollToTop}
        />
      )}
    </div>
  );
}

export default App;
