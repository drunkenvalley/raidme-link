import firebase, { AppOptions, initializeApp } from 'firebase-admin'
import { getApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { Adapter, AdapterUser } from 'next-auth/adapters'

interface AuthUser {
    uid: string
    email: string
    emailVerified: boolean
    phoneNumber: string
    password: string
    displayName: string
    photoUrl: string
    disabled: boolean
}

/**
 * @method FirebaseAuthAdapter
 * @summary Takes Firebase Admin options, returns Adapter for NextAuth
 */
export function FirebaseAuthAdapter(options: AppOptions): Adapter {
    const appList = getApps()
    const appName = 'firebase-auth-adapter'
    const app = !!appList.length && !!appList.find(a => a.name === appName) ? getApp(appName) : initializeApp(options, appName)
    const Auth = getAuth(app)

    return {
        createUser(user) {
            const authUser: Partial<AuthUser> = {
                
            }

            Auth.createUser()
        }
    }
}