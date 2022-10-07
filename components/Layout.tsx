import Head from 'next/head'
import Link from 'next/link'
import SiteLogo from "@/components/SiteLogo"

interface Props {
    children: JSX.Element[]|JSX.Element|string
    className: string
    title: string
}

export default function Layout({ children, className, title, ...rest }: Partial<Props>) {
    const brandname = 'Raid Me'
    const pagetitle = [brandname, title].filter(Boolean).join(' - ')
    className = ['container flex-grow', className].filter(Boolean).join(' ')

    return (
        <>
            <Head>
                <title>{pagetitle}</title>
                <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32' fill='%23FAD354' className='bi bi-twitch' viewBox='0 0 16 16'%3E%3Cpath d='M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z'/%3E%3Cpath d='M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z'/%3E%3C/svg%3E" type="image/svg+xml" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="p-3 pt-3 lineheight-0 flex flex-wrap bg--dark-300">
                <Link href="/">
                    <a className='flex-inline align-items-center text--gold'>
                        {/** SVG is hopefully placeholder cuz I don't wanna piss off daddy Bezos */}
                        <SiteLogo />
                        <h1 className='m-0 ms-1'>
                            {brandname}
                        </h1>
                    </a>
                </Link>
                <div className='flex-grow' />
                <ul className='flex-inline list flow-row'>
                    <li>
                        <Link href="/brand">
                            <a>
                                Brand
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/help">
                            <a>
                                Help
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy">
                            <a>
                                Privacy
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a href="https://github.com/drunkenvalley/raidme-link">
                            Github
                        </a>
                    </li>
                </ul>
            </nav>
            <main className={className} {...rest}>
                {children}
            </main>
        </>
    )
}