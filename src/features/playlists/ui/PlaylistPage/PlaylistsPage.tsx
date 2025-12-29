import { useFetchPlaylistsQuery } from "../../api/playlistsApi"
import { CreatePlaylistForm } from "../CreatePlaylistForm/CreatePlaylistForm"
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
    const {data} = useFetchPlaylistsQuery({pageSize: 3})

    return (
        <div className={s.container}>
        <h1>Playlist Page</h1>
        <CreatePlaylistForm/>
        <div className={s.items}>
            {data?.data.map(playlist => {
                return (
                    <div key={playlist.id} className={s.item}>
                        <div>Title: {playlist.attributes.title}</div>
                        <div>Description: {playlist.attributes.description}</div>
                        <div>UserName: {playlist.attributes.user.name}</div>
                    </div>
                )
            })}
        </div>
        </div>
    )
}