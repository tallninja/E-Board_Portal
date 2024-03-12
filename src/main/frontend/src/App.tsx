import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Audios,
	DashBoard,
	Documents,
	Meetings,
	PageNotFound,
	Users,
	Videos,
} from './pages';
import { useTheme } from './hooks';
import { Wrapper } from './components';

const router = createBrowserRouter([
	{
		path: '/dashboard',
		element: <Wrapper />,
		children: [
			{ index: true, element: <DashBoard /> },
			{ path: 'meetings', element: <Meetings /> },
			{ path: 'media/documents', element: <Documents /> },
			{ path: 'media/audios', element: <Audios /> },
			{ path: 'media/videos', element: <Videos /> },
			{ path: 'users', element: <Users /> },
		],
	},
	{ path: '*', element: <PageNotFound /> },
]);

function App() {
	useTheme();

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
