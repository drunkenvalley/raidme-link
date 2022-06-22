import Link from 'next/link'
import Layout from '@/components/layout'

export default function Home() {
    return (
        <Layout mainClassName='flow'>
            <h1>
        Welcome to <Link href='/'><a className='text-purple'>Raid Me</a></Link>
            </h1>
            <p>
        A site to improve relations between streamers;<br />
        Letting streamers control what streams and content is shouted out.
            </p>
            <button variant="purple" type="button">
        Click
            </button>
        </Layout>
    )
}
