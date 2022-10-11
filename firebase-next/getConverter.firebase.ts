import { Timestamp } from 'firebase-admin/firestore'
import type {
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    WithFieldValue
} from 'firebase-admin/firestore'

function isTimestamp(value: unknown): value is Timestamp {
    return typeof value === 'object' && value !== null && value instanceof Timestamp
}

export interface GetConverterOptions {
    excludeId?: boolean
}

// credit to chanceaclark @ github
// I've just stolen this and adapted what little that needs changing
// https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-firebase/src/index.ts

export function getConverter<T extends Record<string, unknown>> (options?: GetConverterOptions): FirestoreDataConverter<T> {
    const includeId = !options?.excludeId
    return {
        toFirestore(object: WithFieldValue<T>) {
            const document: Record<string, unknown> = {}

            Object.keys(object).forEach((key) => {
                if (object[key] !== undefined) {
                    document[key] = object[key]
                }
            })

            return document
        },
        fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
            let document: T = snapshot.data()
            if (document === undefined) { return }

            if (includeId) {
                document = {
                    ...document,
                    id: snapshot.id,
                }
            }

            for (const key in document) {
                const value = document[key]

                if (isTimestamp(value)) {
                    document = {
                        ...document,
                        [key]: value.toDate(),
                    }
                }
            }

            return document
        }
    }
}
