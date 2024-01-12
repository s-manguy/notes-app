// commented on 20240112 because only needed for the React presentation
// import logo from './logo.svg';
import './App.css';

function App() {
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
      <form className='note-form'>
        <input type='text' placeholder='Title' required />
        <textarea placeholder='Content' row={10} required />
        <button type='submit'>Add note</button>
      </form>
      <div className='notes-grid'>
        <div className='note-item'>
          <div className='note-header'>
            <button>X</button>
          </div>
          <h2>Note title</h2>
          <p>Note content</p>
        </div>
      </div>
    </div>
  );
}

export default App;
