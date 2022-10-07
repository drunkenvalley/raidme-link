import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { useRouter } from 'next/router'

export default async function GetDb(req, res) {
    const [method] = req.query.method
    /*
    if (['put', 'get'].includes(method)) {
        const { twitchId } = await unstable_getServerSession(req, res, authOptions)

        if (method === 'get') {
            const { Items } = await client.scan({
                TableName: process.env.NEXT_AUTH_AWS_TABLE,
                KeyConditionExpression: 'providerAccountId = :twitchUser',
                ExpressionAttributeValues: {
                    ':twitchUser': {'S': twitchId}
                }
            })
            const [current, ...others] = Items

            if (others.length) {
                res.status(401).json({ error: "Conflicting data." })
                return
            }

            res.status(200).json(current)
            return
        }
    }
    */
    res.status(404)
}