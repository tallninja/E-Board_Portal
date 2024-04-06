import {MouseEventHandler, ReactNode} from 'react';
import { TableFilterSearch } from './TableFilterSearch';

interface Props {
	ctaButtonText?: string;
	onCtaButtonClick?: MouseEventHandler
}

export function TableWrapper({ ctaButtonText, onCtaButtonClick }: Props) {
	return (
		<>
			<div className="flex items-center flex-row justify-between">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
					Upcoming Meetings
				</h2>
				<TableFilterSearch />
				<button
					className="py-1.5 px-4 text-white font-semibold bg-green-700 hover:bg-green-500 rounded-md"
					type="button"
					onClick={onCtaButtonClick}
				>
					{ctaButtonText || "New"}
				</button>
			</div>
		</>
	);
}
