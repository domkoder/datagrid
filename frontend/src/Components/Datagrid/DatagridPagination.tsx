import React from 'react'

type DatagridPaginationProps = {
  rowsCount:number,
  rowsPerPage: number,
  currentPage: number,
  maxPageNumberLimit: number,
  minPageNumberLimit: number,
  onPageChange:(page:number)=>void,
  onNextButton:()=>void,
  onPreviousButton:()=>void,
  onMovePageTo:(page:number)=>void,
}

export const DatagridPagination = ({
  rowsCount,
  rowsPerPage,
  currentPage,
  onPageChange,
  maxPageNumberLimit,
  minPageNumberLimit,
  onNextButton,
  onPreviousButton,
  onMovePageTo,
}:DatagridPaginationProps) => {
  const pagesCount = Math.ceil(rowsCount / rowsPerPage)

  if (pagesCount === 1) return null

  // Get pages array
  const pages:number[] = []
  for (let i:number = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <nav>
      <ul className="pagination__list">
        <li>
          <button
            onClick={onPreviousButton}
            disabled={currentPage === pages[0] ? true : false}
            className="pagination__btn"
          >
            Previous
          </button>
        </li>
        {minPageNumberLimit >= 1 && (
          <>
            <button onClick={() => onMovePageTo(1)} className="pagination__btn">
              1
            </button>
            <li className="pagination__more">&hellip; </li>
          </>
        )}
        {pages.map(page => {
          if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
            return (
              <li key={page} className="pagination__item">
                <button
                  onClick={() => onPageChange(page)}
                  className={`pagination__btn ${
                    currentPage === page && 'pagination__btn--active'
                  }`}
                >
                  {page}
                </button>
              </li>
            )
          } else {
            return null
          }
        })}
        {pages.length > maxPageNumberLimit && (
          <>
            <li className="pagination__more">&hellip; </li>
            <button
              onClick={() => onMovePageTo(pages.length)}
              className="pagination__btn"
            >
              {pages.length}
            </button>
          </>
        )}

        <li>
          <button
            onClick={onNextButton}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
            className="pagination__btn"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
