import {Request, Response} from 'express'
import {BlogOutputModel} from "../types/output/blog-output.type";
import {postsQueryRepository} from "../../posts/repository/postsQueryRepository";

export const findBlogPostsController = async (req: Request<{id: string}>, res: Response<BlogOutputModel | {}>) => {
    const foundBlog = await postsQueryRepository.findPostsAndMap(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundBlog)
}