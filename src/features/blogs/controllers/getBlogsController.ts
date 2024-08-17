import {Request, Response} from 'express'
import {blogsRepository} from '../repository/blogsRepository'
import {BlogOutputModel} from "../types/output/blog-output.type";

export const getBlogsController = async (req: Request, res: Response<BlogOutputModel[]>) => {
    const foundBlogs = await blogsRepository.findBlogsAndMap()
    res.status(200).send(foundBlogs)

}