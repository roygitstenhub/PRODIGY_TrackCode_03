import { apiSlice } from "./apislice";

const USER_URL = '/api/auth'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/login`,
                method:'POST',
                body:data
            })
        }),

        register:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/register`,
                method:'POST',
                body:data
            })
        }),

        logout:builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'GET',
            })

        }),


    })
})

export const { useLoginMutation,useRegisterMutation ,useLogoutMutation} = userApiSlice