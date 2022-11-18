import Component from "@/components/Logos/TwitchLogo"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: "Graphics/Logos/Twitch",
    component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const Twitch = Template.bind({})
Twitch.args = {
    className: "text--purple",
    height: 64
}
