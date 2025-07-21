import { useState } from 'react'
import DataTable from './components/DataTable';
import type { DataRow } from './components/DataTable';
import PageSizeSelector from './components/PageSizeSelector';
import data from './data.json';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [pageSize, setPageSize] = useState(7); // default 7 rows per page

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="container mt-5">
          <h3>Lightweight Datatable / sortable headers / pagination</h3>
          <PageSizeSelector pageSize={pageSize} onPageSizeChange={setPageSize} />
          <DataTable data={data as DataRow[]} pageSize={pageSize} />
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
