import Component from "@/components/Icons/Star"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: "Symbols/Icons/Star",
    component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const Star = Template.bind({})
Star.args = {
    filled: true
}