import { ReactNode } from 'react';
import { TableFilterSearch } from './TableFilterSearch';
import { TablePageNavigation } from './TablePageNavigation';

interface Props {
	children: ReactNode;
}

export function TableWrapper({ children }: Props) {
	return (
		<>
			<TableFilterSearch />
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				{children}
			</div>
			<TablePageNavigation />
		</>
	);
}
