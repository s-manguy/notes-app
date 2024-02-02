# Full Stack Project - Create A Notes App Using React and Node.js
This project is based on a [Tutorial written by Chris Blakely](https://www.freecodecamp.org/news/full-stack-project-tutorial-create-a-notes-app-using-react-and-node-js/).

***Important : Please note that:***
* ***I have not used Typescript on my version of the project;***
* ***I have improved some parts...***

The full stack notes app has been built from scratch, using React, Node.js and PostgreSQL with the following features:
*  Create/Edit/Delete Notes
*  Validation on the UI and Backend
*  Responsive on mobile screens

## Prerequisites
*  Some knowledge about web development concepts (frontend, backend, databases, API's, REST).
*  Some knowledge of JavaScript (variables, functions, objects, arrays, and so on).
*  Basic understanding on React (how to create components, add styles, work with state).
*  Basic understanding on Node.js/Express (working with APIs).

## App building
### Create the UI
#### Step 1 - Create a New React App
#### Step 2 - Add UI Elements
In the App.js file, in the return(), add:
* the form including:
  * an input for the note title,
  * a texterea field for the note content,
  * a submit button whose text is "Add Note";
* the grid where the notes will be displayed;
* a note.
#### Step 3 - Add CSS
#### Step 4 - Add Dummy Notes - Test Responsiveness
#### Step 5 - Add the Note functionnality - Save Note Form
#### Step 6 - Add the Update Note Functionnality
#### step 7 - Add the Delete Note Functionnality

### Create the Backend
Please refer to [notes-app-server](https://github.com/s-manguy/notes-app-server)

### Connect UI to backend
* I have created the code for the handleUpdateNote as the one indicated in the tutorial is a copy-paste of the handleAddNote.
```javascript
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

      setNotes(updatedNotesList); // Set the updated array in the state.
      setTitle(""); // Clean the form by resetting the value to the initial state.
      setContent(""); // Clean the form by resetting the value to the initial state.
      setSelectedNote(null); // Deselect the note by resetting the value to the initial state.
    } catch (error) {
      console.log(error);
    }  
  };
``` 

## Improvements 
### I have improved the accessibility and UX by:
* giving the notes a yellow background same as the post-it;
* adding a padding bottom to the form to avoid the first note touch the form;
* changing the "cancel" button background color from pink to grey when updating a note;
* adding a note aspect change when selected and removed when unselected (the updating changes are canceled or saved);
* preventing the user from selecting a new note when updating one (the changes are automatically cancelled and the aspect of the note being updated is reinitialized);
* adding the confirm dialog modal before deleting a note;
* adding label to each form field and a .sr-only class to improve the screen reader accessibility;
* adding a scroll animation to the top of the form when clicking on a note to update it in the form;
* adding a scroll button fiwed on the bottom right screen corner which appears when the pageYoffset is higher to 300px;
* cleaning the form before deleting any note.
### I have improved the performance by:
* using the useRef hook on the form fields (that means : 
  * no re-render every time a new character is typed in the field;
  * only one re-render when clicking on the "Add Note" or "Save" or "Cancel" buttons;
  * reset the input and textarea value to '' or null by resetting the ref values when ending the POST, PUT requests and when canceling the changes);
* using memo on the Note and the FormField components.
### I have improved the code by:
* cutting it in smaller components like FormField (which implies using forwardRef), Note or ScrollButton.
### Possible improvments in the future
* fix the form at the top to make it accessible at any moment on the desk top and tablet versions;
* note color selector depending on the theme of the note.

## Result
![mobile version](https://github.com/s-manguy/notes-app/blob/main/mobile_version.png)
![tablet version](https://github.com/s-manguy/notes-app/blob/main/Ipad_version.png)
![desktop version](https://github.com/s-manguy/notes-app/blob/main/Desktop_version.png)

<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
