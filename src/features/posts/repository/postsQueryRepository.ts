import {postCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {PostOutputModel} from "../types/output/post-output.type";
import {PostDbModel} from "../../../common/types/db/post-db.model";


export const postsQueryRepository = {
    async findPostAndMap(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        const post = ( await postCollection.findOne({ _id: new ObjectId(id) }) )! // ! используем этот метод если проверили существование
        return this.map(post)
    },
    async findPostsAndMap(blogId:string) {
        const isIdValid = ObjectId.isValid(blogId);
        if (!(blogId&&isIdValid)) return null
        const byId = blogId ? {blogId:new ObjectId(blogId)} : {}
        const posts = await postCollection.find({byId} ).toArray()
        return posts.map(p => this.map(p))
    },
    map(post:WithId<PostDbModel>):PostOutputModel{
        const { _id, ...postForOutput } = post;//деструктуризация
        return {id:post._id.toString(),...postForOutput}
    },
}