import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"

import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

const config = {
    credentials: {
        accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
    },
    region: process.env.NEXT_AUTH_AWS_REGION,
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    },
})

export default NextAuth({
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
    adapter: DynamoDBAdapter(
        client,
        {
            tableName: 'NextAuthTable'
        }
    ),
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
})