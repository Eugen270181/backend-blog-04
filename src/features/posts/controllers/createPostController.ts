import {Response, Request} from 'express'
import {postsRepository} from '../repository/postsRepository'
import {CreatePostInputModel} from "../types/input/create-post-input.type";
import {PostOutputModel} from "../types/output/post-output.type";

export const createPostController = async (req: Request<any, any, CreatePostInputModel>, res: Response<PostOutputModel>) => {
    const newPostId = await postsRepository.createPost(req.body)
    const newPost = await postsRepository.findPostAndMap(newPostId)

    res
        .status(201)
        .json(newPost)
}