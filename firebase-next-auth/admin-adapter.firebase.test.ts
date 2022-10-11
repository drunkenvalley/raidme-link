import { getFirestore } from "firebase-admin/firestore"
import { disconnect } from "process"
import { adapterApp, FirebaseAdminAdapter, getCollections } from "./admin-adapter.firebase"
import { runBasicTests } from "./basic-tests"

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:3001'

const app = adapterApp({ projectId: 'next-auth-test' })
const firestore = getFirestore(app)
const { Users, Sessions, Accounts, VerificationTokens } = getCollections(firestore)

runBasicTests({
    adapter: FirebaseAdminAdapter({ projectId: 'next-auth-test' }),
    db: {
        async disconnect() {
            /**
             * Disconnect is run after all tests;
             * Clears out Firestore after tests,
             * else some tests will collide with previous data
             */
            const allUsers = (await Users.get()).docs
            const allSessions = (await Sessions.get()).docs
            const allAccounts = (await Accounts.get()).docs
            const allTokens = (await VerificationTokens.get()).docs

            const items = [...allUsers, ...allSessions, ...allAccounts, ...allTokens]
            items.forEach(item => item.ref.delete())
        },
        async session(sessionToken) {
            const sessions = await Sessions.where('sessionToken', '==', sessionToken).limit(1).get()
            const snapshot = sessions.docs[0]

            if (snapshot?.exists) {
                return snapshot.data()
            }

            return null
        },
        async user(id) {
            const snapshot = await Users.doc(id).get()

            if (snapshot?.exists) {
                return snapshot.data()
            }

            return null
        },
        async account({ provider, providerAccountId }) {
            const accounts = await Accounts
                .where('provider', '==', provider)
                .where('providerAccountId', '==', providerAccountId)
                .limit(1)
                .get()

            const snapshot = accounts.docs[0]

            if (snapshot?.exists) {
                const data = snapshot.data()
                return data
            }

            return null
        },
        async verificationToken({ identifier, token }) {
            const tokens = await VerificationTokens
                .where('identifier', '==', identifier)
                .where('token', '==', token)
                .limit(1)
                .get()
            const snapshot = tokens.docs[0]

            if (snapshot?.exists) {
                return snapshot.data()
            }
        },
    }
})