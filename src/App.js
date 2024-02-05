import ScrollButton from './Assets/ScrollButton'; // Feature created by Sandrine MANGUY
import Note from './Components/Note'; // Component created by Sandrine MANGUY
import FormField from './Components/FormField'; // Component created by Sandrine MANGUY
import './Styles/App.css'; // File modified by Sandrine MANGUY
import './Styles/Form.css'; // File created by Sandrine MANGUY
import './Styles/Note.css'; // File created by Sandrine MANGUY
import { useState, useEffect, useRef } from 'react'; // useRef added by Sandrine MANGUY
import Info from './Components/Info';

function App() {
  //  Populate the initial empty array with the data fetch from the API through the fetchNotes function
  const [notes, setNotes] = useState([]);
  const titleRef = useRef(null); // useState replaced by Sandrine MANGUY for performance optimization
  const contentRef = useRef(null); // useState replaced by Sandrine MANGUY for performance optimization
  const [selectedNote, setSelectedNote] = useState(null); // Not selected by default
  const [visibilityButton, setVisibilityButton] = useState(false); // State added by Sandrine MANGUY

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

  // Scroll button visibility added by Sandrine MANGUY
  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setVisibilityButton(true) : setVisibilityButton(false);
    }

    window.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    }
  }, []);// Only runs when the component is first mounted

  // Added to improve the accessibility by Sandrine MANGUY
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
      titleRef.current.value = null; // Clear the input ; state replaced by ref by Sandrine MANGUY to improve performance
      contentRef.current.value = null; // Clear the input ; state replaced by ref by Sandrine MANGUY to improve performance
    } catch (error) {
      console.log(error);
    }
  };

  /*//////////// */
  /* Update note */
  /*//////////// */
  // Added by Sandrine MANGUY to improve the accessibility and the UX
  const handleNoteClickedAspect = (noteId) => {
    let selectedNoteId = document.getElementById(noteId);
    selectedNoteId.style.border = "1px solid black";
    selectedNoteId.style.boxShadow = "3px 3px 10px";
  }

  const handleNoteClick = (note) => {
    // If-else added by Sandrine MANGUY
    // to prevent the user from selecting many notes and 
    // make him cancel the previous selection
    if (selectedNote === null) {
      handleScrollToTop();// Added by Sandrine MANGUY to scroll to the filled form to apply changes
      
      setSelectedNote(note); // Save the clicked note
      // console.log(note);
      titleRef.current.value = note.title; // State repkace by ref by Sandrine MANGUY to Populate the title in the form improving performance
      contentRef.current.value = note.content; // State repkace by ref by Sandrine MANGUY  to Populate the title in the form improving performance

      handleNoteClickedAspect(note.id); // Added by Sandrine MANGUY to improve the UX
    } else {
      handleCancel();
    }
  };

  // Added by Sandrine MANGUY to improve the accessibility and the UX
  const handleNoteUnclickedAspect = (noteId) => {
    let selectedNoteId = document.getElementById(noteId);
    selectedNoteId.style.border = "1px solid #ccc";
    selectedNoteId.style.boxShadow = "none";
  }

  const handleUpdateNote = async (event) => {
    // Prevent the form from automatically submitting when the "Save" button is clicked.
    event.preventDefault();

    // Condition added by Sandrine MANGUY
    // Check if a note is selected. If not, 
    // exits the function early to prevent potential errors.
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
      titleRef.current.value = null; // Clear the input ; state replace by ref by Sandrine MANGUY to improve performance
      contentRef.current.value = null; // Clear the input ; state replace by ref by Sandrine MANGUY to improve performance
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
  // Check that the note must be deleted with confirm window. 
  // Added by Sandrine MANGUY for UX reason
  const deleteNote = async (event, noteId) => {
    // Prevent the deleteNote event from interfering with the click event on the note itself.
    event.stopPropagation();

    // Check if there is a selected note in the form 
    // because in case the note to be deleted has been selected, 
    // it won't be possible to clean the form after deleting the note.
    // Then clean the form whatever is the selected note.
    // Added by Sandrine MANGUY
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
      <div> {/* Added by Sandrine MANGUY */}
        <h1>Notes App</h1> {/* Added by Sandrine MANGUY */}
        <p className='subtitle'>realized by<br/>Sandrine MANGUY</p> {/* Added by Sandrine MANGUY */}
        <form 
          className='note-form'
          onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
          >
            <FormField 
                tagName="input"
                id="title"
                placeholder="Title"
                ref={titleRef}
                /> {/*  Component created by Sandrine MANGUY*/ }
            <FormField 
                tagName="textarea"
                id="content"
                placeholder="Content"
                row={10}
                ref={contentRef}
                /> {/*  Component created by Sandrine MANGUY*/ }
          {selectedNote ? (
            <div className='edit-buttons'>
              <button type='submit'>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )
          : (
            <button type='submit'>Add note</button>
          )}
          <Info /> {/* Added by Sandrine MANGUY */}
        </form>
      </div>
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
      )} {/*  Component and condition created by Sandrine MANGUY*/ }
    </div>
  );
}

export default App;
