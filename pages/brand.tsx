import { ReactNode, useEffect, useState } from "react"

import Card from "@/components/Card"
import Layout from "@/components/Layout"
import SiteLogo from "@/components/logos/SiteLogo"
import mergeClass from "utils/mergeClass"

interface ColorProps {
    color: string
    label: string
}

interface SwatchProps {
    color: string
    swatch: number
}

interface GenericComponent {
    children: ReactNode,
    className: string
}

interface IButton extends GenericComponent {
    disabled: boolean
}

interface IChildComponent extends GenericComponent {
    color: string
}

type ChildComponent = (props: Partial<IChildComponent>) => JSX.Element

interface MappedComponent extends GenericComponent {
    component: ChildComponent
    name: string
}

export default function Brand(): JSX.Element {
    const capitalize = (s = "") => s && s[0].toUpperCase() + s.slice(1) || ""
    const rgba2hex = (rgba) => rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, "0").replace("NaN", "")).join("")
    const colorArr = ["dark", "purple", "ice", "green", "gold", "red"]

    const Components = ({ component, children, className, name }: Partial<MappedComponent>): JSX.Element => {
        const Component = component
        return (
            <div className="flow mb-2">
                {colorArr.map(color => (
                    <Component key={`${name || "component"}-${color}`} className={className} color={color}>
                        {children && children}
                    </Component>
                ))}
            </div>
        )}

    const Logos = ({ children, className }: Partial<GenericComponent>) => {
        const logo = ({ color }: Partial<IChildComponent>) => (
            <Card key={`logo-${color}`} className="text-center" img={(<div className={mergeClass(["p-2"])}><SiteLogo height={48} className={`text--${color}`} /></div>)}>
                {capitalize(color)}
            </Card>
        )

        return (
            <Components component={logo} className={className} name="buttons">
                {children && children}
            </Components>
        )}

    const Anchors = ({ children, className }: Partial<GenericComponent>) => {
        const anchor = ({ color }: Partial<IChildComponent>) => (
            <div className={"display-inline p-2 rounded-1"}>
                <a className={mergeClass([`text--${color}`, className])} href="">
                    {capitalize(color)}
                </a>
            </div>
        )

        return (
            <Components component={anchor} className={className} name="buttons">
                {children && children}
            </Components>
        )}

    const Buttons = ({ children, className, disabled }: Partial<IButton>) => {
        const button = ({ className, children, color }: Partial<IChildComponent>) => (
            <button className={mergeClass([`button--${color}`, className])} disabled={disabled}>
                {capitalize(color)}
            </button>
        )

        return (
            <Components component={button} className={className} name="buttons">
                {children && children}
            </Components>
        )}

    const Swatch = ({color, swatch}: Partial<SwatchProps>) => {
        const img = (
            <div id={`brand-${color}-${swatch}`} className={`bg--${color}-${swatch} w-100 py-4`}>
            </div>
        )
        const [hex, setHex] = useState("")

        useEffect(() => setHex(
            rgba2hex(
                window.getComputedStyle(
                    document.querySelector(`#brand-${color}-${swatch}`), null
                ).getPropertyValue("background-color")
            )
        ), [color, swatch])

        return (
            <Card key={`${color}-${swatch}`} img={img} className="flex-grow">
                <div className="text-center">
                    {hex.toUpperCase()}
                </div>
            </Card>
        )
    }
    const Color = ({ color = "", label = ""}: Partial<ColorProps>): JSX.Element => (
        <>
            <h3 className="mb-2">{label}</h3>
            <div className="flow mb-2">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(swatch => (
                    <Swatch key={`colorswatch-${color}-${swatch}`} color={color} swatch={swatch} />
                ))}
            </div>
        </>
    )
    const Colors = (): JSX.Element => (
        <>
            {colorArr.map(color => (
                <Color key={`color-${color}`} color={color} label={capitalize(color)} />
            ))}
        </>
    )

    const Section = ({children}: Partial<GenericComponent>): JSX.Element => (<div className="bg--dark-300 p-3 rounded-xxl-2 my-3">{children && children}</div>)

    return (
        <Layout className='flex flex-column justify-content-center align-items-center flow px-0'>
            <div className="p-3 p-xxl-0">
                <h1 className="text--gold">
                    Branding
                </h1>
                <p>
                    Here we will describe some color palettes, how components will look, etc. Strap in!
                </p>
            </div>
            <Section>
                <h2>
                    Palette rainbow
                </h2>
                <p>
                    Just showing the colors in a rainbow arrangement next to each other.
                </p>
                <div className="rounded-2 display-inline-flex">
                    {colorArr.map(color => <div key={`rainbow-${color}`} className={mergeClass(["display-inline-block p-2 m-0", `bg--${color}`])}></div>)}
                </div>
            </Section>
            <Section>
                <h2>
                    Logo
                </h2>
                <p>
                    This just displays the logo across all the palettes.
                </p>
                <Logos />
            </Section>
            <Section>
                <h2>
                    Anchor tags
                </h2>
                <p>
                    For links we have styles too.
                </p>
                <Anchors>Anchor!</Anchors>
            </Section>
            <Section>
                <h2>
                    Button
                </h2>
                <p>
                    We have small, regular and large buttons, as well as outlined variants in the same sizes.
                </p>
                <Buttons className="button-sm">Button!</Buttons>
                <Buttons>Button!</Buttons>
                <Buttons className="button-lg">Button!</Buttons>
                <Buttons className="button-outline button-sm">Button!</Buttons>
                <Buttons className="button-outline">Button!</Buttons>
                <Buttons className="button-outline button-lg">Button!</Buttons>

                <h3 className="mt-3">Disabled state</h3>
                <p>
                    Buttons obviously have a disabled state.
                </p>
                <Buttons disabled className="button-sm">Button!</Buttons>
                <Buttons disabled>Button!</Buttons>
                <Buttons disabled className="button-lg">Button!</Buttons>
                <Buttons disabled className="button-outline button-sm">Button!</Buttons>
                <Buttons disabled className="button-outline">Button!</Buttons>
                <Buttons disabled className="button-outline button-lg">Button!</Buttons>
            </Section>
            <Section>
                <h2>
                    Swatches
                </h2>
                <p>
                    We have a few main colors, and a number of variants for each. Look at them!
                </p>

                <Colors />
            </Section>
        </Layout>
    )
}