import { DatagridCell } from './DatagridCell'
import {DatagridRowProps} from './Datagrid.types'



export const DatagridRow = ({
  row,
  columns,
  selectedCell,
  edit,
  onDelete,
  onSelectCell,
  onTogleEditCell,
  onEditCell,
}:DatagridRowProps) => {
  return (
    <tr className="datagrid__row">
      {/* for each row Loop through columns and render the DatagridCell component that belongs to that row and column*/}
      {columns.map(column => (
        <DatagridCell
          key={row.id + column.field}
          row={row}
          column={column}
          selectedCell={selectedCell}
          edit={edit}
          onSelectCell={onSelectCell}
          onTogleEditCell={onTogleEditCell}
          onEditCell={onEditCell}
          
        />
      ))}
       {/*Render delete button to delete a particular row*/}
      <td className="datagrid__cell" onClick={() => onDelete(row.id)}>
        <div className="datagrid__cell-text">
          <button className="datagrid__button--danger">Delete</button>
        </div>
      </td>
    </tr>
  )
}
