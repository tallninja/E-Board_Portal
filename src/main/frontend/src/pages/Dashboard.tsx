import {Content, StatsCard} from '../components';
import {AudioIcon, FilePdfIcon, UserGroupIcon, VideoIcon} from "../components/icons";
import {useCountStatsQuery} from "../services/stats.ts";
import {toast} from "react-toastify";

export function DashBoard() {
	const { isLoading, isError, data: countStats } = useCountStatsQuery();

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return toast.error("An error occurred!");
	}

	return (
		<>
			<h1 className='text-4xl'>Dashboard</h1>
			<div className='p-4 sm:ml-64 h-screen'>
				<div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>
					<div className='grid grid-cols-4 gap-4 mb-4'>
						<StatsCard
							icon={<UserGroupIcon />}
							color="teal"
							count={countStats.meetings}
							text="Meetings"
							href="/dashboard/meetings"
						/>
						<StatsCard
							icon={<FilePdfIcon />}
							color="green"
							count={countStats.documents}
							text="Documents"
							href="/dasboard/media/documents"
						/>
						<StatsCard
							icon={<AudioIcon />}
							color="yellow"
							count={countStats.audioRecordings}
							text="Audio Recordings"
							href="/dasboard/media/audios"
						/>
						<StatsCard
							icon={<VideoIcon />}
							color="red"
							count={countStats.videoRecordings}
							text="Video Recordings"
							href="/dasboard/media/videos"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
