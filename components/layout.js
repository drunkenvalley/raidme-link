import Head from 'next/head'

export default function Layout({ children, title }) {
    const basename = 'RaidMe.link'
    const pagetitle = [basename, title].filter(Boolean).join(' - ')

    return (
        <>
            <Head>
                <title>{pagetitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="p-2 pt-3 lineheight-0">
                <a href='https://raidme.link' className='group-inline group-align-items-center'>
                    {/** SVG is hopefully placeholder cuz I don't wanna piss off daddy Bezos */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" fill="currentColor" className="bi bi-twitch" viewBox="0 0 16 16">
                        <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                        <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                    </svg>
                    <h1 className='ms-1'>
                        {basename}
                    </h1>
                </a>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}