import { ReactComponent as Ascending } from '../../icons/ascending.svg';
import { ReactComponent as Descending } from '../../icons/descending.svg';



type DatagridHeaderProps = {
  columns:any[],
  sortColumn:{field:string,order:string}
  onSort: (field:string) => void
}

export const DatagridHeader = ({ columns, sortColumn, onSort }:DatagridHeaderProps) => {


  return (
    <thead className="datagrid__header">
      <tr className="datagrid__row">
        {columns.map(column => {
          return <th
            key={column.id}
            className="datagrid__heading"
            style={{ width: column.width }}
            onClick={()=>onSort(column.field)}
          >
            <div className='datagrid__heading-text'>
              {column.headerName}
              
              {column.field !== sortColumn.field ? null: sortColumn.order === 'asc'? <Ascending/>: <Descending/>}
            </div>
          </th>
        })}
        <th className="datagrid__heading"></th>
      </tr>
    </thead>
  )
}
