import React from 'react';
import './App.css'
import { Datagrid } from './Components';

function App() {
  // fetch data from backend
  React.useEffect(() => {
    setStatus('loading')
    fetch('http://localhost:3001/api/data')
    .then(response => response.json())
    .then(result => {
      setColumns(result.dataColumns)
      setRows(result.dataRows)
      setStatus('success')
      console.log('Success:', result);
    }).catch(error => {
      console.error('Error:', error);
      setError('error please check your network and try again')
    })
  }, [])

  const [columns, setColumns] = React.useState<any[]>([])
  const [rows, setRows] = React.useState<any[]>([])
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(100)
  const [status, setStatus] = React.useState<string>('idle')
  const [error, setError] = React.useState<string>('')

  // get booleans for status
  const isIdle:boolean = status === 'idle'
  const isLoading:boolean = status === 'loading'
  const isSuccess:boolean = status === 'success'
  const isError:boolean = status === 'error'


  const handleDelete = (rowId:number): void => {
    setRows(rows.filter(row => row.id !== rowId))
  }


  return (
    <div className={'container'}>
      { isSuccess?(
        <Datagrid rows={rows} columns={columns} rowsPerPage={rowsPerPage} onDelete={handleDelete} />
      ):isLoading || isIdle?(
        <div>Loading</div>
      ): isError ? (
        <div>{error}</div>
      ):null
      }
    </div>
  )
}

export default App
