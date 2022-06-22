import Link from 'next/link'
import Layout from '@/components/layout'

export default function Home() {
    return (
        <Layout mainClassName='flex justify-content-center align-items-center' direction="column">
            <div className='flow max-w-400'>
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
            </div>
        </Layout>
    )
}
