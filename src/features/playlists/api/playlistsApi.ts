import { type PlaylistsResponse, type FetchPlaylistsArgs, type CreatePlaylistArgs, type PlaylistData, type UpdatePlaylistArgs } from "./playlistsApi.types";
import { baseApi } from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () => {
                return {
                    method: 'get',
                    url: 'playlists'
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
        })
    })
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation
} = playlistsApi