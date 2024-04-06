import {MouseEventHandler, ReactNode} from 'react';
import { TableFilterSearch } from './TableFilterSearch';
import { TablePageNavigation } from './TablePageNavigation';

interface Props {
	children: ReactNode;
	ctaButtonText?: string;
	onCtaButtonClick?: MouseEventHandler
}

export function TableWrapper({ children, ctaButtonText, onCtaButtonClick }: Props) {
	return (
		<>
			<div className="flex items-center flex-row justify-between">
				<TableFilterSearch />
				<button
					className="py-1.5 px-4 text-white font-semibold bg-green-700 hover:bg-green-500 rounded-md"
					type="button"
					onClick={onCtaButtonClick}
				>
					{ctaButtonText || "New"}
				</button>
			</div>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				{children}
			</div>
			<TablePageNavigation />
		</>
	);
}
