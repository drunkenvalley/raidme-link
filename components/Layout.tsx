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
                <link rel="icon" href="/twitch.svg" type="image/svg+xml" />
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