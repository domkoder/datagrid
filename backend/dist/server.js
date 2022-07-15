"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const faker_1 = require("@faker-js/faker");
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 5000;
const { name, address, company, internet, commerce } = faker_1.faker;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// colume data
const dataColumns = [
    { id: 1, field: 'id', headerName: 'ID', },
    { id: 2, field: 'firstName', headerName: 'First name', },
    { id: 3, field: 'lastName', headerName: 'Last name', },
    { id: 4, field: 'email', headerName: 'Email', },
    { id: 5, field: 'country', headerName: 'Country', },
    { id: 6, field: 'company', headerName: 'Company', },
    { id: 8, field: 'department', headerName: 'Department', },
];
// generate fake data using fakerjs and push to dataRows array
function getGeneratedData() {
    //row data
    const dataRows = [];
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
            department: commerce.department()
        });
    }
    return {
        dataColumns,
        dataRows
    };
}
app.get("/api/data", (req, res) => {
    const data = getGeneratedData();
    if (data) {
        return res.send(data);
    }
    else {
        return res.send(null);
    }
});
// app.get("/", (req: Request, res: Response): void => {
//   res.json({ message: "up ready to roll" });
// });
// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, '../', 'frontend ', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
app.listen(port, () => {
    console.log("Server Running!");
});
