import {postCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {PostOutputModel} from "../types/output/post-output.type";
import {PostDbModel} from "../../../common/types/db/post-db.model";


export const postsQueryRepository = {
    async findPostById(id: string) {
        const isIdValid = ObjectId.isValid(id)
        if (!isIdValid) return null
        return postCollection.findOne({ _id: new ObjectId(id) })
    },
    async findPostAndMap(id: string) {
        const post = await this.findPostById(id)
        return post?this.map(post):null
    },
    async getPostsAndMap(query?:any, blogId?:string) { // используем этот метод если проверили валидность и существование в бд значения blogid
        const byId = blogId ? {blogId:new ObjectId(blogId)} : {}
        const posts = await postCollection.find({byId} ).toArray()
        return posts.map(p => this.map(p))
    },
    map(post:WithId<PostDbModel>):PostOutputModel{
        const { _id, ...postForOutput } = post;//деструктуризация
        return {id:post._id.toString(),...postForOutput}
    },
}