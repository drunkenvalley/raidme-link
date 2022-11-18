import Component from "@/components/Clip"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: "Twitch/Clip",
    component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const Clip = Template.bind({})
Clip.args = {
    clip: {
        "id": "PoorLivelyJayPermaSmug-7tcPHw6-D2yrjESP",
        "url": new URL("https://clips.twitch.tv/PoorLivelyJayPermaSmug-7tcPHw6-D2yrjESP"),
        "embed_url": new URL("https://clips.twitch.tv/embed?clip=PoorLivelyJayPermaSmug-7tcPHw6-D2yrjESP"),
        "broadcaster_id": 190631385,
        "broadcaster_name": "Hozzerino",
        "creator_id": 27085413,
        "creator_name": "Drunkenvalley",
        "video_id": "",
        "game_id": 509660,
        "language": "en-gb",
        "title": "I'm a--",
        "view_count": 119,
        "created_at": new Date("2022-02-17T14:00:38Z"),
        "thumbnail_url": new URL("https://clips-media-assets2.twitch.tv/AT-cm%7C1LtEbO7XDx8Ovg9sq4xEjw-preview-480x272.jpg"),
        "duration": 43.4,
        "vod_offset": null
    }
}
