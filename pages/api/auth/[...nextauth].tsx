import NextAuth, { NextAuthOptions } from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.preferred_username,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        })
    // ...add more providers here
    ],
    adapter: FirestoreAdapter({
        apiKey: process.env.FIREBASE_API_KEY,
        appId: process.env.FIREBASE_APP_ID,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        // Optional emulator config (see below for options)
        emulator: {},
    }),
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.twitchId = account.providerAccountId
                token.accessToken = account.access_token
            }
            return Promise.resolve(token)
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.twitchClientId = process.env.TWITCH_CLIENT_ID
            session.twitchId = token?.twitchId
            session.accessToken = token?.accessToken
            return Promise.resolve(session)
        }
    }
}

export default NextAuth(authOptions)