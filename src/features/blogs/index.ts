import {Router} from 'express'
import {createBlogController} from './controllers/createBlogController'
import {getBlogsController} from './controllers/getBlogsController'
import {findBlogController} from './controllers/findBlogController'
import {delBlogController} from './controllers/delBlogController'
import {putBlogController} from './controllers/putBlogController'
import {blogValidators} from './middlewares/blogValidators'
import {adminMiddleware} from '../../common/middleware/admin-middleware'
import {findBlogPostsController} from "./controllers/findBlogPostsController";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.get('/:id/posts', findBlogPostsController)//new - task-04
blogsRouter.post('/:id/posts', adminMiddleware,...blogValidators, createBlogController)//new - task-04
blogsRouter.post('/', adminMiddleware,...blogValidators, createBlogController)
blogsRouter.delete('/:id', adminMiddleware, delBlogController)
blogsRouter.put('/:id', adminMiddleware, ...blogValidators, putBlogController)

// не забудьте добавить роут в апп