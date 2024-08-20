import {Request, Response} from 'express'
import {BlogOutputModel} from "../types/output/blog-output.type";
import {postsQueryRepository} from "../../posts/repository/postsQueryRepository";
import {pagPostOutputModel} from "../../posts/types/output/pag-post-output.type";
import {PostOutputModel} from "../../posts/types/output/post-output.type";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";

export const findBlogPostsController = async (req: Request<{id: string}>, res: Response<PostOutputModel[]>) => {
    const blogId = req.params.id
    const foundBlog = await blogsQueryRepository.findBlogById(blogId)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    const foundPosts = await postsQueryRepository.getPostsAndMap(blogId)
    res.status(200).send(foundPosts)
}