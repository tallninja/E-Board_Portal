import {ChangeEvent, FormEvent, useState} from "react";
import {useSelector} from "react-redux";
import {CloudArrowIcon} from "../icons";
import {RootState} from "../../store.ts";
import {useUploadAudioRecordingMutation} from "../../services";

interface Props {
    afterSubmit: Function
}

export function AudioRecordingForm({ afterSubmit } : Props) {
    const [file, setFile] = useState<File>(null);
    const meeting: Meeting = useSelector((state: RootState) => state.meetings.meeting)
    const [uploadAudioRecording, _result] = useUploadAudioRecordingMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        await uploadAudioRecording({ meetingId: meeting.id, formData })
        afterSubmit();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center w-full mb-4">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudArrowIcon/>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            or drag and drop
                        </p>
                        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                            MP3, WAV, or REC (MAX. 1GB)
                        </p>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {file?.name}
                        </p>
                    </div>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setFile(e.target.files?.[0] ?? null);
                        }}
                        required
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                    />
                </label>
            </div>
            <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    )
}