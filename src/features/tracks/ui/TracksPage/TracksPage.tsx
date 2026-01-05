import { useEffect, useRef } from "react"
import { useFetchTracksInfiniteQuery } from "../../api/tracksApi"
import s from './TracksPage.module.css'

export const TracksPage = () => {
    const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useFetchTracksInfiniteQuery()
    const pages = data?.pages.flatMap((page) => page.data) || []
    const observerRef = useRef<HTMLDivElement>(null)

    const loadMoreHandler = () => {
        if(hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if(entries.length > 0 && entries[0].isIntersecting) {
                loadMoreHandler()
            }
        })

        const currentObserverRef = observerRef.current

        if(currentObserverRef) {
            observer.observe(currentObserverRef)
        }

        return () => {
            if(currentObserverRef) {
            observer.unobserve(currentObserverRef)
        }
        }
    }, [loadMoreHandler])

    return (
        <div>
            <h1>Tracks Page</h1>
            <div className={s.list}>
                {pages.map(track => {
                    const { title, user, attachments } = track.attributes

                    return (
                        <div key={track.id} className={s.item}>
                            <div>
                                <p>Title: {title}</p>
                                <p>Name: {user.name}</p>
                            </div>
                            {attachments.length ? <audio controls src={attachments[0].url} /> : "no file"}
                        </div>
                    )
                })}
            </div>
            {hasNextPage && (
                <div ref={observerRef}>
                    {isFetchingNextPage ? (
                        <div>Loading more tracks...</div>
                    ) : (
                        <div style={{height: '20px'}}></div>
                    )}
                </div>
            )}
            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p> }
        </div>
    )
}