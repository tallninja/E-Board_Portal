import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {BottomNavigation} from "../components";

export function MeetingDocuments() {
    const meeting = useSelector((state: RootState) => state.meetings.meeting);

    return (
        <div className='p-4 sm:ml-64 sm:mt-14 h-full'>
            <h1 className='text-4xl font-semibold text-gray-500 dark:text-gray-50'>{meeting.title}</h1>
            <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>

                <BottomNavigation/>
            </div>
        </div>
    )
}