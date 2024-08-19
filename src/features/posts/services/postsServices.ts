import {PostDbModel} from '../../../common/types/db/post-db.model'
import {postCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {blogsRepository} from '../../blogs/repositories/blogsRepository'
import {CreatePostInputModel} from "../types/input/create-post-input.type";
import {PostOutputModel} from "../types/output/post-output.type";
import {UpdatePostInputModel} from "../types/input/update-post-input.type";
import {postsRepository} from "../repository/postsRepository";


export const postsServices = {
    async createPost(post: CreatePostInputModel) {
        const {title, shortDescription, content, blogId} = post
        const newPost: PostDbModel = {
            ...{title, shortDescription, content, blogId},
            blogName: (await blogsRepository.findBlogById(post.blogId))!.name,
            createdAt: new Date().toISOString()
        }
        return postsRepository.createPost(newPost) // return _id -objectId
    },
    async deletePost(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return false
        return postsRepository.deletePost(new ObjectId(id))
    },
    async updatePost(post: UpdatePostInputModel, id: string) {
        return postsRepository.updatePost(post,id)
    },

}