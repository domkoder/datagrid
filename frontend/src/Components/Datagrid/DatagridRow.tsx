import { DatagridCell } from './DatagridCell'

type DatagridCellProps = {
  row:any,
  columns:any[],
  selectedCell:{
    rowId: number|null,
    columnId: number|null,
  },
  edit: boolean,
  onDelete: (rowId:number)=>void,
  onSelectCell: (rowId:number, columnId:number) => void
  onTogleEditCell: () => void
  onEditCell: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const DatagridRow = ({
  row,
  columns,
  selectedCell,
  edit,
  onDelete,
  onSelectCell,
  onTogleEditCell,
  onEditCell,
}:DatagridCellProps) => {
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
