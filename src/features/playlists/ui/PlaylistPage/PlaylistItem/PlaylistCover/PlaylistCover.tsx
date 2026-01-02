import type { Images } from "@/common/types"
import defaultCover from '@/assets/images/cover.png'
import s from './PlaylistItem.module.css'
import { useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation } from "@/features/playlists/api/playlistsApi"
import type { ChangeEvent } from "react"

type Props = {
    playlistId: string
    images: Images
}

export const PlaylistCover = (props: Props) => {
    const { playlistId, images } = props
    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deletePlaylistCover] = useDeletePlaylistCoverMutation()
    const originalCover = images.main.find(image => image.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        const maxSize = 1024 * 1024
        const file = e.target.files?.length && e.target.files[0]

        if (!file) return
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPEG, PNG or GIF images are allowed')

            return
        }
        if (file.size > maxSize) {
            alert(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)

            return
        }

        uploadPlaylistCover({ id: playlistId, file })
    }

    const deleteCoverHandler = () => {
        deletePlaylistCover({ id: playlistId })
    }

    return (
        <>
            <img src={src} alt="Cover" className={s.cover} width='240px' />
            <input type="file" accept={"image/jpeg,image/png,image/gif"} onChange={uploadCoverHandler} />
            {originalCover &&
                <button onClick={deleteCoverHandler}>X</button>
            }
        </>
    )
}