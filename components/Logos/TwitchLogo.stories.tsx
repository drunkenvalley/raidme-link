import Component from "@/components/Logos/TwitchLogo"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: "Symbols/Logos/Twitch",
    component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const TwitchLogo = Template.bind({})
TwitchLogo.args = {
    className: "text--dark",
    height: 64
}