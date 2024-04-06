interface Meeting {
	id: string;
	title: string;
	date: Date;
	startTime: string;
	endTime: string;
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
	middleName: string;
	lastName: string;
	fullName: string;
	email: string;
	phoneNumber: string;
}

interface Tokens {
	accessToken: string,
	refreshToken: string,
	expires: number
}

interface LoginResponse {
	user: AuthUser,
	tokens: Tokens
}

interface LoginRequest {
	email: string,
	password: string
}

interface CountStats {
	meetings: number;
	documents: number;
	audioRecordings: number;
	videoRecordings: number;
}

interface Page {
	page?: number,
	pageSize?: number,
	sortDirection?: string,
	sortBy?: string,
}
