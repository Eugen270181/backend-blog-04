import {Response, Request} from 'express'
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {BlogOutputModel} from "../types/output/blog-output.type";
import {blogsRepository} from "../repository/blogsRepository";





export const createBlogController = async (req: Request<any, any, CreateBlogInputModel>, res: Response<BlogOutputModel>) => {
    const newBlogId = await blogsRepository.createBlog(req.body)
    const newBlog = await blogsRepository.findBlogAndMap(newBlogId)




    res
        .status(201)
        .json(newBlog)
}