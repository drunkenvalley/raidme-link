import type { Account, Awaitable } from "next-auth"
import { Adapter, AdapterUser, AdapterSession, VerificationToken, } from 'next-auth/adapters'

import { App, AppOptions, initializeApp } from 'firebase-admin/app'
import { getFirestore, Firestore, Query } from 'firebase-admin/firestore'

import { getConverter, GetConverterOptions } from 'next-auth/getConverter.firebase'

type IndexableObject = Record<string, unknown>

interface AdapterProps {
    app?: App,
    firestore?: Firestore
    options?: AppOptions
}

/**
 * @method FirebaseAdapter
 * @summary Takes either a Firestore, a Firebase app, or Firebase options, returns Adapter for NextAuth
 */
export default function FirebaseAdminAdapter({ app, firestore, options }: AdapterProps): Adapter {
    // Init firestore
    firestore = firestore || getFirestore(app) || getFirestore(initializeApp(options))
    if (!firestore) throw 'Missing property to instantiate db'

    // Setup relevant collections
    const collection = <T extends IndexableObject>(collectionPath: string, options?: GetConverterOptions) => firestore.collection(collectionPath).withConverter(getConverter<T>(options))

    const Users = collection<AdapterUser>('users')
    const Sessions = collection<AdapterSession & IndexableObject>('sessions')
    const Accounts = collection<Account>('accounts')
    const VerificationTokens = collection<VerificationToken & IndexableObject>('verificationTokens', { excludeId: true })

    // Adapter functions
    return {
        async createUser(user) {
            const ref = await Users.add(user)
            const snapshot = await ref.get()

            if (snapshot.exists) {
                return snapshot.data()
            }

            throw '[createUser] Failed to create user'
        },
        async getUser(id) {
            const snapshot = await Users.doc(id).get()

            return snapshot.data()
        },
        async getUserByEmail(email) {
            const query = await Users
                .where('email', '==', email)
                .limit(1)
                .get()

            const snapshot = query.docs[0]

            return snapshot.exists ? snapshot?.data() : null
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const accounts = await Accounts
                .where('provider', '==', provider)
                .where('providerAccountId', '==', providerAccountId)
                .limit(1)
                .get()

            const accountSnapshot = accounts.docs[0]

            if (accountSnapshot.exists) {
                const { userId } = accountSnapshot.data()
                const userSnapshot = await Users.doc(userId).get()

                if (userSnapshot.exists) {
                    return userSnapshot.data()
                }
            }
        },
        async updateUser(user) {
            const ref = Users.doc(user.id)
            await ref.set(user, { merge: true })
            const snapshot = await ref.get()

            if (snapshot.exists) {
                return snapshot.data()
            }

            throw '[updateUser] Failed to udpate user'
        },
        async deleteUser(userId) {
            const ref = Users.doc(userId)

            await firestore.runTransaction(async transaction => {
                const accounts = await Sessions
                    .where('userId', '==', userId)
                    .get()
                const sessions = await Sessions
                    .where('userId', '==', userId)
                    .get()

                transaction.delete(ref)
                accounts.forEach(account => transaction.delete(account.ref))
                sessions.forEach(session => transaction.delete(session.ref))
            })
        },
        async linkAccount(account) {
            const ref = await Accounts.add(account)
            const snapshot = await ref.get()

            if (snapshot.exists) {
                return snapshot.data()
            }
        },
        async unlinkAccount({ provider, providerAccountId }) {
            const accounts = await Accounts
                .where('provider', '==', provider)
                .where('providerAccountId', '==', providerAccountId)
                .limit(1)
                .get()

            const snapshot = accounts.docs[0]

            if (snapshot.exists) {
                return snapshot.data()
            }
        },
        async createSession(session) {
            const ref = await Sessions.add(session)
            const snapshot = await ref.get()

            if (snapshot.exists) {
                return snapshot.data()
            }

            throw '[createSession] Failed to create session'
        },
        async getSessionAndUser(sessionToken) {
            const sessions = await Sessions
                .where('sessionToken', '==', sessionToken)
                .limit(1)
                .get()

            const sessionSnapshot = sessions.docs[0]

            if (sessionSnapshot.exists) {
                const session = sessionSnapshot.data()
                const userSnapshot = await Users.doc(session.userId).get()

                if (userSnapshot.exists) {
                    const user = userSnapshot.data()
                    return { session, user }
                }
            }
        },
        async updateSession(session) {
            const sessions = await Sessions
                .where('sessionToken', '==', session.sessionToken)
                .limit(1)
                .get()

            const sessionSnapshot = sessions.docs[0]

            if (sessionSnapshot.exists) {
                await sessionSnapshot.ref.set(session, { merge: true })

                const updatedSnapshot = await sessionSnapshot.ref.get()

                if (updatedSnapshot.exists) {
                    return updatedSnapshot.data()
                }
            }
        },
        async deleteSession(sessionToken) {
            const sessions = await Sessions
                .where('sessionToken', '==', sessionToken)
                .limit(1)
                .get()

            const snapshot = sessions.docs[0]

            if (snapshot.exists) {
                await snapshot.ref.delete()
            }
        },
        async createVerificationToken(verificationToken) {
            const ref = await VerificationTokens.add(verificationToken)
            const snapshot = await ref.get()

            if (snapshot.exists) {
                const { id, ...token } = snapshot.data()

                return token
            }
        },
        async useVerificationToken({ identifier, token }) {
            const tokens = await VerificationTokens
                .where('identifier', '==', identifier)
                .where('token', '==', token)
                .limit(1)
                .get()

            const snapshot = tokens.docs[0]

            if (snapshot.exists) {
                await snapshot.ref.delete()

                const { id, ...verificationToken } = snapshot.data()

                return verificationToken
            }
        },
    }
}