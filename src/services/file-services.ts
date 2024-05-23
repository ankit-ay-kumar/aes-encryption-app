import fs from 'fs';
import path from 'path';

const AES_KEYS_DIR = path.join(__dirname, '..', 'aes_keys'); // Directory to store AES key files

/**
 * Ensures that the directory exists. If it does not, it creates the directory.
 * 
 * @param {string} dirPath - The path of the directory to check/create.
 */
const ensureDirectoryExists = (dirPath: string): void => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

/**
 * Saves the AES key to a JSON file named with the browser ID.
 * 
 * @param {string} browserId - The unique identifier for the browser.
 * @param {string} aesKey - The AES key to be saved.
 */
const saveAesKeyToLocalFile = (browserId: string, aesKey: string): void => {
    try {
        ensureDirectoryExists(AES_KEYS_DIR); // Ensure the directory exists
        const jsonData = JSON.stringify({ aesKey });
        const fileName = `${browserId}.json`;
        const filePath = path.join(AES_KEYS_DIR, fileName);
        fs.writeFileSync(filePath, jsonData);
        console.log(`AES key saved to ${filePath}`);
    } catch (err) {
        console.error(`Error writing AES key to file ${browserId}.json:`, err);
    }
};

/**
 * Reads the AES key from a JSON file named with the browser ID.
 * 
 * @param {string} browserId - The unique identifier for the browser.
 * @returns {string | null} - The AES key if the file is found and read successfully, otherwise null.
 */
const getAesKeyFromFile = (browserId: string): string | null => {
    const fileName = `${browserId}.json`;
    const filePath = path.join(AES_KEYS_DIR, fileName);
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const aesKey = JSON.parse(jsonData).aesKey;
        return aesKey;
    } catch (err) {
        console.error(`Error reading AES key from file ${fileName}:`, err);
        return null;
    }
};

export { saveAesKeyToLocalFile, getAesKeyFromFile };
