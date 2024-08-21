import {SortDirection} from "mongodb";
import {CreateBlogInputModel} from "../../features/blogs/types/input/create-blog-input.type";
import {CreatePostInputModel} from "../../features/posts/types/input/create-post-input.type";
export type FieldNamesType = keyof CreateBlogInputModel | keyof CreatePostInputModel
export type validQueryType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
    searchNameTerm: string|null
}