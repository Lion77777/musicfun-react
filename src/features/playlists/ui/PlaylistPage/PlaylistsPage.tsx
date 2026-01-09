import { useState, type ChangeEvent } from "react"
import { useFetchPlaylistsQuery } from "../../api/playlistsApi"
import { CreatePlaylistForm } from "../CreatePlaylistForm/CreatePlaylistForm"
import s from './PlaylistsPage.module.css'
import { useDebounceValue } from "@/common/hooks"
import { Pagination } from "@/common/components"
import { PlaylistsList } from "./PlaylistsList/PlaylistsList"

export const PlaylistsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    const [search, setSearch] = useState('')
    const debounceSearch = useDebounceValue(search)
    const { data, isLoading } = useFetchPlaylistsQuery({
        search: debounceSearch,
        pageNumber: currentPage,
        pageSize
    })

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    if(isLoading) return <h1>Skeleton loader...</h1>

    return (
        <div className={s.container}>
            <h1>Playlist Page</h1>
            <CreatePlaylistForm />
            <input type='search'
                placeholder="Search playlist by title"
                onChange={searchPlaylistHandler}
            />
            <PlaylistsList playlists={data?.data || []} isLoading={isLoading} />
            <Pagination pagesCount={data?.meta.pagesCount || 1}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}
            />
        </div>
    )
}