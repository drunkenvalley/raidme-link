import Layout from "@/components/Layout"
import { useRouter } from "next/router"

export default function PublishedUser() {
    const router = useRouter()
    const { user } = router.query

    return (
        <Layout title={user}>
            {user}
        </Layout>
    )
}