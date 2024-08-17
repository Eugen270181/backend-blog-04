import {BlogDbModelType} from '../../../common/types/db/blog-db-model.type'
import {blogCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {BlogOutputModel} from "../types/output/blog-output.type";
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";


export const blogsRepository = {
    async createBlog(blog: CreateBlogInputModel):Promise<string> {
        const {name, description, websiteUrl} = blog
        const newBlog: BlogDbModelType = {
            ...{name, description, websiteUrl},
            createdAt: new Date().toISOString(),
            isMembership:false
        }
        const result = await blogCollection.insertOne(newBlog);
        return result.insertedId.toString() // return _id -objectId
    },
    async findBlogById(id: string):Promise<WithId<BlogDbModelType>|null> {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },
    async findBlogAndMap(id: string) {
        const blog = ( await blogsRepository.findBlogById(id) )! // ! используем этот метод если проверили существование
        return this.map(blog)
    },
    async findBlogsAndMap() {
        const blogs = await blogCollection.find({}).toArray()
        return blogs.map(b => this.map(b))
    },
    async deleteBlog(id:string):Promise<boolean>{
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    },
    async updateBlog(blog: UpdateBlogInputModel, id: string) {
        const {name, description, websiteUrl} = blog
        const result = await blogCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...{name, description, websiteUrl} } }
        );
        return result.modifiedCount > 0;
    },
    map(blog: WithId<BlogDbModelType>): BlogOutputModel{
        const { _id, ...blogForOutput } = blog;//деструктуризация
        return {id:blog._id.toString(),...blogForOutput}
    },
}