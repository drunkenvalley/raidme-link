// libs
import NextAuth, { NextAuthOptions } from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
import { FirebaseAdminAdapter } from "firebase-next-auth/admin-adapter.firebase"
import { applicationDefault } from "firebase-admin/app"

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
    ],
    adapter: FirebaseAdminAdapter({ credential: applicationDefault(), databaseURL: process.env.FIREBASE_DATABASE_URL }),
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