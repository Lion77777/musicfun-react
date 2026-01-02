import type { PlaylistAttributes } from "@/features/playlists/api/playlistsApi.types"

type Props = {
    attributes: PlaylistAttributes
}

export const PlaylistDescription = (props: Props) => {
    const { attributes } = props

    return (
        <>
            <div>Title: {attributes.title}</div>
            <div>Description: {attributes.description}</div>
            <div>UserName: {attributes.user.name}</div>
        </>
    )
}