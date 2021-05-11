import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBFmNxk8EYaTmVkUdif6Y_cByVZLrYuuoc",
    authDomain: "udemy-course-7f9fc.firebaseapp.com",
    projectId: "udemy-course-7f9fc",
    storageBucket: "udemy-course-7f9fc.appspot.com",
    messagingSenderId: "897530984133",
    appId: "1:897530984133:web:cff724742c4ea83ed4e2ac"
};
  
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp }