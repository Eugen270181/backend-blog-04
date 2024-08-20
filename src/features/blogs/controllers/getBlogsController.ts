import {Request, Response} from 'express'
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {inputQuerySanitizer} from "../../../common/module/inputQuerySanitizer";
import {anyQueryType} from "../../../common/types/any-query-type";

export const getBlogsController = async (req: Request, res: Response<pagBlogOutputModel>) => {
    const sanitizedQuery = inputQuerySanitizer(req.query)
    const foundBlogs = await blogsQueryRepository.getBlogsAndMap(sanitizedQuery)
    res.status(200).send(foundBlogs)

}