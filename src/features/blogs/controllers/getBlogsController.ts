import {Request, Response} from 'express'
import {BlogOutputModel} from "../types/output/blog-output.type";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";

export const getBlogsController = async (req: Request, res: Response<BlogOutputModel[]>) => {
    const foundBlogs = await blogsQueryRepository.findBlogsAndMap()
    res.status(200).send(foundBlogs)

}