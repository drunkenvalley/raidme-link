import Link from "next/link"
import { unstable_getServerSession } from "next-auth/next"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import Layout from "@/components/Layout"
import SiteLogo from "@/components/Logos/SiteLogo"
import TwitchLogo from "@/components/Logos/TwitchLogo"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

interface Props {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export async function getServerSideProps(context) {
    const getServerSession = unstable_getServerSession // presume 'unstable_' goes away eventually

    const session = await getServerSession(context.req, context.res, authOptions)
    if (session) {
        return {
            redirect: {
                destination: '../',
                permanent: false
            }
        }
    }

    const providers = await getProviders()
    return {
        props: { providers },
    }
}

export default function SignIn({ providers }: Props) {
    return (
        <Layout className="flex flex-column justify-content-center align-items-center px-0 flow">
            <div className='flow max-w-400 flex flex-column justify-content-center align-items-center'>
                <article>
                    <h1 className="h1 text-left w-100">
                        Welcome to <Link href='/'><a className='text--purple'><SiteLogo height={'.8em'} /> Raid Me</a></Link>
                    </h1>
                    <p>
                        A site to improve relations between&nbsp;streamers; letting&nbsp;streamers control what streams and content is shouted out.
                    </p>
                </article>
            </div>
            <div className="max-w-400 p-3 bg--dark-300 rounded-md-2 flex-row justify-content-center align-items-center flow">
                <article>
                    <h2 className="mb-2 text-center">
                        Sign in to use services
                    </h2>
                    <p>
                        To be able to make use of our services you must log in. Required data is stored in accordance with our <Link href="/privacy"><a className="">privacy policy</a></Link>.
                    </p>
                </article>

                {providers && Object.values(providers).map((provider) => (
                    <button onClick={() => signIn(provider.id)} className="button--gold button-outline p-2 flex align-items-center" key={provider.name}>
                        <TwitchLogo className="me-1" height='1.2em' /> Sign in with {provider.name}
                    </button>
                ))}
            </div>
        </Layout>
    )
}