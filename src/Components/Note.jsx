// Component created by Sandrine MANGUY
// code extracted from the original App.js file
// Use of:
//  - memo to improve the performance by avoiding not ncesary rerenders;
//  - confirm() added to improve the UX.

import { memo, useCallback } from 'react';
import { PropTypes } from "prop-types";

const Note = memo(function Note({note, onNoteClick, onDeleteNote}) {
  const onNoteClickCallback = useCallback(() => {onNoteClick(note)}, [onNoteClick, note]);
  const onDeleteNoteCallback = useCallback((event)=> {onDeleteNote(event, note.id)}, [onDeleteNote, note.id]);
  // console.log('render note');
  return (
    <div 
        className='note-item' 
        id={note.id} 
        onClick={onNoteClickCallback}
        aria-label='note'
      >
        <div className='note-header' aria-label='delete note button area'>
          <button 
            aria-label='delete note button'
            onClick={(event) => {
                      if(window.confirm("Please confirm you want to delete this note.")) {
                        onDeleteNoteCallback(event)
                      }
                    }}
          >X</button>
        </div>
        <h2 aria_label="note title">{note.title}</h2>
        <p aria_label="note content">{note.content}</p>  
      </div>
  )
});


Note.propTypes = {
  note: PropTypes.object.isRequired,
  onNoteClick: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

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