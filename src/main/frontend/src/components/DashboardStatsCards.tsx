import {useCountStatsQuery} from "../services/stats.ts";
import {toast} from "react-toastify";
import {StatsCard} from "./StatsCard.tsx";
import {AudioIcon, FilePdfIcon, UserGroupIcon, VideoIcon} from "./Icons";

export function DashboardStatsCards() {
    const { isLoading, isError, data: countStats } = useCountStatsQuery(null, {
        pollingInterval: 5000,
        skipPollingIfUnfocused: true,
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return toast.error("An error occurred!");
    }

    return (
        <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4'>
            <StatsCard
                icon={<UserGroupIcon/>}
                color="teal"
                count={countStats.meetings}
                text="Meetings"
                href="/dashboard/meetings"
            />
            <StatsCard
                icon={<FilePdfIcon/>}
                color="green"
                count={countStats.documents}
                text="Documents"
                href="/dasboard/media/documents"
            />
            <StatsCard
                icon={<AudioIcon/>}
                color="amber"
                count={countStats.audioRecordings}
                text="Audio Recordings"
                href="/dasboard/media/audios"
            />
            <StatsCard
                icon={<VideoIcon/>}
                color="red"
                count={countStats.videoRecordings}
                text="Video Recordings"
                href="/dasboard/media/videos"
            />
        </div>
    )
}