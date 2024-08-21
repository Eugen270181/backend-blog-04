import {Request, Response} from 'express'
import {BlogOutputModel} from "../types/output/blog-output.type";
import {postsQueryRepository} from "../../posts/repository/postsQueryRepository";
import {pagPostOutputModel} from "../../posts/types/output/pag-post-output.type";
import {PostOutputModel} from "../../posts/types/output/post-output.type";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {validQueryType} from "../../../common/types/valid-query-type";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {anyQueryType} from "../../../common/types/any-query-type";

export const findBlogPostsController = async (req: Request<{id: string}>, res: Response<pagPostOutputModel>) => {
    const blogId = req.params.id
    const foundBlog = await blogsQueryRepository.findBlogById(blogId)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    const sanitizedQuery:validQueryType = inputQuerySanitizer(req.query as anyQueryType)
    const getPosts = await postsQueryRepository.getPostsAndMap(sanitizedQuery,blogId)
    res.status(200).send(getPosts)
}