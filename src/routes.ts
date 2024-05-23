import { Router } from 'express';
import { EncryptionController } from './controllers/encryption-controller';

const router = Router();

router.post('/payload/process', EncryptionController.getProcessedPayloadDecryptedByAesKeys);
router.post('/aesKey', EncryptionController.getEncryptedAesKey);

export default router;
