// commented on 20240112 because only needed for the React presentation
// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const dummyNotes = [
    {
      id: 1,
      title: "test note 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam orci. ",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    }
  ];

  const [notes, setNotes] = useState(dummyNotes);
  const [title, setTitle] = useState(''); // Void by default
  const [content, setContent] = useState(''); // Void by default
  const [selectedNote, setSelectedNote] = useState(null); // Not selected by default

  const newNote = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    // console.log("title: ", title);
    // console.log("content: ", content);
    setNotes([newNote, ...notes]); // The most recent notes is the first displayed
    setTitle(''); // Clear the input
    setContent(''); // Clear the input
    console.log(newNote);
    console.log(notes);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note); // Save the clicked note
    console.log(note);
    setTitle(note.title); // Populate the title in the form
    setContent(note.content); // Populate the title in the form
  };

  const handleUpdateNote = (event) => {
    // Prevent the form from automatically submitting when the "Save" button is clicked.
    event.preventDefault();

    // Check if a note is selected. If not, exits the function early to prevent potential errors.
    if (!selectedNote) {
      return;
    }

    // Form the updated note based on the selected note's id and the updated title and content.
    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content, 
    };

    // Generate the a new array of notes, replacing the selected note with the updated one where the id matches.
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

    setNotes(updatedNotesList); // Set the updated array in the state.
    setTitle(""); // Clean the form by resetting the value to the initial state.
    setContent(""); // Clean the form by resetting the value to the initial state.
    setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
  };

  const handleCancel = () => {
    setTitle(""); // Clean the form by resetting the value to the initial state.
    setContent(""); // Clean the form by resetting the value to the initial state.
    setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
  };
  
  // Check the note must be deleted with confirm window. Added by Sandrine MANGUY
  const deleteNote = (event, noteId) => {
    // Prevent the deleteNote event from interfering with the click event on the note itself.
    event.stopPropagation();
    // Create an array composed of all the notes excepted the one that must be deleted.
    const updatedNotes = notes.filter((note) => note.id !== noteId);
  
    setNotes(updatedNotes); // Set the updated array in the state.
  }

  return (
    // Initial code to display the react info commented on 20240112
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
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
        {
          notes.map((note) => (
            <div className='note-item' key={note.id} onClick={() => handleNoteClick(note)}>
              <div className='note-header'>
                <button onClick={(event) => {if(window.confirm("Please confirm you want to delete this note.")) {deleteNote(event, note.id)}}}>X</button>
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
