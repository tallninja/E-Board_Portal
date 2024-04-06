import {FormEvent, useState} from "react";
import {useCreateMeetingMutation} from "../../services/meetings.ts";

interface Props {
    afterSubmit: Function
}

export function MeetingForm({ afterSubmit } : Props) {
    const [meeting, setMeeting] = useState<Meeting>();
    const [createMeeting, _] = useCreateMeetingMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createMeeting(meeting);
        afterSubmit();
    }

    return (
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Meeting title"
                        required
                        value={meeting?.title}
                        onChange={(e) => setMeeting((prevState: Meeting) => ({ ...prevState, title: e.target.value }))}
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Date"
                        required
                        onChange={(e) => setMeeting((prevState: Meeting) => ({ ...prevState, date: new Date(e.target.value) }))}
                    />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label
                        htmlFor="start"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Start
                    </label>
                    <input
                        type="time"
                        name="start"
                        id="start"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="From"
                        required
                        value={meeting?.startTime}
                        onChange={(e) => setMeeting((prevState: Meeting) => ({ ...prevState, startTime: e.target.value }))}
                    />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label
                        htmlFor="end"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        End
                    </label>
                    <input
                        type="time"
                        name="end"
                        id="end"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="To"
                        required
                        value={meeting?.endTime}
                        onChange={(e) => setMeeting((prevState: Meeting) => ({ ...prevState, endTime: e.target.value }))}
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write meeting description here">
                    </textarea>
                </div>
            </div>
            <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"></path>
                </svg>
                Add new meeting
            </button>
        </form>
    )
}