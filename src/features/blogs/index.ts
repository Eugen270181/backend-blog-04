import {Router} from 'express'
import {createBlogController} from './controllers/createBlogController'
import {getBlogsController} from './controllers/getBlogsController'
import {findBlogController} from './controllers/findBlogController'
import {delBlogController} from './controllers/delBlogController'
import {putBlogController} from './controllers/putBlogController'
import {blogValidators, findBlogValidator} from './middlewares/blogValidators'
import {adminMiddleware} from '../../common/middleware/admin-middleware'

export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', findBlogValidator, findBlogController)
blogsRouter.get('/:id/posts', findBlogValidator, findBlogController)//new - task-04
blogsRouter.post('/:id/posts', adminMiddleware,...blogValidators, createBlogController)//new - task-04
blogsRouter.post('/', adminMiddleware,...blogValidators, createBlogController)
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, delBlogController)
blogsRouter.put('/:id', adminMiddleware,findBlogValidator, ...blogValidators, putBlogController)

// не забудьте добавить роут в апп