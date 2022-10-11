import type { Account, Awaitable } from "next-auth"
import { Adapter, AdapterUser, AdapterSession, VerificationToken, } from 'next-auth/adapters'

import admin from "firebase-admin"
import { App, AppOptions, initializeApp, getApp, getApps } from 'firebase-admin/app'
import { getFirestore, Firestore, Query } from 'firebase-admin/firestore'

import { getConverter, GetConverterOptions } from '@/firebase-next/getConverter.firebase'

export type IndexableObject = Record<string, unknown>

export function adapterApp(options: AppOptions): App {
    const appList = getApps()
    const appName = 'firebase-admin-adapter'
    const app = !!appList.length && !!appList.find(a => a.name === appName)
        ? getApp(appName)
        : initializeApp(options, appName)

    return app
}

export function getCollections(firestore: Firestore) {
    const collection = <T extends IndexableObject>(collectionPath: string, options?: GetConverterOptions) => firestore.collection(collectionPath).withConverter(getConverter<T>(options))

    const Users = collection<AdapterUser>('users')
    const Sessions = collection<AdapterSession & IndexableObject>('sessions')
    const Accounts = collection<Account>('accounts')
    const VerificationTokens = collection<VerificationToken & IndexableObject>('verificationTokens', { excludeId: true })

    return {
        Users,
        Sessions,
        Accounts,
        VerificationTokens
    }
}

/**
 * @method FirebaseAdapter
 * @summary Takes Firebase Admin options, returns Adapter for NextAuth
 */
export function FirebaseAdminAdapter(options: AppOptions): Adapter {
    const app = adapterApp(options)
    const firestore = getFirestore(app)

    const { Users, Sessions, Accounts, VerificationTokens } = getCollections(firestore)

    // Adapter functions
    return {
        async createUser(user) {
            //@ts-ignore
            const ref = await Users.add(user)
            const snapshot = await ref.get()

            if (snapshot.exists) {
                return snapshot.data()
            }

            throw '[createUser] Failed to create user'
        },
        async getUser(id) {
            const snapshot = await Users.doc(id).get()

            if (snapshot.exists) {
                return snapshot.data()
            }

            return null
        },
        async getUserByEmail(email) {
            const users = await Users
                .where('email', '==', email)
                .limit(1)
                .get()

            const snapshot = users.docs[0]

            if (snapshot?.exists) {
                return snapshot.data()
            }

            return null
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const accounts = await Accounts
                .where('provider', '==', provider)
                .where('providerAccountId', '==', providerAccountId)
                .limit(1)
                .get()

            const accountSnapshot = accounts.docs[0]

            if (accountSnapshot?.exists) {
                const { userId } = accountSnapshot.data()
                const userSnapshot = await Users.doc(userId).get()

                if (userSnapshot?.exists) {
                    return userSnapshot.data()
                }
            }

            return null
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
            const user = Users.doc(userId)
            const accounts = await Accounts
                .where('userId', '==', userId)
                .get()
            const sessions = await Sessions
                .where('userId', '==', userId)
                .get()

            await firestore.runTransaction(async transaction => {
                sessions.forEach(session => transaction.delete(session.ref))
                accounts.forEach(account => transaction.delete(account.ref))
                transaction.delete(user)
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

            if (snapshot?.exists) {
                snapshot.ref.delete()
                return
            }
        },
        async createSession(session) {
            //@ts-ignore
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

            if (sessionSnapshot?.exists) {
                const session = sessionSnapshot.data()
                const userSnapshot = await Users.doc(session.userId).get()

                if (userSnapshot.exists) {
                    const user = userSnapshot.data()
                    return { session, user }
                }
            }

            return null
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
            //@ts-ignore
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

            if (snapshot?.exists) {
                await snapshot.ref.delete()

                const { id, ...verificationToken } = snapshot.data()

                return verificationToken
            }

            return null
        },
    }
}