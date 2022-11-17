import Layout from "@/components/Layout"
import TwitchLogo from "@/components/Logos/TwitchLogo"
import mergeClass from "@/utils/mergeClass"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"

export default function Legal() {
    const TwitchTV = () => (
        // Hyperlink for Twitch TV with logo
        <a href="twitch.tv" className="flex-inline align-items-baseline lineheight-1">
            <TwitchLogo height=".8em" />
            Twitch.tv
        </a>
    )
    const MarkedH2 = ({ children }: { children: string }) => (
        <h2 id={children.toLowerCase().split(" ").join("-")} className="marker-heading-h2">
            <span>{children}</span>
            &nbsp;
            <a href={"#" + children.toLowerCase().split(" ").join("-")} aria-label={`Go to ${children}`}>#</a>
        </h2>
    )
    const Section = ({ children, className }: { children: ReactNode, className?: string }) => (
        <article className={mergeClass(["mt-5 px-3 px-lg-0", className])}>
            {children}
        </article>
    )

    const [headings, setHeadings] = useState([])
    useEffect(() => {
        const els = document.querySelectorAll(".marker-heading-h2 span")
        setHeadings([...els])
    }, [])

    const tocItems = headings.map((heading, i) => (
        <li key={`toc-heading-${i}`}>
            <a href={"#" + heading.innerText.toLowerCase().split(" ").join("-")}>
                {heading.innerText}
            </a>
        </li>
    ))

    return (
        <Layout className='flex flex-column justify-content-center align-items-center flow px-0'>
            <Section className="mt-0">
                <h1>
                    Terms of service, privacy policy
                </h1>
                <p>
                    With <Link href="/"><a><strong>Raid Me</strong></a></Link> we are trying to be transparent with our users.
                    This page details our terms of service, and the privacy policy. The terms of service describe rules for our users to follow,
                    while the privacy policy describes how we collect and use data.
                </p>
            </Section>

            <Section>
                <MarkedH2>
                    Table of contents
                </MarkedH2>
                <p>
                    In using the product these are the terms you generally agree to.
                </p>
            </Section>
            <article className="flex flex-row px-3 px-lg-0">
                <ol className="display-inline-block flex flex-column display-block my-0 px-4 py-3 bg--dark-300 rounded-2 w-auto">
                    {tocItems}
                </ol>
            </article>

            <Section>
                <MarkedH2>
                    Terms of service
                </MarkedH2>
                <p>
                    In using the product these are the terms you generally agree to.
                </p>
            </Section>
            <article className="display-flex max-w-100 container flex justify-content-center align-items-center bg--dark-300 py-4">
                <ol className="flex flex-column flow display-block my-0">
                    <li>
                        <h3>
                            This website extends <TwitchTV /> products and services
                        </h3>
                        <p>
                            The first thing to keep in mind when using this site is that its functionality is intrinsically connected to Twitch.tv. We&nbsp;are not affiliated in any legal capacity to Twitch,
                            but we employ their&nbsp;services, and in return provide a service to Twitch&nbsp;streamers. Consequently by agreeing to our terms you will by proxy have to agree to Twitch terms of service.
                            This website is for all intents useless without a Twitch&nbsp;account.
                        </p>
                    </li>

                    <li>
                        <h3>
                            I am not a lawyer; these terms may change
                        </h3>
                        <p>
                            This is a preliminary writeup of the privacy policy and terms of service. I will be the first to admit that these are not my forte. These terms may change in the future for a variety of reasons,
                            the least of which being to have a professional look over and rewrite these terms, to cover gaps in my knowledge, or because either the website, related services or the legal situation changes.
                        </p>
                    </li>
                </ol>
            </article>

            <Section>
                <MarkedH2>
                    Privacy Policy
                </MarkedH2>
                <p>
                    These terms describe the minimalist degree to which we retain any user information, and how we use that information.
                </p>
            </Section>
            <article className="display-flex max-w-100 container flex justify-content-center align-items-center bg--dark-300 py-4">
                <ol className="flex flex-column flow display-block my-0">
                    <legend>
                        <h3>
                            How we save and use your information
                        </h3>
                        <p>
                            This website exists to allow you to select how your content gets a shoutout from other Twitch.tv streamers. Towards that end we need to save some information about you.
                        </p>
                    </legend>
                    <li>
                        <strong>Your Twitch username</strong> is used to automatically generate a page from which your preferred clips are selected. By authorizing this website integration with Twitch a page is made
                        at <strong>raidme.link/to/&#123;twitch-username&#125;</strong> from which the preferred clips are retrieved.
                    </li>
                    <li>
                        <strong>Your Twitch clips</strong> are accessed and used as part of this service. We do not cache or store anything in advance, and only save the IDs of the clips you select to save with us.
                        These clips will be available to view at <strong>raidme.link/to/&#123;twitch-username&#125;</strong>.
                    </li>
                </ol>
            </article>
        </Layout>
    )
}