import Head from 'next/head'

export default function Layout({ children, title }) {
    const pagetitle = ['RaidMe.link', title].filter(Boolean).join(' - ')

    return (
        <>
            <Head>
                <title>{pagetitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="p-2">
                Hello
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}