import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types"
import defaultCover from '@/assets/images/nensi.jpg'
import s from './PlaylistItem.module.css'
import { useUploadPlaylistCoverMutation } from "@/features/playlists/api/playlistsApi"
import type { ChangeEvent } from "react"

type Props = {
    playlist: PlaylistData
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlist: PlaylistData) => void
}
export const PlaylistItem = (props: Props) => {
    const {playlist, deletePlaylistHandler, editPlaylistHandler} = props
    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const originalCover = playlist.attributes.images.main.find(image => image.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        const maxSize = 1024 * 1024
        const file = e.target.files?.length && e.target.files[0]

        if(!file) return
        if(!allowedTypes.includes(file.type)) {
            alert('Only JPEG, PNG or GIF images are allowed')

            return
        }
        if(file.size > maxSize) {
            alert(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)

            return
        }

        uploadPlaylistCover({id: playlist.id, file})
    }

    return (
        <>
            <img src={src} alt="Cover" className={s.cover} width='240px'/>
            <input type="file" accept={"image/jpeg,image/png,image/gif"} onChange={uploadCoverHandler}/>
            <div>Title: {playlist.attributes.title}</div>
            <div>Description: {playlist.attributes.description}</div>
            <div>UserName: {playlist.attributes.user.name}</div>
            <button type='button' onClick={() => deletePlaylistHandler(playlist.id)}>Delete</button>
            <button type="button" onClick={() => editPlaylistHandler(playlist)}>Update</button>
        </>
    )
}