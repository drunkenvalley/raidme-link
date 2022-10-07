import Layout from "@/components/Layout"
import SiteLogo from "@/components/SiteLogo"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import Link from "next/link"

interface Props {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}

export default function SignIn({ providers }: Props) {
    return (
        <Layout className="className='flex flex-column justify-content-center align-items-center'">
            <div className='flow max-w-400 border border--dark p-4 rounded-2 flex flex-column justify-content-center align-items-center'>
                <h1 className="flex align-items-center">
                    <SiteLogo height={64} />
                </h1>
                <article className="text-left">
                    <h2 className="mb-2">
                        Sign in to use services
                    </h2>
                    <p>
                        To be able to make use of our services you must log in. Required data is stored in accordance with our <Link href="/privacy"><a className="">privacy policy</a></Link>.
                    </p>
                </article>
                {providers && Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)} className="button--green button-outline border--dark p-2">
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    )
}