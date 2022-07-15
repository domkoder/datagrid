import React from 'react'
import { DatagridHeader } from './DatagridHeader'
import { DatagridBody } from './DatagridBody'
import { DatagridPagination } from './DatagridPagination'
import './styles.css'
import {DatagridProps} from './Datagrid.types'


const Datagrid = ({ rows:dataRows, columns:dataColumns,rowsPerPage}:DatagridProps) => {
  // Get columns and rows then set it as localstate
  React.useEffect(() => {
    setColumns(dataColumns)
    setRows(dataRows)
  }, [dataColumns, dataRows])
  
  
  const [columns, setColumns] = React.useState<any[]>([])
  const [rows, setRows] = React.useState<any[]>([])

  // Sort State
  const [sortColumn, setSortColumn] = React.useState<{field:string,order:string}>({field:'id', order:'asc'})


  // pagination states to manage page pagination
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const pageNumberLimit:number = 20
  const [maxPageNumberLimit, setmaxPageNumberLimit] = React.useState<number>(pageNumberLimit)
  const [minPageNumberLimit, setminPageNumberLimit] = React.useState<number>(0)


  // the total count of rows
  const count = rows.length

  const sortedData = React.useCallback(
    () => {
      if (!sortColumn.field) return rows;

      const sortedData = rows.sort((a, b) => {
        return a[sortColumn.field] > b[sortColumn.field] ? 1 : -1;
      });
    
      if (sortColumn.order === 'desc') {
        return sortedData.reverse();
      }
    
      return sortedData;
    },[rows, sortColumn.field, sortColumn.order]
  );


  // Get paginated current rows
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const paginatedRows = sortedData().slice(indexOfFirstRow, indexOfLastRow)


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

  // delete rows
  const handleDelete = (rowId:number): void => {
    setRows(rows.filter(row => row.id !== rowId))
  }

  // sort columns
  const handleSort = (field: string): void => {
    const sortColumnCopy = {...sortColumn}
    if(sortColumnCopy.field === field){
      sortColumnCopy.order = (sortColumn.order === 'asc')? 'desc': 'asc'
    }else{
      sortColumnCopy.field = field; 
      sortColumnCopy.order = 'asc'; 

    }
    setSortColumn(sortColumnCopy)
  }

  // edit cell data
  const handeEditCell = (event:React.ChangeEvent<HTMLInputElement>): void => {
    const {value, id, name} = event.target

    setRows(rows.map((row) => {
      if(row.id === Number(id)){
        return {...row, [name]:value }
      }else{
        return row
      } }))
  }

  return (
    <div>
      {count !== 0 ? (
        <>

          <p>{count} total rows </p>
          <p>Showing {rowsPerPage} rows per page </p>
          <small>Double click a cell to edit it</small>

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
          <div className='wrapper'>
            <table className="datagrid">
              <DatagridHeader columns={columns} sortColumn={sortColumn} onSort={handleSort} />
              <DatagridBody
                columns={columns}
                rows={paginatedRows}
                onDelete={handleDelete}
                onEditCell={handeEditCell}
              />
            </table>
          </div>
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
        </>
      ) : (
        <p>there are no records</p>
      )}
    </div>
  )
}

export default Datagrid