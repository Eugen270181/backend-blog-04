import {blogsRepository} from "../repository/blogsRepository";
import {CreateBlogInputModel} from "../types/input/create-blog-input.type";
import {BlogDbModelType, extBlogDbModelType} from "../../../common/types/db/blog-db-model.type";
import {ObjectId} from "bson";
import {blogCollection} from "../../../common/module/db/dbMongo";
import {BlogOutputModel} from "../types/output/blog-output.type";
import {UpdateBlogInputModel} from "../types/input/update-blog-input.type";




export const blogsServices = {
    async createBlog(blog: CreateBlogInputModel):Promise<string> {
        const {name, description, websiteUrl} = blog
        const newBlog:BlogDbModelType = {
            ...{name, description, websiteUrl},
            createdAt: new Date().toISOString(),
            isMembership:false
        }
        return blogsRepository.createBlog(newBlog)
    },
    async findBlogById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return blogsRepository.findBlogById(new ObjectId(id));
    },
    async findBlogAndMap(id: string) {
        const blog = (await this.findBlogById(id))! // ! используем этот метод если проверили существование
        return this.map(blog)
    },
    async findBlogsAndMap() {
        const blogs = await blogsRepository.findBlogs()
        return blogs.map(b => this.map(b))
    },
    async deleteBlog(id:string){
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return false
        return blogsRepository.deleteBlog(new ObjectId(id))
    },
    async updateBlog(blog: UpdateBlogInputModel, id: string) {
        const {name, description, websiteUrl} = blog
        const filter = { _id: new ObjectId(id) }
        const update = { $set: { ...{name, description, websiteUrl} } }
        return blogsRepository.updateBlog(filter,update)
    },
    map(blog:extBlogDbModelType):BlogOutputModel{
        const { _id, ...blogForOutput } = blog;//деструктуризация
        return {id:blog._id.toString(),...blogForOutput}
    },
}