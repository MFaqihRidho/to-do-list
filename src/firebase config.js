import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgzxISdU-9NMwVBQ_uhvx5iBj_HbzW8Hk",
    authDomain: "to-do-list-project-8c7bb.firebaseapp.com",
    projectId: "to-do-list-project-8c7bb",
    storageBucket: "to-do-list-project-8c7bb.appspot.com",
    messagingSenderId: "821214054608",
    appId: "1:821214054608:web:8107888cef938bc8c7f6d5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
