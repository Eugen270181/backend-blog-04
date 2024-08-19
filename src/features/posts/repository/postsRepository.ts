import {PostDbModel} from '../../../common/types/db/post-db.model'
import {postCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {blogsRepository} from '../../blogs/repositories/blogsRepository'
import {CreatePostInputModel} from "../types/input/create-post-input.type";
import {PostOutputModel} from "../types/output/post-output.type";
import {UpdatePostInputModel} from "../types/input/update-post-input.type";


export const postsRepository = {
    async createPost(post: PostDbModel) {
        const result = await postCollection.insertOne(post)
        return result.insertedId.toString() // return _id -objectId
    },
    async findPostById(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return null
        return postCollection.findOne({ _id: new ObjectId(id) })
    },
    async deletePost(id: ObjectId) {
        const result = await postCollection.deleteOne({ _id: id })
        return result.deletedCount > 0
    },
    async updatePost(post: UpdatePostInputModel, id: string) {
        const {title, shortDescription, content, blogId} = post
        const blog = ( await blogsRepository.findBlogById(post.blogId) )!
        const filter = { _id: new ObjectId(id) }
        const updater = { $set: { ...{title, shortDescription, content, blogId},  blogName:blog.name} }
        const result = await postCollection.updateOne( filter, updater );
        return result.modifiedCount > 0;
    },
}