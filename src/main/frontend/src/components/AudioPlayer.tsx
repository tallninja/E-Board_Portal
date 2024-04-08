interface Props {
    src: string;
    type: string;
}

export function AudioPlayer({ src, type } : Props) {
    return (
        <audio className="w-full" controls autoPlay>
            <source src={src} type={`audio/${type}`} />
            Your browser does not support the audio tag.
        </audio>
    )
}