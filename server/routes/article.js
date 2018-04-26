import { Router } from 'express';
const router = Router();
import * as controller from '../controllers/article.controller';

router.get('/', controller.getOne);
router.put('/:articleId/:paragraphId', controller.addRemark);
router.put('/:articleId/:paragraphId/:remarkId', controller.approveRemark);
router.delete('/:articleId/:paragraphId', controller.deleteRemark);
router.get('/all', controller.getMany);

export default router;