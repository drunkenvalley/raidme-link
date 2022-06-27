import { getFirestore } from 'firebase/firestore/lite'
import app from '@/firebase/'

const db = getFirestore(app)

export default db