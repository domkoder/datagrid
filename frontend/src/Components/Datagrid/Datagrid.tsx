import React from 'react'
import { DatagridHeader } from './DatagridHeader'
import { DatagridBody } from './DatagridBody'
import { DatagridPagination } from './DatagridPagination'

type DatagridProps = {
  rows: {}[],
  columns:{}[],
  rowsPerPage:number,
  onDelete: (rowId:number)=>void
}


const Datagrid = ({ rows, columns,rowsPerPage, onDelete }:DatagridProps) => {

  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const pageNumberLimit:number = 20
  const [maxPageNumberLimit, setmaxPageNumberLimit] = React.useState<number>(pageNumberLimit)
  const [minPageNumberLimit, setminPageNumberLimit] = React.useState<number>(0)

  const count = rows.length

  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow)



  const handlePageChange  = (page:number):void => {
    setCurrentPage(page)
  }

  const handlePreviousButton = ():void => {
    setCurrentPage(currentPage - 1)

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  const handleNextButton = ():void => {
    setCurrentPage(currentPage + 1)

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handleMovePageTo = (page:number):void => {
    setCurrentPage(page)
    if (page === 1) {
      setmaxPageNumberLimit(10)
      setminPageNumberLimit(0)
    } else {
      setmaxPageNumberLimit(page)
      setminPageNumberLimit(page - pageNumberLimit)
    }
  }

  return (
    <div>
      {count !== 0 ? (
        <>
          <p>Show {count} records </p>
          <table className="datagrid">
            <DatagridHeader columns={columns} />
            <DatagridBody
              columns={columns}
              rows={currentRows}
              onDelete={onDelete}
            />
          </table>
        </>
      ) : (
        <p>there are no records</p>
      )}

      <DatagridPagination
        rowsCount={count}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        maxPageNumberLimit={maxPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
        onNextButton={handleNextButton}
        onPreviousButton={handlePreviousButton}
        onMovePageTo={handleMovePageTo}
      />
    </div>
  )
}

export default Datagrid