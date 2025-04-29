import apiSlice from "./apiSlice";

const teamApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getTeams:build.query({
            query:()=>({
                url:"/api/team"
            }),
            providesTags:["Teams"]
        }),
        getTeamById:build.query({
            query:(id)=>({
                url:`/api/team/${id}`
            }),
            
        }),
        deleteTeam:build.mutation({
            query:(team)=>({
                url:`/api/team/${team._id}`,
                method:'DELETE',
                body:team
        }),
        invalidatesTags:["Teams"]
        }),
        deleteTeams: build.mutation({
            query: (ids) => ({
              url: `/teams`,
              method: 'DELETE',
              body: ids,
            }),
            invalidatesTags: ['Teams'],
          }),
        editTeam:build.mutation({
            query:(team)=>({
                url:`api/team`,
                method:"PUT",
                body:team
            }),
            invalidatesTags:["Teams"]
        }),
        addMemberToTeam: build.mutation({
          query: ({ teamId, userId }) => ({
            url: `/api/team/${teamId}/members`,
            method: "POST",
            body: { userId },
          }),
          invalidatesTags: ["Teams"],
        }),
        removeMemberFromTeam: build.mutation({
          query: ({ teamId, userId }) => ({
            url: `/api/team/${teamId}/members/${userId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Teams"],
        }),  
    })
})

export const {useGetTeamsQuery,useDeleteTeamMutation,useDeleteTeamsMutation,useEditTeamMutation,useGetTeamByIdQuery,useAddMemberToTeamMutation,useRemoveMemberFromTeamMutation}=teamApiSlice