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
### Connect UI to backend

## What I have improved
### Improved accessibility:
* given the notes a yellow background same as the post-it;
* added a padding bottom to the form to avoid the first note touch the form;
* changed the "cancel" button background color from pink to grey when updating a note;
* added a note aspect change when selected and removed when unselected (the updating changes are canceled or saved);
* prevented the user from selecting a new note when updating one (the changes are automatically cancelled and the aspect of the note being updated is reinitialized);
* added the confirm dialog modal before deleting a note. 

To improve :
!!! fix the form at the top to make it accessible at any moment
* note color selector dpending on the theme of the note
## Result


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
