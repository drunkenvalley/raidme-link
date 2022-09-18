import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession()

    return (
        <Layout className='flex flex-column justify-content-center align-items-center'>
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
                    <section className='rounded-1 flex flow-row align-items-center bg-dark-600 overflow-hidden'>
                        <Image src={session.user.image} alt={session.user.name} height={100} width={100} />
                        <article className='mt-1'>
                            <h2 className='mb-1'>{session.user.name}</h2>
                            <button onClick={() => signOut()} className='link flex-inline align-items-center p-0'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-twitch me-1" viewBox="0 0 16 16">
                                    <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                                    <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                                </svg>
                                    Log out
                            </button>
                        </article>
                    </section>
                    <div className='flex flex-inline justify-content-space-between w-100 gap-3'>
                        <Link href='/dashboard'>
                            <a className='button button-green button-outline flex-inline justify-content-center align-items-center p-2 rounded-1 text-center flex-grow'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels me-1" viewBox="0 0 16 16">
                                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
                                    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                                    <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                </svg>
                                Overlay
                            </a>
                        </Link>
                        <Link href='/dashboard'>
                            <a className='button button-dark button-outline border-dashed flex-inline justify-content-center align-items-center p-2 rounded-1 text-center flex-grow'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images me-1" viewBox="0 0 16 16">
                                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                                </svg>
                                Clip Select
                            </a>
                        </Link>
                    </div>
                </>
                ||
                <>
                    <p>
                    To start using this site connect your Twitch account.
                    </p>
                
                    <p className='border border-dark p-3 rounded-1 text-center'>
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
