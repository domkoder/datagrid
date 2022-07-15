import React from 'react';
import './styles.css'
import { Datagrid } from './Components';
import { ReactComponent as Spinner } from './icons/spinner.svg';
import {Columns} from './Components/Datagrid/Datagrid.types'

// Declear columns and rows variables
let dataColumns: Columns
let dataRows: any[] = []
let rowsPerPage:number = 100


function App() {
  // fetch data from backend and asign the result columns and rows variables
  React.useEffect(() => {
    setStatus('loading')
    fetch('https://klas-datagrid.herokuapp.com/api/data')
    .then(response => response.json())
    .then(result => {
      dataColumns = result.dataColumns
      dataRows = result.dataRows
      setStatus('success')
    }).catch(error => {
      setError('error please check your network and try again' + error)
      setStatus('error')

    })
  }, [])

  
  const [status, setStatus] = React.useState<string>('idle')
  const [error, setError] = React.useState<string>('')

  // compute booleans values for status
  const isIdle:boolean = status === 'idle'
  const isLoading:boolean = status === 'loading'
  const isSuccess:boolean = status === 'success'
  const isError:boolean = status === 'error'


  return (
    <>
      {/* render base on the status state  */}
      { isSuccess?(
        <div  className={'container'}>
          <Datagrid rows={dataRows} columns={dataColumns} rowsPerPage={rowsPerPage}  />
        </div>
      ):isLoading || isIdle ?(
        <div className="spinner"><Spinner className='spinner__icon'/></div>
      ): isError ? (
        <div>{error}</div>
      ):null
      }
    </>
  )
}

export default App
