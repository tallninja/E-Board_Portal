import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {
    AudioRecordingForm,
    AudioRecordingsTable,
    BottomNavigation,
    CustomModal,
    TableFilterSearch,
    TableFooter
} from "../components";
import {useGetAudioRecordingsByMeetingQuery} from "../services";
import {toast} from "react-toastify";
import {useState} from "react";

export function MeetingAudios() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const meeting = useSelector((state: RootState) => state.meetings.meeting);
    const { isLoading, isError, data } = useGetAudioRecordingsByMeetingQuery(
        {
            meetingId: meeting.id,
            pageData: {
                page: 0,
                pageSize: 10,
            }
        },
        {
            pollingInterval: 10000,
            skipPollingIfUnfocused: true,
        }
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return toast.error("An error occurred!");
    }

    return (
        <>
            <div className='p-4 sm:ml-64 sm:mt-14 h-full'>
                <h1 className='text-4xl font-semibold text-gray-500 dark:text-gray-50'>{meeting.title}</h1>
                <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-5'>
                    <div className="mt-4">
                        <div className="flex items-center flex-row justify-between pb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Audios
                            </h2>
                            <TableFilterSearch/>
                            <button
                                className="py-1.5 px-4 text-white font-semibold bg-green-700 hover:bg-green-500 rounded-md"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                New Audio Recording
                            </button>
                        </div>

                        <AudioRecordingsTable data={data.content}/>

                        <TableFooter/>
                    </div>

                    <BottomNavigation/>
                </div>
            </div>

            <CustomModal
                showModal={showModal}
                setShowModal={setShowModal}
                title="Upload Audio Recording"
            >
                <AudioRecordingForm afterSubmit={() => setShowModal(false)}/>
            </CustomModal>
        </>
    )
}