import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {BottomNavigation, StatsCard} from "../components";
import {useCountStatsQuery, useGetMeetingBySlugQuery, useGetMeetingCountStatsQuery} from "../services";
import {setMeeting} from "../features";
import {RootState} from "../store.ts";
import {AudioIcon, FilePdfIcon, UserGroupIcon, VideoIcon} from "../components/Icons";

export function Meeting() {
    const dispatch = useDispatch();
    const { meetingSlug } = useParams();
    const meeting: Meeting = useSelector((state: RootState) => state.meetings.meeting);
    const { isLoading, isError, data } = useGetMeetingBySlugQuery(meetingSlug);
    const statsQuery = useGetMeetingCountStatsQuery(meetingSlug, {
        pollingInterval: 5000,
        skipPollingIfUnfocused: true,
    });

    if (isLoading || statsQuery.isLoading) {
        return <p>Loading...</p>
    }

    if (isError || statsQuery.isError) {
        return toast.error("An error occurred!");
    }

    dispatch(setMeeting(data))

    return (
        <div className='p-4 sm:ml-64 sm:mt-14 h-screen'>
            <h1 className='text-4xl font-semibold text-gray-500 dark:text-gray-50'>
                {meeting?.title}
            </h1>
            <div className='h-2/3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>
                <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-3'>
                    <StatsCard
                        icon={<FilePdfIcon/>}
                        color="green"
                        count={statsQuery.data?.documents}
                        text="Documents"
                        href={`/dashboard/meetings/${meetingSlug}/documents`}
                    />
                    <StatsCard
                        icon={<AudioIcon/>}
                        color="amber"
                        count={statsQuery.data?.audioRecordings}
                        text="Audio Recordings"
                        href={`/dashboard/meetings/${meetingSlug}/audios`}
                    />
                    <StatsCard
                        icon={<VideoIcon/>}
                        color="red"
                        count={statsQuery.data?.videoRecordings}
                        text="Video Recordings"
                        href={`/dashboard/meetings/${meetingSlug}/videos`}
                    />
                </div>
                <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-3'>
                    <h4 className="text-2xl">Date: <span>{meeting?.date}</span></h4>
                    <h4 className="text-2xl">Start Time: <span>{meeting?.startTime}</span></h4>
                    <h4 className="text-2xl">End Time: <span>{meeting?.endTime}</span></h4>
                </div>

                <p className="text-xl text-gray-500">{meeting?.description}</p>
                <BottomNavigation/>
            </div>
        </div>
    )
}