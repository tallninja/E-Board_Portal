import {Outlet, useParams} from "react-router-dom";
import {useGetMeetingBySlugQuery} from "../services";
import {toast} from "react-toastify";
import {setMeeting} from "../features";
import {useDispatch} from "react-redux";

export function PersistMeeting() {
    const dispatch = useDispatch();
    const { meetingSlug } = useParams();
    const { isLoading, isError, data } = useGetMeetingBySlugQuery(meetingSlug);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return toast.error("An error occurred!");
    }

    dispatch(setMeeting(data))

    return (
        <Outlet />
    )
}