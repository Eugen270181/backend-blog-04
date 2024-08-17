import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../common/middleware/inputCheckErrorsMiddleware'
import {blogsRepository} from '../../blogs/repository/blogsRepository'
import {NextFunction, Request, Response} from 'express'
import {postsRepository} from '../repository/postsRepository'
import {WithId} from "mongodb";
import {BlogDbModelType} from "../../../common/types/db/blog-db-model.type";

export const titleValidator = body('title').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('more then 30 or 0')
export const shortDescriptionValidator = body('shortDescription').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('more then 100 or 0')
export const contentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('more then 1000 or 0')
export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(async (blogId:string) => {
        let blog:WithId<BlogDbModelType>|null= await blogsRepository.findBlogById(blogId)
        if (!blog) {throw new Error('Incorrect blogId!')}
        // console.log(blog)
        return true
    }).withMessage('no blog')

export const findPostValidator = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const foundPost = await postsRepository.findPostById(req.params.id)
    if (!foundPost) {
        res.status(404).send({})
        return
    }

    next()
}

export const postValidators = [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware,
]