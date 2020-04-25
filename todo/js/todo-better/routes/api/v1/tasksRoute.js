import express from 'express';
import {
  index,
  show,
  create,
  update,
  destroy
} from '../../../controllers/api/v1/tasksController';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;