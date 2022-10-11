import { Firestore } from "firebase-admin/firestore"
import { Account } from "next-auth"
import { AdapterSession, AdapterUser, VerificationToken } from "next-auth/adapters"
import { getConverter, GetConverterOptions } from "./getConverter.firebase"

export type IndexableObject = Record<string, unknown>

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