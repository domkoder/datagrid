type DatagridCellProps = {
  selectedCell:{
    rowId: number|null,
    columnId: number|null,
  },
  column:any,
  row:any,
  edit: boolean,
  onSelectCell: (rowId:number, columnId:number) => void,
  onTogleEditCell: () => void
  onEditCell: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const DatagridCell = ({row, column,selectedCell, edit, onEditCell,onSelectCell, onTogleEditCell}:DatagridCellProps ) => {


  // get the cell data
  const cellData:string = row[`${column.field}`]
  
  // compute if the current cell is selected
  const isSelectedCell: boolean =
    row.id === selectedCell.rowId && column.id === selectedCell.columnId
  
  // compute if edit is set for the current cell
  const isEdit:boolean = edit === true

  const isIdColumn:boolean = column.field === 'id'


  return (
    <td
      className="datagrid__cell"
      style={{ border: isSelectedCell ? '2px solid #66afe9' : '' }}
      // onDoubleClick active the edit state
      onDoubleClick={onTogleEditCell}
    >
      {/* dispaly input or celldata */}
      {isSelectedCell && isEdit && !isIdColumn ? (
        <input className="datagrid__cell-input" type="text" name={column.field} id={row.id} onBlur={onEditCell}   defaultValue={cellData} autoFocus />
      ) : (
        <div className="datagrid__cell-text"  onClick={() => onSelectCell(row.id, column.id)}>{cellData}</div> 
      )}
    </td>
  )
}
