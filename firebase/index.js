// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// Create .env.local if not exists
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
}

const app = initializeApp(firebaseConfig)

export default app