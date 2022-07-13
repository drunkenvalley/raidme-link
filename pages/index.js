import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession()

    return (
        <Layout mainClassName='flex flex-column justify-content-center align-items-center'>
            <div className='flow max-w-400'>
                <h1>
                    Welcome to <Link href='/'><a className='text-purple'>Raid Me</a></Link>
                </h1>
                <p>
                    A site to improve relations between&nbsp;streamers; letting&nbsp;streamers control what streams and content is shouted out.
                </p>
                {session 
                &&
                <>
                    <div className='rounded-md p-1 border border-dark overflow-hidden'>
                        <section className='rounded-sm flex flow-row align-items-center bg-dark-600 overflow-hidden'>
                            <Image src={session.user.image} alt={session.user.name} height={100} width={100} />
                            <article>
                                <h2>{session.user.name}</h2>
                                <button onClick={() => signOut()} className='link flex-inline align-items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-twitch me-1" viewBox="0 0 16 16">
                                        <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                                        <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                                    </svg>
                                    Log out
                                </button>
                            </article>
                        </section>
                    </div>
                    <p className='border border-dark p-3 rounded-sm text-center'>
                        <Link href='/dashboard'>
                            <a className='flex-inline align-items-center text-green'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-house me-1" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                    <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg>
                                Get started
                            </a>
                        </Link>
                    </p>
                </>
                ||
                <>
                    <p>
                    To start using this site connect your Twitch account.
                    </p>
                
                    <p className='border border-dark p-3 rounded-sm text-center'>
                        <button onClick={() => signIn()} className='link flex-inline align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-twitch me-1" viewBox="0 0 16 16">
                                <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                                <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                            </svg>
                            Sign in Twitch account
                        </button>
                    </p>
                </>
                }
            </div>
        </Layout>
    )
}
