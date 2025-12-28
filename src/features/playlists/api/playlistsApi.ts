import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type PlaylistsResponse, type FetchPlaylistsArgs, type CreatePlaylistArgs, type PlaylistData } from "./playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY
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
        })
    })
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation } = playlistsApi