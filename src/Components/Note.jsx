// Component created by Sandrine MANGUY
// code extracted from the original App.js file
// Use of:
//  - memo to improve the performance by avoiding not ncesary rerenders;
//  - confirm() added to improve the UX.

import {memo} from 'react';

const Note = memo(function Note({note, onNoteClick, onDeleteNote}) {
    return (
        <div 
            className='note-item' 
            id={note.id} 
            onClick={() => onNoteClick(note)}
          >
            <div className='note-header'>
              <button 
                onClick={(event) => {
                            if(window.confirm("Please confirm you want to delete this note.")) {
                            onDeleteNote(event, note.id)
                          }}}
              >X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>  
          </div>
    )
});

export default Note;


// Previous Code on App
// <div 
//   className='note-item' 
//   key={note.id} 
//   id={note.id} 
//   onClick={() => handleNoteClick(note)}
// >
//   <div className='note-header'>
//     <button 
//       onClick={(event) => {
//         if(window.confirm("Please confirm you want to delete this note.")) {
//         deleteNote(event, note.id)
//       }}}
//     >X</button>
//   </div>
//   <h2>{note.title}</h2>
//   <p>{note.content}</p>  
// </div>