import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {BottomNavigation} from "../components";
import {useGetMeetingBySlugQuery} from "../services";
import {setMeeting} from "../features";
import {RootState} from "../store.ts";

export function Meeting() {
    const { meetingSlug } = useParams();
    const { isLoading, isError, data } = useGetMeetingBySlugQuery(meetingSlug);
    const meeting = useSelector((state: RootState) => state.meetings.meeting);
    const dispatch = useDispatch();

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return toast.error("An error occurred!");
    }

    dispatch(setMeeting(data))

    return (
        <div className='p-4 sm:ml-64 sm:mt-14 h-full'>
            <h1 className='text-4xl font-semibold text-gray-500 dark:text-gray-50'>
                {meeting?.title}
            </h1>
            <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>

                <BottomNavigation/>
            </div>
        </div>
    )
}