import { useEffect, useState } from 'react';
import { getDocuments } from '../data';
import { DocumentsTable } from '../components';

export function Documents() {
	const [documents, setDocuments] = useState<Document[]>([]);

	useEffect(() => {
		(async () => {
			const data: Document[] = await getDocuments();
			setDocuments(data);
		})();
	}, []);

	return (
		<div className='p-4 sm:ml-64'>
			<div className='p-4 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg mt-14'>
				{/* <div className='flexitems-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800'>
					<p className='text-2xl text-gray-400 dark:text-gray-500'>Documents</p>
				</div> */}
				<DocumentsTable data={documents} />
			</div>
		</div>
	);
}
