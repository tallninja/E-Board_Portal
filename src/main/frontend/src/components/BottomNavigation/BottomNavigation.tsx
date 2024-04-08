import {useSelector} from "react-redux";
import {AudioIcon, FilePdfIcon, InfoCircleIcon, VideoIcon} from "../icons";
import {NavItem} from "./NavItem.tsx";
import {RootState} from "../../store.ts";

export function BottomNavigation() {
    const meeting = useSelector((state: RootState) => state.meetings.meeting)

    return (
        <div
            className="fixed bottom-0 left-0 z-50 sm:ml-64 sm:pr-64 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <NavItem
                    to={`/dashboard/meetings/${meeting.slug}`}
                    text="Details"
                    icon={
                        <InfoCircleIcon
                            className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        />
                    }
                />
                <NavItem
                    to={`/dashboard/meetings/${meeting.slug}/videos`}
                    text="Videos"
                    icon={
                        <VideoIcon
                            className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        />
                    }
                />
                <NavItem
                    to={`/dashboard/meetings/${meeting.slug}/audios`}
                    text="Audios"
                    icon={
                        <AudioIcon
                            className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        />
                    }
                />
                <NavItem
                    to={`/dashboard/meetings/${meeting.slug}/documents`}
                    text="Documents"
                    icon={
                        <FilePdfIcon
                            className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        />
                    }
                />
            </div>
        </div>

    )
}