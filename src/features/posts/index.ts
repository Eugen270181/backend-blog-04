import {Router} from 'express'
import {createPostController} from './controllers/createPostController'
import {getPostsController} from './controllers/getPostsController'
import {findPostController} from './controllers/findPostController'
import {delPostController} from './controllers/delPostController'
import {putPostController} from './controllers/putPostController'
import {postValidators} from './middlewares/postValidators'
import {adminMiddleware} from '../../common/middleware/admin-middleware'

export const postsRouter = Router()


postsRouter.get('/', getPostsController)
postsRouter.get('/:id', findPostController)
postsRouter.post('/',  adminMiddleware, ...postValidators, createPostController)
postsRouter.delete('/:id',  adminMiddleware, delPostController)
postsRouter.put('/:id', adminMiddleware, ...postValidators, putPostController)

// не забудьте добавить роут в апп