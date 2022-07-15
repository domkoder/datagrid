import express, { Request, Response } from "express"
const app = express()
import { faker } from '@faker-js/faker'
import cors from "cors";

const {name, address, company, internet, commerce} = faker

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// types for row data
 type DataRows = {
  id: number;
  firstName:  string;
  lastName:   string;
  email:      string;
  country:    string;
  city:       string;
  company:    string;
  department: string;
}

// types for row data
type DataColumns = {
    id: number,
    field: string,
    headerName: string,
}

type Data = {
  dataColumns:DataColumns[],
  dataRows: DataRows[]
}

// colume data
const dataColumns:DataColumns [] = [
  {id: 1, field: 'id', headerName: 'ID',},
  {id: 2, field: 'firstName', headerName: 'First name',},
  {id: 3, field: 'lastName', headerName: 'Last name',},
  {id: 4, field: 'email', headerName: 'Email',},
  {id: 5, field: 'country', headerName: 'Country',},
  {id: 6, field: 'company', headerName: 'Company',},
  {id: 8, field: 'department', headerName: 'Department',},
]


// generate fake data using fakerjs and push to dataRows array
function getGeneratedData():Data  {
  //row data
  const dataRows: DataRows [] = []

  // loop and push data to dataRows array
  for (let i = 1; i <= 500; i++) {
    dataRows.push({
      id: i,
      firstName: name.firstName(),
      lastName: name.lastName(),
      email: internet.email(),
      country: address.country(),
      city: address.cityName(),
      company: company.companyName(),
      department:commerce.department()
    })
  }

  return {
    dataColumns,
    dataRows
  }
}


app.get("/api/data", (req: Request, res: Response) => {
  const data = getGeneratedData()
  if (data) {
    return res.send(data);
  }else{
    return res.send(null);
  }
})



app.get("/", (req: Request, res: Response): void => {
  res.json({ message: "Please Like the Video!" });
});

app.listen(3001, (): void => {
  console.log("Server Running!");
});