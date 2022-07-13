import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, mainClassName = '', title, ...rest }) {
    const brandname = 'Raid Me'
    const pagetitle = [brandname, title].filter(Boolean).join(' - ')

    return (
        <>
            <Head>
                <title>{pagetitle}</title>
                <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32' fill='%23F0F0FF' className='bi bi-twitch' viewBox='0 0 16 16'%3E%3Cpath d='M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z'/%3E%3Cpath d='M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z'/%3E%3C/svg%3E" type="image/svg+xml" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="p-2 pt-3 lineheight-0 flex">
                <Link href="/">
                    <a className='flex-inline align-items-center text-ice'>
                        {/** SVG is hopefully placeholder cuz I don't wanna piss off daddy Bezos */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" fill="currentColor" className="bi bi-twitch" viewBox="0 0 16 16">
                            <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"/>
                            <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z"/>
                        </svg>
                        <h1 className='ms-1'>
                            {brandname}
                        </h1>
                    </a>
                </Link>
                <div className='flex-grow' />
                <ul className='flex-inline list flow-row me-3'>
                    <li>
                        <Link href="/help">
                            <a className='text-ice'>
                                Help
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy">
                            <a className='text-ice'>
                                Privacy
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a href="https://github.com/drunkenvalley/raidme-link" className='text-ice'>
                            Github
                        </a>
                    </li>
                </ul>
            </nav>
            <main className={['container flex-grow', mainClassName].filter(Boolean).join(' ')} {...rest}>
                {children}
            </main>
        </>
    )
}