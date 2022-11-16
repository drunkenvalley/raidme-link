import Image from 'next/image'
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { TwitchSession } from '../api/auth/[...nextauth]'

interface Clip {
    id: string
    url: URL
    embed_url: URL
    broadcaster_id: number,
    broadcaster_name: string,
    creator_id: number,
    creator_name: string,
    video_id: string,
    game_id: number,
    language: string,
    title: string,
    view_count: number,
    created_at: Date,
    thumbnail_url: URL,
    duration: number,
    vod_offset: unknown
}

export default function Dashboard() {
    // STATE
    const { data, status } = useSession()
    const session = data as TwitchSession
    const [error, setError] = useState<string>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [clips, setClips] = useState<Clip[]>(null)
    const [next, setNext] = useState<string>(null)

    // REACT
    const requestClips = useCallback(() => {
        const url = new URL(`https://api.twitch.tv/helix/clips?broadcaster_id=190631385`)
        if (next) {
            setLoadingMore(true)
            url.searchParams.set('after', next)
        }
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                "Authorization": String("Bearer " + session.accessToken),
                "Client-Id": String(session.twitchClientId)
            })
        })
            .then(res => res.json())
            .then(res => {
                setNext(res.pagination?.cursor)
                const old = clips || []
                setClips([...old, ...res.data])
            })
            .catch(e => {
                setError('Failed to load clips.')
                console.error(`Could not fetch clips; ${e}`)
            })
            .finally(() => {
                setLoading(false)
                setLoadingMore(false)
            })
    }, [clips, next, session])

    useEffect(() => {
        if (!loading) {
            return
        }

        if (status === 'authenticated') {
            requestClips()
        }
    }, [loading, status, requestClips])

    const favoriteClip = (event: React.MouseEvent, link: Clip) => {
        event.preventDefault()
        console.log(link)
    }

    // SUBCOMPONENTS
    const Star = ({ filled }) => filled && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    ) || (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>
    )

    const Clip = ({ clip }: {clip: Clip}) => (
        <a href={clip.url.toString()} key={clip.id} className='flex flex-column min-w-0 text--gold clip'>
            <div className='p-0 m-0 rounded-1 clip-image-wrapper'>
                <Image alt={clip.title} src={clip.thumbnail_url.toString()} width={480} height={276} />
            </div>
            <article className='flex flex-row align-items-center py-2'>
                <div className='flex-grow-1 min-w-0 m-0 h3'>
                    <p className='truncate' title={clip.title}>
                        {clip.title}
                    </p>
                </div>
                <button type='button' onClick={(event) => favoriteClip(event, clip)} className='button-outline button--gold button-sm p-1 ms-1 flex align-items-center'><Star filled={false} /></button>
            </article>
        </a>
    )

    return (
        <Layout className='flex flex-column justify-content-center align-items-center px-0 pt-0'>
            {status === 'unauthenticated' && (
                <>Not logged in</>
            ) || loading && (
                <div className="loader m-1" />
            ) || error && (
                <>
                    {error}
                </>
            ) || (
                <>
                    <section className='max-w-100 container bg--dark-400 border-y border--dark-500'>
                        <h2>
                            Shoutout clips & videos
                        </h2>
                        <p>
                            The intent of this site is for users to shout out content you select. Here you&apos;ll make that selection.
                        </p>
                        <div className='grid mb-3 flex-grow'>
                            {}
                        </div>
                    </section>
                    <section className='max-w-100 container'>
                        <h2>
                            All clips
                        </h2>
                        <p>
                            You can select your preferred clips by clicking the star on any given clip. Clicking the clip anywhere else will take you to watch it on Twitch.
                        </p>
                        {clips?.length === 0 && (
                            <div className='flex-grow'>No clips</div>
                        ) || (
                            <>
                                <div className='grid mb-3 flex-grow'>
                                    {clips && clips.map(clip => (
                                        <Clip key={clip.id} clip={clip}></Clip>
                                    ))}
                                </div>
                                {next && (
                                    <div className='flex flex-row justify-content-center'>
                                        <button onClick={() => requestClips()} className="button--gold button-outline button-lg">
                                            Load more
                                            {loadingMore && <div className="ms-1 loader loader-inline" />}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </>
            )}
        </Layout>
    )
}