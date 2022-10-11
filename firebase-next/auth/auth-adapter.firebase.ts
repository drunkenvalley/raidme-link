import { AppOptions } from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { Adapter } from 'next-auth/adapters'
import { getAdminApp } from '@/firebase-next/getAdminApp.firebase'

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
    const app = getAdminApp(options, 'firebase-auth-adapter')
    const Auth = getAuth(app)

    return {
        async createUser(user) {
            // @ts-ignore
            const record = await Auth.createUser(user)

            return
        }
    }
}