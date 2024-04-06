import {MeetingsTable} from "./tables";
import {useMeetingsQuery} from "../services/meetings.ts";
import {toast} from "react-toastify";
import {useState} from "react";
import {MeetingForm} from "./forms";
import {CustomModal} from "./CustomModal.tsx";
import {TableFilterSearch} from "./tables/TableFilterSearch.tsx";

export function DashboardMeetingsTable() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const { isLoading, isError, data } = useMeetingsQuery(
        {
            page: 0,
            pageSize: 5,
        },
        {
            pollingInterval: 5000,
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
            <div className="mt-4 lg:mt-8">
                <div className="flex items-center flex-row justify-between pb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        New Meetings
                    </h2>
                    {/*<TableFilterSearch/>*/}
                    <button
                        className="py-1.5 px-4 text-white font-semibold bg-green-700 hover:bg-green-500 rounded-md"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        New Meeting
                    </button>
                </div>

                <MeetingsTable data={data.content}/>

                {/*<TableFooter />*/}
            </div>

            <CustomModal
                showModal={showModal}
                setShowModal={setShowModal} id="meeting-form-modal"
                title="Create New Meeting"
            >
                <MeetingForm afterSubmit={() => setShowModal(false)}/>
            </CustomModal>
        </>
    )
}