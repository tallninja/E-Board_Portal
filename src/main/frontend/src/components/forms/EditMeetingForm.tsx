import {toast} from "react-toastify";
import {useUpdateMeetingMutation} from "../../services";
import {MeetingForm} from "./MeetingForm.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

interface Props {
    afterSubmit: Function;
}

export function EditMeetingForm({ afterSubmit } : Props) {
    const [
        updateMeeting,
        {
            isLoading,
            isError,
            isSuccess,
            error
        }] = useUpdateMeetingMutation();
    const initialData: Meeting = useSelector((state: RootState) => state.meetings.meeting)

    const handleSubmit = async (meeting: Meeting) => {
        await updateMeeting({ id: initialData.id,  body: meeting });
    }

    if (isSuccess) {
      afterSubmit()
    }

    if (isError) {
        toast.error(error)
    }

    return (
        <MeetingForm
            onSubmit={handleSubmit}
            isLoading={isLoading ?? false}
            initialData={initialData}
        />
    )
}