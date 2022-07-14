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
}

export const DatagridCell = ({row, column,selectedCell,onSelectCell, edit, onTogleEditCell}:DatagridCellProps ) => {


  // get the cell data
  const cellData:string = row[`${column.field}`]
  
  const isSelectedCell =
    row.id === selectedCell.rowId && column.id === selectedCell.columnId
  const isEdit = edit === true


  return (
    <td
      className="datagrid__cell"
      style={{ border: isSelectedCell ? '2px solid #66afe9' : '' }}
      
      onDoubleClick={onTogleEditCell}
    >
      {isSelectedCell && isEdit ? (
        <input className="datagrid__cell-input" type="text" value={cellData} autoFocus />
      ) : (
        <div className="datagrid__cell-text"  onClick={() => onSelectCell(row.id, column.id)}>{cellData}</div> 
      )}
    </td>
  )
}
