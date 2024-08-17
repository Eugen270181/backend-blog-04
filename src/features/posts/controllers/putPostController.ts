import {Request, Response} from 'express'
import {postsRepository} from '../repository/postsRepository'
import {UpdatePostInputModel} from "../types/input/update-post-input.type";


export const putPostController = async (req: Request<{id: string}, any, UpdatePostInputModel>, res: Response) => {
    await postsRepository.updatePost(req.body,req.params.id)
    res.sendStatus(204)
}