import { useFetchTracksInfiniteQuery } from "../../api/tracksApi"
import { useInfiniteScroll } from "@/common/hooks"
import { TracksList } from "./TracksList/TracksList"
import { TracksLoadingTrigger } from "./TracksLoadingTrigger/TracksLoadingTrigger"

export const TracksPage = () => {
    const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useFetchTracksInfiniteQuery()
    const pages = data?.pages.flatMap((page) => page.data) || []
    const {observerRef} = useInfiniteScroll({fetchNextPage, hasNextPage, isFetching})

    return (
        <div>
            <h1>Tracks Page</h1>
            <TracksList tracks={pages}/>
            {hasNextPage && (
                <TracksLoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>
            )}
            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p> }
        </div>
    )
}