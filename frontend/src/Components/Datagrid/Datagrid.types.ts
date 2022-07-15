type Column = {
  id: number
  field: string
  headerName: string
}

type Columns = Column[]

export type SelectedCell = {rowId:number|null,columnId:number|null}

export type DatagridProps = {
  rows: any[]
  columns: Columns
  rowsPerPage?:number
}

export type DatagridHeaderProps = {
  columns:Columns
  sortColumn:{field:string,order:string}
  onSort: (field:string) => void
}

export type DatagridBodyProps = {
  rows:any[]
  columns:Columns
  onDelete: (rowId:number)=>void
  onEditCell: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type DatagridRowProps = {
  row:any,
  columns:Columns,
  selectedCell:SelectedCell,
  edit: boolean,
  onDelete: (rowId:number)=>void,
  onSelectCell: (rowId:number, columnId:number) => void
  onTogleEditCell: () => void
  onEditCell: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type DatagridCellProps = {
  selectedCell:SelectedCell,
  column:Column,
  row:any,
  edit: boolean,
  onSelectCell: (rowId:number, columnId:number) => void,
  onTogleEditCell: () => void
  onEditCell: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// export type DatagridCellProps = {
//   row:any,
//   column:Column,
//   selectedCell:SelectedCell,
//   edit: boolean,
//   onDelete: (rowId:number)=>void,
//   onSelectCell: (rowId:number, columnId:number) => void
//   onTogleEditCell: () => void
//   onEditCell: (event: React.ChangeEvent<HTMLInputElement>) => void
// }

export type DatagridPaginationProps = {
  rowsCount:number,
  rowsPerPage: number,
  currentPage: number,
  maxPageNumberLimit: number,
  minPageNumberLimit: number,
  onPageChange:(page:number)=>void,
  onNextButton:()=>void,
  onPreviousButton:()=>void,
  onMovePageTo:(page:number)=>void,
}


