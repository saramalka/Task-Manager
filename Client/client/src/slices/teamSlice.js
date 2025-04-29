import apiSlice from "./apiSlice";

const teamApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getTeams:build.query({
            query:()=>({
                url:"/api/team"
            })
        })
    })
})

export const {useGetTeamsQuery}=teamApiSlice