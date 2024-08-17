import {PostDbModelType} from '../../../common/types/db/post-db-model.type'
import {postCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {blogsRepository} from '../../blogs/repository/blogsRepository'
import {CreatePostInputModel} from "../types/input/create-post-input.type";
import {PostOutputModel} from "../types/output/post-output.type";
import {UpdatePostInputModel} from "../types/input/update-post-input.type";


export const postsRepository = {
    async createPost(post: CreatePostInputModel) {
        const {title, shortDescription, content, blogId} = post
        const newPost: PostDbModelType = {
            ...{title, shortDescription, content, blogId},
            blogName: (await blogsRepository.findBlogById(post.blogId))!.name,
            createdAt: new Date().toISOString()
        }
        const result = await postCollection.insertOne(newPost);
        return result.insertedId.toString() // return _id -objectId
    },
    async findPostById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return postCollection.findOne({ _id: new ObjectId(id) });
    },
    async findPostAndMap(id: string) {
        const post = ( await postsRepository.findPostById(id) )! // ! используем этот метод если проверили существование
        return this.map(post)
    },
    async findPostsAndMap() {
        const posts = await postCollection.find({}).toArray()
        return posts.map(p => this.map(p))
    },
    async deletePost(id: string) {
        const result = await postCollection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    },
    async updatePost(post: UpdatePostInputModel, id: string) {
        const {title, shortDescription, content, blogId} = post
        const blog = ( await blogsRepository.findBlogById(post.blogId) )!
        const result = await postCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...{title, shortDescription, content, blogId},  blogName:blog.name} }
        );
        return result.modifiedCount > 0;
    },
    map(post:WithId<PostDbModelType>):PostOutputModel{
        const { _id, ...postForOutput } = post;//деструктуризация
        return {id:post._id.toString(),...postForOutput}
    },
}