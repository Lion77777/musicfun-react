import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type PlaylistsResponse, type FetchPlaylistsArgs, type CreatePlaylistArgs, type PlaylistData, type UpdatePlaylistArgs } from "./playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY
        },
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)

            return headers
        }
    }),
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () => {
                return {
                    method: 'get',
                    url: 'playlists'
                }
            }
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => {
                return {
                    method: 'post',
                    url: 'playlists',
                    body
                }
            }
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (id) => {
                return {
                    method: 'delete',
                    url: `playlists/${id}`
                }
            }
        }),
        updatePlaylist: build.mutation<void, { id: string, body: UpdatePlaylistArgs }>({
            query: ({ id, body }) => {
                return {
                    method: 'put',
                    url: `playlists/${id}`,
                    body
                }
            }
        })
    })
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation
} = playlistsApi