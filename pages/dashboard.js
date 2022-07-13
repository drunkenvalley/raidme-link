
import Layout from '@/components/layout'
import { useSession } from "next-auth/react"
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function Dashboard() {
    // STATE
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [clips, setClips] = useState(null)
    const [next, setNext] = useState(null)

    // REACT
    const requestClips = useCallback(() => {
        const url = new URL(`https://api.twitch.tv/helix/clips?broadcaster_id=${session.twitchId}`)
        if (next) {
            setLoadingMore(true)
            url.searchParams.set('after', next)
        }
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                "Authorization": "Bearer " + session.accessToken,
                "Client-Id": session.twitchClientId
            })
        })
            .then(res => res.json())
            .then(res => {
                setNext(res.pagination?.cursor)
                const old = clips || []
                setClips([...old, ...res.data])
            })
            .catch(e => console.error(`Could not fetch clips; ${e}`))
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
    
    const createClips = clips => {
        if (!clips) {
            return
        }

        const output = clips.map(clip => (
            <div key={clip.id} className='overflow-hidden flex flex-column'>
                <section className='rounded-sm bg-dark-600 overflow-hidden position-relative'>
                    <aside className='position-relative aspect-16-9'>
                        <Image alt={clip.title} src={clip.thumbnail_url} layout="fill" />
                    </aside>
                    <article className='flex flex-row p-2'>
                        <h3 className='flex-grow-1 min-w-0'>
                            <div className='truncate'>{clip.title}</div>
                        </h3>
                        <button className='fav-button'><Star filled={false} /></button>
                    </article>
                </section>
            </div>
        ))

        return output
    }

    return (
        <Layout mainClassName='flex flex-column justify-content-center align-items-center'>
            {loading && (
                <div className="loader m-1" />
            ) || (
                <>
                    <h2 className='mb-3'>
                    Your clips
                    </h2>
                    {clips?.length === 0 && (
                        <div className='flex-grow'>No clips</div>
                    ) || (
                        <>
                            <div className='grid mb-3'>
                                {createClips(clips)}
                            </div>
                            {loadingMore && (
                                <div className="loader m-1" />
                            ) || next && (
                                <div className='flex flex-row justify-content-center'>
                                    <button onClick={() => requestClips()} className="button-dark button-lg">
                                    Load more
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </Layout>
    )
}