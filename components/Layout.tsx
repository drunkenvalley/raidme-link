import Head from "next/head"
import Link from "next/link"
import SiteLogo from "@/components/logos/SiteLogo"
import TwitchLogo from "@/components/logos/TwitchLogo"
import { ReactNode } from "react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
interface Props {
    children: ReactNode
    className: string
    title: string
}

export default function Layout({ children, className, title, ...rest }: Partial<Props>) {
    const brandname = "Raid Me"
    const pagetitle = [brandname, title].filter(Boolean).join(" - ")
    className = ["container flex-grow", className].filter(Boolean).join(" ")

    const { data: session } = useSession()

    return (
        <>
            <Head>
                <title>{pagetitle}</title>
                <link rel="icon" href="/twitch.svg" type="image/svg+xml" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="p-3 pt-3 lineheight-0 flex flex-wrap">
                <Link href="/">
                    <a className='flex-inline align-items-center text--gold'>
                        {/** SVG is hopefully placeholder cuz I don't wanna piss off daddy Bezos */}
                        <SiteLogo height={48} />
                        <h1 className='m-0 ms-1'>
                            {brandname}
                        </h1>
                    </a>
                </Link>
                <div className='flex-grow' />
                {
                    session && (
                        <section className='flex align-items-center'>
                            <Image className='rounded-1' src={session.user.image} alt={session.user.name} height={48} width={48} />
                            <article className='ms-2 mt-1'>
                                <p className='text--gold h2 mb-1'>{session.user.name}</p>
                                <button onClick={() => signOut()} className='link flex-inline align-items-center p-0'>
                                    <TwitchLogo height={12} className="me-1" />
                                    Sign out
                                </button>
                            </article>
                        </section>
                    )
                }
            </nav>
            <main className={className} {...rest}>
                {children}
            </main>
            <footer className="p-3 pt-3 lineheight-0 flex flex-wrap">
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
                        <Link href="/legal#terms-of-service">
                            <a>
                                Terms
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal#privacy-policy">
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
            </footer>
        </>
    )
}