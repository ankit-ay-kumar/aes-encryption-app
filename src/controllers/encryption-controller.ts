import { Request, Response } from 'express';
import { EncryptionServices } from '../services/encryption-services';
import { saveAesKeyToLocalFile, getAesKeyFromFile } from '../services/file-services';

const encryptionServices = new EncryptionServices();

export const EncryptionController = {
  /**
   * Handles the request to get the AES key encrypted with a given RSA public key.
   * Saves the AES key to a file associated with the browser ID.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  getEncryptedAesKey: async (req: Request, res: Response) => {
    try {
      const browserId = req.headers.browserid as string;
      if (!browserId) {
        return res.status(400).json({ status: 'error', message: 'Browser ID is missing from headers' });
      }

      const publicKey = req.body.publicKey as string;
      if (!publicKey) {
        return res.status(400).json({ status: 'error', message: 'Public key is missing from request body' });
      }

      const aesKey = encryptionServices.getAesKey(browserId);
      // Call the saveAesKeyToLocalFile function
      saveAesKeyToLocalFile(browserId, aesKey);

      const encryptedAesKey = encryptionServices.encryptAesKeyByRsaPublicKey(aesKey, publicKey);
      res.json({ status: 'success', data: encryptedAesKey });
    } catch (error) {
      console.error('Error in getEncryptedAesKey:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },

  /**
   * Handles the request to decrypt a payload using the AES key retrieved from a file.
   * Processes the decrypted payload and then re-encrypts it before sending it back.
   * 
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  getProcessedPayloadDecryptedByAesKeys: async (req: Request, res: Response) => {
    try {
      const browserId = req.headers.browserid as string;
      if (!browserId) {
        return res.status(400).json({ status: 'error', message: 'Browser ID is missing from headers' });
      }

      const encryptedPayload = req.body.encryptedPayload as string;
      if (!encryptedPayload) {
        return res.status(400).json({ status: 'error', message: 'Encrypted payload is missing from request body' });
      }

      const aesKeyFromLocalFile = getAesKeyFromFile(browserId) as string;
      const decryptedPayload = encryptionServices.decryptPayloadByAesKey(encryptedPayload, aesKeyFromLocalFile);
      const processedPayload = JSON.parse(decryptedPayload);
      processedPayload.createdAt = new Date();

      const encryptProcessedPayload = encryptionServices.encryptPayloadByAesKey(JSON.stringify(processedPayload), aesKeyFromLocalFile);
      res.json({ status: 'success', data: encryptProcessedPayload });
    } catch (error) {
      console.error('Error in getProcessedPayloadDecryptedByAesKeys:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }
};
