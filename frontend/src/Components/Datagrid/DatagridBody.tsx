import React from 'react'
import { DatagridRow } from './DatagridRow'
import {DatagridBodyProps, SelectedCell} from './Datagrid.types'


export const DatagridBody = ({ rows, columns, onDelete, onEditCell }:DatagridBodyProps) => {
  // create selectedCell state to keep track of the selected cell
  const [selectedCell, setSelectedCell] = React.useState<SelectedCell>({
    rowId: null,
    columnId: null,
  })

  // create edit state to activate input to edit cell
  const [edit, setEdit] = React.useState<boolean>(false)

  // unselect and select cell
  const handleSelectCell = (rowId:number, columnId:number):void => {
    setSelectedCell({
      rowId,
      columnId,
    })
    setEdit(false)
  }

  // when the user double click a cell set edit to true
  const handleToggleEditCell = () => {
    setEdit(true)
  }

  return (
    <tbody>
      {/* Loop through rows and render the DatagridRow component */}
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
          onEditCell={onEditCell}
        />
      ))}
    </tbody>
  )
}
