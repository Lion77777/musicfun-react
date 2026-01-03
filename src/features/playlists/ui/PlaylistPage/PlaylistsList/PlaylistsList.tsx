import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types'
import s from './PlaylistsList.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDeletePlaylistMutation } from '@/features/playlists/api/playlistsApi'
import { EditPlaylistForm } from '../EditPlaylistForm/EditPlaylistForm'
import { PlaylistItem } from '../PlaylistItem/PlaylistItem'

type Props = {
    playlists: PlaylistData[]
    isLoading: boolean
}
export const PlaylistsList = (props: Props) => {
    const { playlists, isLoading } = props

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
        <div className={s.items}>
            {!playlists.length && !isLoading && <h2>Playlists not found</h2>}
            {playlists.map(playlist => {
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
    )
}