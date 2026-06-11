export async function encryptTimestamp(publicKey?: string): Promise<string> {
  try {
    // If no key provided, try to fetch a public.pem from the public folder (dev fallback)
    let pem = publicKey;
    if (!pem) {
      try {
        const resp = await fetch('/public.pem');
        if (!resp.ok) throw new Error('public.pem not found');
        pem = await resp.text();
      } catch (err) {
        throw new Error(
          'No public key provided and failed to fetch /public.pem. Set NEXT_PUBLIC_RSA_PUBLIC_KEY or place public.pem in the public/ folder.'
        );
      }
    }

    if (!pem) throw new Error('Public key is empty');

    // Accept either a full PEM string or the base64 block
    let pemContents = pem
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .trim();

    // Remove whitespace/newlines
    pemContents = pemContents.replace(/\s/g, '');

    if (!pemContents) throw new Error('Invalid public key format');

    const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

    const importedKey = await crypto.subtle.importKey(
      'spki',
      binaryDer.buffer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['encrypt']
    );

    const timestamp = new Date().toISOString();
    const encoded = new TextEncoder().encode(timestamp);

    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      importedKey,
      encoded
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (error) {
    console.warn('encryptTimestamp error, falling back to unencrypted timestamp:', error);
    // Fallback: return base64 of the timestamp so the caller still receives a value.
    return btoa(new Date().toISOString());
  }
}
