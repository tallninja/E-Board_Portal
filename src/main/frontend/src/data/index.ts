import meetings from './meetings';
import documents from './documents';
import videos from './videos';
import audios from './audios';
import users from './users';

export async function getMeetings(): Promise<Meeting[]> {
	return Promise.resolve(meetings);
}

export async function getMeeting(id: number): Promise<Meeting | undefined> {
	return Promise.resolve(meetings.find((m) => m.id === id));
}

export function getDocuments(): Promise<Document[]> {
	return Promise.resolve(documents);
}

export function getDocument(id: number): Promise<Document | undefined> {
	return Promise.resolve(documents.find((d) => d.id === id));
}

export function getVideos(): Promise<Video[]> {
	return Promise.resolve(videos);
}

export function getVideo(id: number): Promise<Video | undefined> {
	return Promise.resolve(videos.find((v) => v.id === id));
}

export function getAudios(): Promise<Audio[]> {
	return Promise.resolve(audios);
}

export function getAudio(id: number): Promise<Audio | undefined> {
	return Promise.resolve(audios.find((a) => a.id === id));
}

export function getUsers(): Promise<User[]> {
	return Promise.resolve(users);
}

export function getUser(id: number): Promise<User | undefined> {
	return Promise.resolve(users.find((u) => u.id === id));
}
