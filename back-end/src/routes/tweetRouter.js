import { Router } from 'express';
import TwitterController from '../controllers/tweetControler.js';

const router = Router();

const twitterController = new TwitterController();

router.get('/tweets', twitterController.index);
router.get('/tweets/:id', twitterController.getOne);
router.post('/tweets', twitterController.store);
// there's no update
router.delete('/tweets/:id', twitterController.delete);

export default router;
