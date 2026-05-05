import { Router } from 'express';
import * as petController from "../controllers/petController.js"
import requireAuth from '../middleware/requireAuth.js';
import isAdmin from '../middleware/requireAuth.js'
const router = Router();

router.get('/pets', petController.getAllPets)
router.post('/pet', requireAuth, isAdmin, petController.addPet)
router.put('/pet/:id', requireAuth, isAdmin, petController.updatePet)
router.delete('/pet/:id', requireAuth, isAdmin, petController.deletePet)

export default router