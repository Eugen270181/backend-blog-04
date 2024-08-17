import {Request, Response} from 'express'
import {postsRepository} from '../repository/postsRepository'
import {PostOutputModel} from "../types/output/post-output.type";

export const findPostController = async (req: Request<{id: string}>, res: Response<PostOutputModel | {}>) => {
    const foundPost = await postsRepository.findPostAndMap(req.params.id)
    res.status(200).send(foundPost)
}