import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react"

import Layout from '@/components/Layout'
import TwitchLogo from "@/components/TwitchLogo"

export default function Home() {
    const { data: session, status } = useSession()

    return (
        <Layout className='flex flex-column justify-content-center align-items-center px-0'>
            <div className='max-w-400 p-3'>
                <h1>
                    Welcome to <Link href='/'><a className='text--purple'>Raid Me</a></Link>
                </h1>
                <p>
                    A site to improve relations between&nbsp;streamers; letting&nbsp;streamers control what streams and content is shouted out.
                </p>
            </div>
            <div className='max-w-400 p-3 bg--dark-500 rounded-md-2'>
                {session
                &&
                <>
                    <section className='flex flow-row align-items-center mb-3'>
                        <Image className='rounded-1' src={session.user.image} alt={session.user.name} height={100} width={100} />
                        <article className='mt-1'>
                            <h2 className='mb-1'>{session.user.name}</h2>
                            <button onClick={() => signOut()} className='link flex-inline align-items-center p-0'>
                                <TwitchLogo height={16} className="me-1" />
                                Log out
                            </button>
                        </article>
                    </section>
                    <div className='flex flex-inline justify-content-space-between w-100 gap-3'>
                        <Link href='/dashboard'>
                            <a className='button button-lg button--green button-outline flex-inline justify-content-center align-items-center text-center flex-grow'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels me-1" viewBox="0 0 16 16">
                                    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
                                    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                                    <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                </svg>
                                Overlay
                            </a>
                        </Link>
                        <Link href='/dashboard'>
                            <a className='button button-lg button--gold button-outline border-dashed flex-inline justify-content-center align-items-center text-center flex-grow'>
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

                    <button onClick={() => signIn()} className='button--gold button-outline button-lg w-100 flex-inline align-items-center justify-content-center'>
                        <TwitchLogo height={16} className="me-1" />
                        Sign in Twitch account
                    </button>
                </>
                }
            </div>
        </Layout>
    )
}
