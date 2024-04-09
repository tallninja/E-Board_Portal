import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useCreateMeetingMutation} from "../../services";
import {MeetingForm} from "./MeetingForm.tsx";

export function CreateMeetingForm() {
    const [
        createMeeting,
        {
            isLoading,
            isError,
            isSuccess,
            error,
            data
        }] = useCreateMeetingMutation();
    const navigate = useNavigate();

    const handleSubmit = async (meeting: Meeting) => {
        await createMeeting(meeting);
    }

    if (isSuccess) {
        navigate(`/dashboard/meetings/${data.slug}`)
    }

    if (isError) {
        toast.error(error)
    }

    return <MeetingForm onSubmit={handleSubmit} isLoading={isLoading ?? false} />
}