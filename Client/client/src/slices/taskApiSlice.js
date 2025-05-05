import apiSlice from "./apiSlice";

const taskApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getTasks:build.query({
            query:()=>({
                url:"/api/task"
            }),
            providesTags:["Tasks"]
        }),
        createTask:build.mutation({
            query:(task)=>({
                url:"/api/task",
                method:"POST",
                body:task
            }),
            invalidatesTags:["Tasks"]
        }),
        updateTask:build.mutation({
            query:(task)=>({
                url:`/api/task/${task._id}`,
                method:"PUT",
                body:task
            }),
            invalidatesTags:["Tasks"]
        }),
        deleteTask:build.mutation({
            query:(task)=>({
                url:`/api/task/${task._id}`,
                method:"DELETE",
                body:task
            }),
            invalidatesTags:["Tasks"]
        })
    })
})

export const {useGetTasksQuery,useCreateTaskMutation,useDeleteTaskMutation,useUpdateTaskMutation}=taskApiSlice