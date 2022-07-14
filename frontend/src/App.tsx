import React, { Provider } from 'react';
import './App.css'
import { Datagrid } from './Components';

// types for row data
// type Rows = {
//   id: number;
//   firstName:  string;
//   lastName:   string;
//   email:      string;
//   country:    string;
//   city:       string;
//   company:    string;
//   department: string;
// }

// types for row data
// type Columns = {
//     id: number,
//     field: string,
//     headerName: string,
// }


function App() {
  React.useEffect(() => {
    fetch('http://localhost:3001/api/data')
    .then(response => response.json())
    .then(result => {
      setColumns(result.dataColumns)
      setRows(result.dataRows)
      console.log('Success:', result);
    }).catch(error => {
      console.error('Error:', error);
    })
  }, [])

  const [columns, setColumns] = React.useState<any[]>([])
  const [rows, setRows] = React.useState<any[]>([])

  const handleDelete = (rowId:number): void => {
    setRows(rows.filter(row => row.id !== rowId))
  }


  return (
    <div className={'container'}>
      {/* <Datagrid dataColumns={columns} dataRows={test} /> */}
      <Datagrid rows={rows} columns={columns} onDelete={handleDelete} />
    </div>
  )
}

export default App
