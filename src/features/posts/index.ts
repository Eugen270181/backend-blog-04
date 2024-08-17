import {Router} from 'express'
import {createPostController} from './controllers/createPostController'
import {getPostsController} from './controllers/getPostsController'
import {findPostController} from './controllers/findPostController'
import {delPostController} from './controllers/delPostController'
import {putPostController} from './controllers/putPostController'
import {findPostValidator, postValidators} from './middlewares/postValidators'
import {adminMiddleware} from '../../common/middleware/admin-middleware'

export const postsRouter = Router()

postsRouter.post('/',  adminMiddleware, ...postValidators, createPostController)
postsRouter.get('/', getPostsController)
postsRouter.get('/:id', findPostValidator, findPostController)
postsRouter.delete('/:id',  adminMiddleware, findPostValidator, delPostController)
postsRouter.put('/:id', adminMiddleware, findPostValidator, ...postValidators, putPostController)

// не забудьте добавить роут в апп