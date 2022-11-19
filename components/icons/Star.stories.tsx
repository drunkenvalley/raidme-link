import Component from "@/components/icons/Star"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: "Graphics/Icons/Star",
    component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const Star = Template.bind({})
Star.args = {
    className: "text--gold",
    filled: true,
    height: 64
}
