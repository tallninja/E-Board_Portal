export function getAccessToken(): string {
    const accessToken: string | null = window.localStorage.getItem("a_t");
    return JSON.parse(accessToken!);
    // return accessToken ? await decrypt(accessToken) : "";
}

export function getRefreshToken(): string {
    const refreshToken: string | null = window.localStorage.getItem("r_t");
    return JSON.parse(refreshToken!);
    // return refreshToken ? await decrypt(refreshToken) : "";
}

export function setAccessToken(accessToken: string): void {
    // const encryptedAccessToken: string = await encrypt(accessToken);
    window.localStorage.setItem("a_t", JSON.stringify(accessToken))
}

export function setRefreshToken(refreshToken: string): void {
    // const encryptedRefreshToken: string = await encrypt(refreshToken);
    window.localStorage.setItem("r_t", JSON.stringify(refreshToken));
}