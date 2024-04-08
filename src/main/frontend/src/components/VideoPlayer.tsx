interface Props {
    src: string;
    type: string;
}

export function VideoPlayer({ src, type } : Props) {
    return (
        <video className="w-full" controls autoPlay>
            <source src={src} type={`video/${type}`} />
            Your browser does not support the video tag.
        </video>
    )
}