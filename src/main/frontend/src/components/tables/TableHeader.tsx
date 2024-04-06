import {TableFilterSearch} from "./TableFilterSearch.tsx";
import {MouseEventHandler} from "react";

interface Props {
    title: string;
    ctaButtonText: string;
    ctaButtonAction: MouseEventHandler
}

export function TableHeader({ title, ctaButtonText, ctaButtonAction } : Props) {
    return (
        <div className="flex items-center flex-row justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {title}
            </h2>
            <TableFilterSearch/>
            <button
                className="py-1.5 px-4 text-white font-semibold bg-green-700 hover:bg-green-500 rounded-md"
                type="button"
                onClick={ctaButtonAction}
            >
                {ctaButtonText}
            </button>
        </div>
    )
}