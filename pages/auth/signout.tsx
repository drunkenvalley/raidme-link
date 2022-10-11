import Link from "next/link"
import { unstable_getServerSession } from "next-auth/next"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import Layout from "@/components/Layout"
import SiteLogo from "@/components/SiteLogo"
import TwitchLogo from "@/components/TwitchLogo"
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
        <Layout className="flex flex-column justify-content-center align-items-center px-0">
            <div className='flow max-w-400 bg--dark-300 p-4 rounded-md-2 flex flex-column justify-content-center align-items-center'>
                <h1 className="flex align-items-center">
                    <SiteLogo height={64} />
                </h1>
                <article>
                    <h2 className="mb-2 text-center">
                        Sign in to use services
                    </h2>
                    <p>
                        To be able to make use of our services you must log in. Required data is stored in accordance with our <Link href="/privacy"><a className="">privacy policy</a></Link>.
                    </p>
                </article>
                {providers && Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)} className="button--gold button-outline p-2 flex align-items-center">
                            <TwitchLogo className="me-1" height='1.2em' /> Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    )
}