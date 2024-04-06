import {MeetingsTable} from "./tables";
import {useMeetingsQuery} from "../services/meetings.ts";
import {toast} from "react-toastify";

export function DashboardMeetingsTable() {
    const { isLoading, isError, data } = useMeetingsQuery(
        {
            page: 0,
            pageSize: 5,
            sortBy: "date",
            sortDirection: "asc"
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
        <div className="mt-4 lg:mt-10">
            <MeetingsTable data={data.content} />
        </div>
    )
}