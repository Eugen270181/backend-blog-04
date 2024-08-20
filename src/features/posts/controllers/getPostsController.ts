import {Request, Response} from 'express'
import {PostOutputModel} from "../types/output/post-output.type";
import {postsQueryRepository} from "../repository/postsQueryRepository";

export const getPostsController = async (req: Request, res: Response<PostOutputModel[]>) => {
    const foundPosts = await postsQueryRepository.getPostsAndMap()
    res.status(200).send(foundPosts)
}