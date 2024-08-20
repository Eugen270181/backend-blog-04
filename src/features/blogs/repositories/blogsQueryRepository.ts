import {BlogDbModel} from '../../../common/types/db/blog-db.model'
import {blogCollection} from "../../../common/module/db/dbMongo"
import {ObjectId, WithId} from "mongodb"
import {BlogOutputModel} from "../types/output/blog-output.type";
import {anyQueryType} from "../../../common/types/any-query-type";
import {validQueryType} from "../../../common/types/valid-query-type";



export const blogsQueryRepository = {
    async findBlogById(id: string) {
        const isIdValid = ObjectId.isValid(id);
        if (!isIdValid) return null
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },
    async findBlogAndMap(id: string) {
        const blog = await this.findBlogById(id)
        return blog?this.map(blog):null
    },
    async getBlogsAndMap(query:validQueryType) {
        const search = query.searchNameTerm ? {title:{$regex:query.searchNameTerm,$options:'i'}}:{}
        const filter = {
            ...search
        }
        try {
            const blogs = await blogCollection
                .find(filter)
                .sort(query.sortBy,query.sortDirection)
                .skip((query.pageNumber-1)*query.pageSize)
                .limit(query.pageSize)
                .toArray()
            const totalCount = blogCollection.countDocuments(filter)
            return {
                pageCount: Math.Ceil(totalCount/query.pageSize)
                page: query.pageNumber
                pageSize:query.pageSize
            }

            blogs.map(b => this.map(b))

        }
        catch(e){
            console.log(e)
            return []

        }

    },
    map(blog:WithId<BlogDbModel>):BlogOutputModel{
        const { _id, ...blogForOutput } = blog;//деструктуризация
        return {id:blog._id.toString(),...blogForOutput}
    },
}
