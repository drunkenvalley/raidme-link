import Layout from '@/components/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Verify() {
    const router = useRouter()
    const { error, error_description } = router.query
    const { asPath, isReady } = router

    const [success, setSuccess] = useState('')
    useEffect(() => {
        if (!isReady) return

        const hash = asPath.split('#')[1] || null
        if (hash) {
            setSuccess(hash)
        }
    }, [asPath, isReady])

    return (
        <Layout mainClassName='flex flex-column justify-content-center align-items-center'>
            <div className='flow max-w-400'>
                {success && <>
                    <h2>Successfully authorized</h2>
                    <p>
                        Thanks for authorizing. If not redirected you can click&nbsp;below.
                    </p>
                    <p className='border border-dark p-3 rounded-sm text-center'>
                        <Link href='/dashboard'>
                            <a className='flex-inline align-items-center text-purple'>
                                Continue to dashboard
                            </a>
                        </Link>
                    </p>
                </>}
                {error && <>
                    <h2>An error occurred</h2>
                    <p>
                        Twitch returned an error.<br />
                        <code className='text-purple-200'>{error_description}</code><br />
                    </p>
                    <p>
                        Please try again, or contact us if the problem persists.
                    </p>
                    <p className='border border-dark p-3 rounded-sm text-center'>
                        <Link href='/'>
                            <a className='flex-inline align-items-center text-purple'>
                                Back to home
                            </a>
                        </Link>
                    </p>
                </>}
            </div>
        </Layout>
    )
}