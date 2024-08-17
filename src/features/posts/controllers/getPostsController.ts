import {Request, Response} from 'express'
import {postsRepository} from '../repository/postsRepository'
import {PostOutputModel} from "../types/output/post-output.type";

export const getPostsController = async (req: Request, res: Response<PostOutputModel[]>) => {
    const foundPosts = await postsRepository.findPostsAndMap()
    res.status(200).send(foundPosts)
}