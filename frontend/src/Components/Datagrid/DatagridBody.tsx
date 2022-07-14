import React from 'react'
import { DatagridRow } from './DatagridRow'

type DatagridBodyProps = {
  rows:any[]
  columns:any[]
  onDelete: (rowId:number)=>void
}

type SelectedCell = {rowId:number|null,columnId:number|null}


export const DatagridBody = ({ rows, columns, onDelete }:DatagridBodyProps) => {
  const [selectedCell, setSelectedCell] = React.useState<SelectedCell>({
    rowId: null,
    columnId: null,
  })
  const [edit, setEdit] = React.useState<boolean>(false)

  const handleSelectCell = (rowId:number, columnId:number):void => {
    setSelectedCell({
      rowId,
      columnId,
    })
    setEdit(false)
  }

  const handleToggleEditCell = () => {
    setEdit(true)
  }

  return (
    <tbody className="datagrid__body">
      {rows.map(row => (
        <DatagridRow
          key={row.id}
          row={row}
          columns={columns}
          selectedCell={selectedCell}
          edit={edit}
          onDelete={onDelete}
          onSelectCell={handleSelectCell}
          onTogleEditCell={handleToggleEditCell}
        />
      ))}
    </tbody>
  )
}
