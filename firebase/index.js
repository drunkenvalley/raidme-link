// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// Create .env.local if not exists
const firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderId,
    appId: process.env.firebaseAppId
}

const app = initializeApp(firebaseConfig)

export default app