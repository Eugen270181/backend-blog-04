import {BlogDbModelType, extBlogDbModelType} from '../../../common/types/db/blog-db-model.type'
import {blogCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {BlogOutputModel} from "../types/output/blog-output.type";
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";


export const blogsRepository = {
    async createBlog(blog: BlogDbModelType):Promise<string> {
        const result = await blogCollection.insertOne(blog)
        return result.insertedId.toString() // return _id -objectId
    },
    async findBlogById(id:ObjectId) {
           return blogCollection.findOne({ _id: id })
    },
    async findBlogs() {
        return blogCollection.find({}).toArray()
    },
    async deleteBlog(id:ObjectId){
        const result = await blogCollection.deleteOne({ _id: id });
        return result.deletedCount > 0
    },
    async updateBlog(filter:{}, update:{}) {
        const result = await blogCollection.updateOne(filter, update)
        return result.modifiedCount > 0
    },
}