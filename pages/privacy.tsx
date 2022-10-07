import Layout from "@/components/Layout"
import TwitchLogo from "@/components/TwitchLogo"

export default function Privacy() {
    const TwitchTV = () => (
        // Hyperlink for Twitch TV with logo
        <a href="twitch.tv" className="flex-inline align-items-baseline lineheight-1">
            <TwitchLogo height=".8em" />
            Twitch.tv
        </a>
    )

    return (
        <Layout className='flex flex-column justify-content-center align-items-center'>
            <ol className="flow">
                <legend>
                    <h2>
                        Privacy Policy
                    </h2>
                    <p>
                        In using the product these are the terms you generally agree to. These terms describe the minimalist degree to which we retain any user information, and how we use that information.
                    </p>
                </legend>

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

                <li>
                    <h3>
                        How we save and use your information
                    </h3>
                    <p>
                        This website exists to allow you to select how your content gets a shoutout from other Twitch.tv streamers. Towards that end we need to save some information about you.
                    </p>
                    <ol type="a" className="mt-3 flow">
                        <li>
                            <strong>Your Twitch username</strong> is used to automatically generate a page from which your preferred clips are selected. By authorizing this website integration with Twitch a page is made
                            at <strong>raidme.link/to/&#123;twitch-username&#125;</strong> from which the preferred clips are retrieved.
                        </li>
                        <li>
                            <strong>Your Twitch clips</strong> are accessed and used as part of this service. We do not cache or store anything in advance, and only save the IDs of the clips you select to save with us.
                            These clips will be available to view at <strong>raidme.link/to/&#123;twitch-username&#125;</strong>.
                        </li>
                    </ol>
                </li>
            </ol>
        </Layout>
    )
}