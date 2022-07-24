import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCMJflZ2MDDCRTEXniUTJ06YaoFYZEFVWw",
    authDomain: "todo-app-9cbc0.firebaseapp.com",
    projectId: "todo-app-9cbc0",
    storageBucket: "todo-app-9cbc0.appspot.com",
    messagingSenderId: "625665212197",
    appId: "1:625665212197:web:0f98d2c4397701354ce4cc"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase