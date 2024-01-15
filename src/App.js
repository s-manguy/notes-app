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

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const newNote = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    // console.log("title: ", title);
    // console.log("content: ", content);
    setNotes([newNote, ...notes]);
    setTitle(''); // Clear the input
    setContent(''); // Clear the input
  };


  
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
        onSubmit={handleAddNote}
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
        <button type='submit'>Add note</button>
      </form>
      <div className='notes-grid'>
        {
          notes.map((note) => (
            <div className='note-item' key={note.id}>
              <div className='note-header'>
                <button>X</button>
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
