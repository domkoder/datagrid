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
  onEditCell: () => void
}

export const DatagridRow = ({
  row,
  columns,
  selectedCell,
  edit,
  onDelete,
  onSelectCell,
  onEditCell,
}:DatagridCellProps) => {
  return (
    <tr className="datagrid__row">
      {columns.map(column => (
        <DatagridCell
          key={row.id + column.field}
          row={row}
          column={column}
          selectedCell={selectedCell}
          edit={edit}
          onSelectCell={onSelectCell}
          onEditCell={onEditCell}
          
        />
      ))}
      <td className="datagrid__cell" onClick={() => onDelete(row.id)}>
        <button>Delete</button>
      </td>
    </tr>
  )
}
