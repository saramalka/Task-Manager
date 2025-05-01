import apiSlice from "./apiSlice";

const taskApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getTasks:build.query({
            query:()=>({
                url:"/api/task"
            })
        })
    })
})

export const {useGetTasksQuery}=taskApiSlice