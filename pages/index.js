import Link from 'next/link'
import Layout from '@/components/layout'
import absoluteUrl from "next-absolute-url"

export async function getServerSideProps({ req }) {
    const { origin } = absoluteUrl(req, req.headers.host)

    return {
        props: {
            origin
        }
    }
}

export default function Home({origin}) {
    console.log(origin)
    const loginUrl = new URL('https://id.twitch.tv/oauth2/authorize')
    const loginParams = {
        client_id: 'jotbttv2qzf9qedttb2qeqjtmyqyj5',
        redirect_uri: `${origin}/verify`,
        response_type: 'token',
        scope: 'clips:edit'
    }
    Object.keys(loginParams).forEach(param => loginUrl.searchParams.set(param, loginParams[param]))

    return (
        <Layout mainClassName='flex justify-content-center align-items-center' direction="column">
            <div className='flow max-w-400'>
                <h1>
                    Welcome to <Link href='/'><a className='text-purple'>Raid Me</a></Link>
                </h1>
                <p>
                    A site to improve relations between&nbsp;streamers; letting&nbsp;streamers control what streams and content is shouted out.
                </p>
                <p>
                    To start using this site connect your Twitch account.
                </p>
                {loginUrl && <p className='border border-dark p-3 rounded-sm text-center'>
                    <a href={loginUrl} className='flex-inline align-items-center text-purple'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-twitch me-1" viewBox="0 0 16 16">
                            <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                            <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                        </svg>
                        Connect Twitch account
                    </a>
                </p>}
            </div>
        </Layout>
    )
}
