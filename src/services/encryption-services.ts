import { aes, rsa } from 'aes-encryption-module';

export class EncryptionServices {

    /**
     * Generates an AES key using the browser ID.
     * 
     * @param {string} browserId - The unique identifier for the browser.
     * @returns {string} - The generated AES key.
     * @throws Will throw an error if AES key generation fails.
     */
    getAesKey(browserId: string): string {
        try {
            const key = aes.generateAESKeyFromBrowserId(browserId);
            return key;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Encrypts an AES key using an RSA public key.
     * 
     * @param {string} aesKey - The AES key to be encrypted.
     * @param {string} publicKey - The RSA public key used for encryption.
     * @returns {string} - The encrypted AES key.
     * @throws Will throw an error if RSA encryption fails.
     */
    encryptAesKeyByRsaPublicKey(aesKey: string, publicKey: string): string {
        try {
            const encryptedAesKey = rsa.encryptWithRSA(aesKey, publicKey);
            return encryptedAesKey;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Decrypts an encrypted payload using an AES key.
     * 
     * @param {string} encryptedPayload - The payload encrypted with AES.
     * @param {string} aesKey - The AES key used for decryption.
     * @returns {string} - The decrypted payload.
     * @throws Will throw an error if AES decryption fails.
     */
    decryptPayloadByAesKey(encryptedPayload: string, aesKey: string): string {
        try {
            const decryptedPayloadByAesKey = aes.decryptWithAES(encryptedPayload, aesKey);
            return decryptedPayloadByAesKey;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Encrypts a payload using an AES key.
     * 
     * @param {string} payload - The plaintext payload to be encrypted.
     * @param {string} aesKey - The AES key used for encryption.
     * @returns {string} - The encrypted payload.
     * @throws Will throw an error if AES encryption fails.
     */
    encryptPayloadByAesKey(payload: string, aesKey: string): string {
        try {
            const encryptedData = aes.encryptWithAES(payload, aesKey);
            return encryptedData;
        } catch (error) {
            throw error;
        }
    }
}
