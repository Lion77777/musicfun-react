import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types"

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData) => void
}
export const PlaylistItem = (props: Props) => {
    const {playlist, deletePlaylistHandler, editPlaylistHandler} = props

    return (
        <>
            <div>Title: {playlist.attributes.title}</div>
            <div>Description: {playlist.attributes.description}</div>
            <div>UserName: {playlist.attributes.user.name}</div>
            <button type='button' onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
            <button type="button" onClick={() => editPlaylistHandler(playlist)}>Update</button>
        </>
    )
}