import IClip from "@/interfaces/IClip"
import Image from "next/image"
import Star from "@/components/1Icons/Star"
import { MouseEventHandler } from "react"

interface Props {
    clip?: IClip,
    onClick?: MouseEventHandler
}

export default function Clip ({ clip, onClick }: Props) {
    const func = (event) => {
        event.preventDefault()
        onClick(event)
    }

    return (
        clip &&
        <a href={clip.url.toString()} key={clip.id} className='flex flex-column min-w-0 text--gold clip'>
            <div className='p-0 m-0 rounded-1 clip-image-wrapper'>
                <Image alt={clip.title} src={clip.thumbnail_url.toString()} width={480} height={276} />
            </div>
            <article className='flex flex-row align-items-center py-2'>
                <div className='flex-grow-1 min-w-0 m-0 h3'>
                    <p className='truncate' title={clip.title}>
                        {clip.title}
                    </p>
                </div>
                <button type='button' onClick={func} className='button-outline button--gold button-sm p-1 ms-1 flex align-items-center'><Star filled={false} /></button>
            </article>
        </a> ||
        <div className='flex flex-column min-w-0 text--gold clip'>
            asd
        </div>
    )}