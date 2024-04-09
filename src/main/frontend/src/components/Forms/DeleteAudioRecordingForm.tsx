import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import {useDeleteAudioRecordingMutation} from "../../services";
import {toast} from "react-toastify";

interface Props {
    onCancel: (() => void),
    afterSubmit?: (() => void)
}

export function DeleteAudioRecordingForm({ onCancel, afterSubmit } : Props) {
    const audioRecording: AudioRecording = useSelector((state: RootState) => state.audioRecordings.audioRecording)
    const [deleteAudioRecording, {isLoading, isError, isSuccess, error}] = useDeleteAudioRecordingMutation();

    const handleDelete = async () => {
        await deleteAudioRecording(audioRecording.id);
    }

    if (isSuccess) {
        if (afterSubmit) {
            afterSubmit()
        }
    }

    if (isError) {
        toast.error(error);
    }

    return (
        <div className="p-4 md:p-5 text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want
                to delete this audio recording?
            </h3>
            <p className="mb-5 text-gray-500 dark:text-gray-400">
                {audioRecording?.fileName}
            </p>
            <button
                disabled={isLoading}
                onClick={handleDelete}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
            </button>
            <button
                disabled={isLoading}
                onClick={onCancel}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No,
                cancel
            </button>
        </div>
    )
}