import { useUpdatePlaylistMutation } from "@/features/playlists/api/playlistsApi"
import type { UpdatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types"
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form"
type Props = {
    setPlaylistId: (id: string | null) => void
    playlistId: string | null
    editPlaylist: (playlist: null) => void
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
    register: UseFormRegister<UpdatePlaylistArgs>
}
export const EditPlaylistForm = (props: Props) => {
    const { setPlaylistId, playlistId, editPlaylist, register, handleSubmit } = props
    const [updatePlaylist] = useUpdatePlaylistMutation()

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('title')} placeholder="Title" />
            </div>
            <div>
                <input {...register('description')} placeholder="Description" />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => editPlaylist(null)}>Cancel</button>
        </form>
    )
}