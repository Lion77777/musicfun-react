import { getPaginationPages } from '@/common/utils'
import s from './Pagination.module.css'

type Props = {
    pagesCount: number,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    pageSize: number,
    changePageSize: (size: number) => void
}

export const Pagination = (props: Props) => {
    const { pagesCount, currentPage, setCurrentPage, pageSize, changePageSize } = props

    if (pagesCount <= 1) return null

    const pages = getPaginationPages(currentPage, pagesCount)

    return (
        <div className={s.container}>
            <div className={s.pagination}>
                {pages.map((page, index) => (
                    page === '...' ? (
                        <span className={s.ellipsis} key={`ellipsis-${index}`}>...</span>
                    ) : (
                        <button key={page}
                            className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
                            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
                            disabled={page === currentPage}
                            type='button'
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>
            <label>
                <span>Show </span>
                <select value={pageSize} onChange={e => changePageSize(Number(e.target.value))}>
                    {[2, 4, 6, 8, 16, 32].map(size => (
                        <option value={size} key={size}>
                            {size}
                        </option>
                    ))}
                </select>
                <span> per page</span>
            </label>
        </div>
    )
}