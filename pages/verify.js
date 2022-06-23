import Layout from '@/components/layout'
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
        <Layout>
            <div>
                {success}
                {error && <>
                    {error_description}
                </>}
            </div>
        </Layout>
    )
}