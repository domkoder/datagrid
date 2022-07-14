type DatagridHeaderProps = {
  columns:any[]
}

export const DatagridHeader = ({ columns }:DatagridHeaderProps) => {
  return (
    <thead className="datagrid__header">
      <tr className="datagrid__row">
        {columns.map(column => (
          <th
            key={column.id}
            className="datagrid__heading"
            style={{ width: column.width }}
          >
            {column.headerName}
          </th>
        ))}
        <th className="datagrid__heading"></th>
      </tr>
    </thead>
  )
}
