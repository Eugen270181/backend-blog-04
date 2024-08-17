import {Request, Response} from 'express'
import {blogsRepository} from '../repository/blogsRepository'
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";

export const putBlogController = async (req: Request<{id: string}, any, UpdateBlogInputModel>, res: Response) => {
    await blogsRepository.updateBlog(req.body,req.params.id)
    res.sendStatus(204)
}