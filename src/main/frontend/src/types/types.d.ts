interface Meeting {
	id: number;
	title: string;
	date: Date;
	start: number;
	end: number;
}

interface Document {
	id: number;
	meetingId: number;
	fileName: string;
	fileType: string;
	pages: number;
	fileSize: string;
}

interface VideoRecording {
	id: number;
	meetingId: number;
	fileName: string;
	fileType: string;
	duration: string;
	fileSize: string;
}

interface AudioRecording {
	id: number;
	meetingId: number;
	fileName: string;
	fileType: string;
	duration: string;
	fileSize: string;
}

interface User {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
}

interface AuthUser {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}
