import {Request, Response} from 'express'
import {blogsRepository} from '../repository/blogsRepository'
import {BlogOutputModel} from "../types/output/blog-output.type";

export const findBlogController = async (req: Request<{id: string}>, res: Response<BlogOutputModel | {}>) => {
    const foundBlog = await blogsRepository.findBlogAndMap(req.params.id)
    res.status(200).send(foundBlog)
}