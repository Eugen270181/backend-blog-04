import {BlogDbModel} from '../../../common/types/db/blog-db.model'
import {blogCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {BlogOutputModel} from "../types/output/blog-output.type";



export const blogsQueryRepository = {
    async findBlogAndMap(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        const blog = (await blogCollection.findOne({ _id: new ObjectId(id) }))! // ! используем этот метод если проверили существование
        return this.map(blog)
    },
    async findBlogsAndMap() {
        const blogs = await blogCollection.find({}).toArray()
        return blogs.map(b => this.map(b))
    },
    map(blog:WithId<BlogDbModel>):BlogOutputModel{
        const { _id, ...blogForOutput } = blog;//деструктуризация
        return {id:blog._id.toString(),...blogForOutput}
    },
}
