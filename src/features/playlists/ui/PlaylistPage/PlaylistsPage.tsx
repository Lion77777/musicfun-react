import { useState } from "react"
import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from "../../api/playlistsApi"
import { CreatePlaylistForm } from "../CreatePlaylistForm/CreatePlaylistForm"
import s from './PlaylistsPage.module.css'
import { useForm } from "react-hook-form"
import type { PlaylistData, UpdatePlaylistArgs } from "../../api/playlistsApi.types"
import { PlaylistItem } from "./PlaylistItem/PlaylistItem"
import { EditPlaylistForm } from "./EditPlaylistForm/EditPlaylistForm"
import { useDebounceValue } from "@/common/hooks"

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const debounceSearch = useDebounceValue(search)
    const { data, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch })
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
    const [deletePlaylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (id: string) => {
        deletePlaylist(id)
    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(tag => tag.id)
            })
        } else {
            setPlaylistId(null)
        }
    }

    return (
        <div className={s.container}>
            <h1>Playlist Page</h1>
            <CreatePlaylistForm />
            <input type='search'
                    placeholder="Search playlist by title"
                    onChange={e => setSearch(e.currentTarget.value)}
            />
            <div className={s.items}>
                {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
                {data?.data.map(playlist => {
                    const isEditing = playlistId === playlist.id

                    return (
                        <div key={playlist.id} className={s.item}>
                            {isEditing ?
                                <EditPlaylistForm setPlaylistId={setPlaylistId}
                                    playlistId={playlistId}
                                    editPlaylist={editPlaylistHandler}
                                    register={register}
                                    handleSubmit={handleSubmit}
                                />
                                : (
                                    <PlaylistItem playlist={playlist}
                                        deletePlaylistHandler={deletePlaylistHandler}
                                        editPlaylistHandler={editPlaylistHandler}
                                    />
                                )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}