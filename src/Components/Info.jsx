/* File and component added by Sandrine MANGUY */

import '../Styles/Info.css';
import {ReactComponent as InfoIcon} from '../Assets/circle-info-solid.svg'; /* to import svg file directly in the code */

const Info = () => {
    return (
        <details className='info'>
            <summary className='info-title'>Help <i className='info-icon' aria-hidden="true"><InfoIcon /></i></summary>
            <div>
              <details className='info-item'>
                <summary>How to <span className='info-crud'>ADD</span> a note?</summary>
                  <ol className='info-steps'>
                    <li>Fill the form fields</li>
                    <li>Click on the "ADD NOTE" button</li>
                    <li>The just added note will be displayed at the top ot the notes list.</li>
                  </ol>
              </details>
              <details className='info-item'>
                <summary>How to <span className='info-crud'>MODIFY</span> a note?</summary>
                  <ol className='info-steps'>
                    <li>Click on the note to be modified to select it.</li>
                    <li>The form is filled with the note.</li>
                    <li>Modify the note directly in the form fields (you can cancel the modifications at any moment by clicking on the "CANCEL" button).</li>
                    <li>When all the modifications are done, click on the "SAVE" button.</li>
                    <li>The just modified note will be displayed at its previous position.</li>
                  </ol>
              </details>
              <details className='info-item'>
                <summary>How to <span className='info-crud'>DELETE</span> a note?</summary>
                  <ol className='info-steps'>
                    <li>Go to the note to be deleted.</li>
                    <li>Click on the "X" button placed at its top right corner.</li>
                    <li>Control and confirm that you want to delete this note in the modal.</li>
                    <li>the note will be deleted and no longer displayed.</li>
                  </ol>
              </details>
            </div>
          </details>
    )
}

export default Info;