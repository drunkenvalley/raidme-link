import Layout from "@/components/Layout"

export default function NotFound() {
    return (
        <Layout className="flex align-items-center justify-content-center">
            <h2 className="display-inline-block w-auto mb-0 me-1 pe-1 border-e border--gold">404</h2>
            <p className="display-inline-block w-auto">Page could not be found.</p>
        </Layout>
    )
}
