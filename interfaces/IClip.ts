export default interface IClip {
    id: string
    url: URL
    embed_url: URL
    broadcaster_id: number,
    broadcaster_name: string,
    creator_id: number,
    creator_name: string,
    video_id: string,
    game_id: number,
    language: string,
    title: string,
    view_count: number,
    created_at: Date,
    thumbnail_url: URL,
    duration: number,
    vod_offset: unknown
}