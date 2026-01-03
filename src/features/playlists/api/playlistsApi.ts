import { type Images } from "@/common/types";
import { type PlaylistsResponse, type FetchPlaylistsArgs, type CreatePlaylistArgs, type PlaylistData, type UpdatePlaylistArgs } from "./playlistsApi.types";
import { baseApi } from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => {
                return {
                    method: 'get',
                    url: 'playlists',
                    params
                }
            },
            providesTags: ['Playlists']
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => {
                return {
                    method: 'post',
                    url: 'playlists',
                    body
                }
            },
            invalidatesTags: ['Playlists']
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (id) => {
                return {
                    method: 'delete',
                    url: `playlists/${id}`
                }
            },
            invalidatesTags: ['Playlists']
        }),
        updatePlaylist: build.mutation<void, { id: string, body: UpdatePlaylistArgs }>({
            query: ({ id, body }) => {
                return {
                    method: 'put',
                    url: `playlists/${id}`,
                    body
                }
            },
            invalidatesTags: ['Playlists']
        }),
        uploadPlaylistCover: build.mutation<Images, {id: string, file: File}>({
            query: ({id, file}) => {
                const formData = new FormData()

                formData.append('file', file)

                return {
                    method: 'post',
                    url: `playlists/${id}/images/main`,
                    body: formData
                }
            },
            invalidatesTags: ['Playlists']
        }),
        deletePlaylistCover: build.mutation<void, {id: string}>({
            query: ({id}) => {
                return {
                    method: 'delete',
                    url: `playlists/${id}/images/main`
                }
            },
            invalidatesTags: ['Playlists']
        })
    })
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation
} = playlistsApi