import { useState } from "react"
import { useDeletePlaylistMutation, useFetchPlaylistsQuery, useUpdatePlaylistMutation } from "../../api/playlistsApi"
import { CreatePlaylistForm } from "../CreatePlaylistForm/CreatePlaylistForm"
import s from './PlaylistsPage.module.css'
import { useForm, type SubmitHandler } from "react-hook-form"
import type { PlaylistData, UpdatePlaylistArgs } from "../../api/playlistsApi.types"

export const PlaylistsPage = () => {
    const { data } = useFetchPlaylistsQuery({ pageSize: 3 })
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
    const [deletePlaylist] = useDeletePlaylistMutation()
    const [updatePlaylist] = useUpdatePlaylistMutation()

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

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
        if (!playlistId) return

        updatePlaylist({
            id: playlistId,
            body: data
        }).then(() => {
            setPlaylistId(null)
        })
    }

    return (
        <div className={s.container}>
            <h1>Playlist Page</h1>
            <CreatePlaylistForm />
            <div className={s.items}>
                {data?.data.map(playlist => {
                    const isEditing = playlistId === playlist.id

                    return (
                        <div key={playlist.id} className={s.item}>
                            {isEditing ?
                                (<form onSubmit={handleSubmit(onSubmit)}>
                                    <h2>Edit playlist</h2>
                                    <div>
                                        <input {...register('title')} placeholder="Title" />
                                    </div>
                                    <div>
                                        <input {...register('description')} placeholder="Description" />
                                    </div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => editPlaylistHandler(null)}>Cancel</button>
                                </form>) : (
                                    <>
                                        <div>Title: {playlist.attributes.title}</div>
                                        <div>Description: {playlist.attributes.description}</div>
                                        <div>UserName: {playlist.attributes.user.name}</div>
                                        <button type='button' onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
                                        <button type="button" onClick={() => editPlaylistHandler(playlist)}>Update</button>
                                    </>
                                )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}