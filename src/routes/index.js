import {home, userAdd} from './home';

import koaRouter from 'koa-router';
export const router = koaRouter();

router.get('/', home);
router.post('/user/add', userAdd);
