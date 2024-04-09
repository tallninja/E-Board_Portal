interface Meeting {
	id: string;
	slug: string;
	title: string;
	date: Date;
	startTime: string;
	endTime: string;
	description: string;
}

interface DocumentFile {
	id: string;
	fileName: string;
	fileType: string;
	fileSize: number;
	uri: string;
}

interface VideoRecording {
	id: string;
	fileName: string;
	fileType: string;
	fileSize: number;
	duration: number;
	uri: string;
}

interface AudioRecording {
	id: string;
	fileName: string;
	fileType: string;
	fileSize: number;
	duration: number;
	uri: string;
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

interface MeetingIdWithPageData {
	meetingId: string,
	pageData: Page
}

interface FileUploadRequest {
	meetingId: string,
	formData: FormData
}
