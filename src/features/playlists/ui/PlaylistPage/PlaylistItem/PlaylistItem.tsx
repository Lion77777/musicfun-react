import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types"
import { PlaylistCover } from "./PlaylistCover/PlaylistCover"
import { PlaylistDescription } from "./PlaylistsDescription/PlaylistDescription"

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = (props: Props) => {
    const { playlist, deletePlaylistHandler, editPlaylistHandler } = props

    return (
        <>
            <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
            <PlaylistDescription attributes={playlist.attributes} />
            <button type='button' onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
            <button type="button" onClick={() => editPlaylistHandler(playlist)}>Update</button>
        </>
    )
}