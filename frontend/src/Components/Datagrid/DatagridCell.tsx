

type DatagridCellProps = {
  selectedCell:{
    rowId: number|null,
    columnId: number|null,
  },
  column:any,
  row:any
  edit: boolean
  onSelectCell: (rowId:number, columnId:number) => void
  onEditCell: () => void
}

export const DatagridCell = ({row, column,selectedCell,onSelectCell, edit, onEditCell}:DatagridCellProps ) => {


  // get the cell data
  const cellData:string = row[`${column.field}`]
  
  const isSelectedCell =
    row.id === selectedCell.rowId && column.id === selectedCell.columnId
  const isEdit = edit === true


  return (
    <td
      className="datagrid__cell"
      style={{ border: isSelectedCell ? '2px solid #66afe9' : '' }}
      onClick={() => onSelectCell(row.id, column.id)}
      onDoubleClick={onEditCell}
    >
      {isSelectedCell && isEdit ? (
        <input className="input" type="text" value={cellData} />
      ) : (
        <div>{cellData}</div> 
      )}
    </td>
  )
}
