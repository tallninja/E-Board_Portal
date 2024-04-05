// Define a secret key for encryption/decryption
const SECRET_KEY = "rxW!%wVADQAv3K%Ku9Cb#m9JqH$2qVNe";

// Function to encrypt plain text
export async function encrypt(data: string): Promise<string> {
    const encodedKey = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(SECRET_KEY),
        { name: 'AES-CBC' },
        false,
        ['encrypt']
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encryptedBytes = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv },
        encodedKey,
        new TextEncoder().encode(data)
    );

    return `${Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('')}:${Array.from(new Uint8Array(encryptedBytes))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')}`;
}

export async function decrypt(data: string): Promise<string> {
    const [ivHex, encryptedHex] = data.split(':');
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const encryptedBytes = new Uint8Array(encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    const encodedKey = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(SECRET_KEY),
        { name: 'AES-CBC' },
        false,
        ['decrypt']
    );

    const decryptedBytes = await window.crypto.subtle.decrypt(
        { name: 'AES-CBC', iv },
        encodedKey,
        encryptedBytes
    );

    return new TextDecoder().decode(decryptedBytes);
}