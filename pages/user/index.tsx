import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import Layout from "@/components/Layout"
import { TwitchSession } from "../api/auth/[...nextauth]"

import IClip from "@/interfaces/IClip"
import Clip from "@/components/Clip"

export default function Dashboard() {
    // STATE
    const { data, status } = useSession()
    const session = data as TwitchSession
    const [error, setError] = useState<string>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [clips, setClips] = useState<IClip[]>(null)
    const [next, setNext] = useState<string>(null)

    // REACT
    const requestClips = useCallback(() => {
        const url = new URL("https://api.twitch.tv/helix/clips?broadcaster_id=190631385")
        if (next) {
            setLoadingMore(true)
            url.searchParams.set("after", next)
        }
        fetch(url, {
            method: "GET",
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
                setError("Failed to load clips.")
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

        if (status === "authenticated") {
            requestClips()
        }
    }, [loading, status, requestClips])

    const favoriteClip = (event: React.MouseEvent, link: IClip) => {
        event.preventDefault()
        console.log(link)
    }

    return (
        <Layout className='flex flex-column justify-content-center align-items-center px-0 pt-0'>
            {status === "unauthenticated" && (
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
                                        <Clip key={clip.id} clip={clip} onClick={(event) => favoriteClip(event, clip)}></Clip>
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