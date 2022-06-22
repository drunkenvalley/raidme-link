import Layout from '@/components/layout'
import { useRouter } from 'next/router'

export default function PublishedUser() {
    const router = useRouter()
    const { user } = router.query

    return (
        <Layout title={user}>
            {user}
        </Layout>
    )
}