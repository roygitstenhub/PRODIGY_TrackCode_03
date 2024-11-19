import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../../index.js"

const baseQuery = fetchBaseQuery({baseUrl:baseUrl})

export const apiSlice= createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000',
        credentials:'include'
    }),
    tagTypes:['User'],
    endpoints:(builder)=>({})
})