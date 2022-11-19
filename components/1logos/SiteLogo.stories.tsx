import Component from "@/components/1logos/SiteLogo"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: "Graphics/Logos/Site",
    component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const Site = Template.bind({})
Site.args = {
    className: "text--dark",
    height: 64
}
