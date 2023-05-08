import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const columns = [
  { field: 'name', headerName: 'Name', width: 160 },
  { field: 'amount', 
    headerName: 'Amount', 
    width: 90,
    type: 'number'
  },
];

const rows = [
  { id: 1, name: 'Tom', amount: 20 },
  { id: 2, name: 'Tom', amount: 20 },
  { id: 3, name: 'Tom', amount: 20 },
  { id: 4, name: 'Tom', amount: 20 },
  { id: 5, name: 'Tom', amount: 20 },
  { id: 6, name: 'Tom', amount: 20 },
];

export default function Home() {
  const [ entries, setEntries ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ name, setName ] = useState("");
  const [ amt, setAmt ] = useState()

  console.log(name)

  const fetchData = async () => {
    const response = await fetch('/api/getEntries');
    const res = await response.json()
    setEntries(res.entries);
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>How much do I owe Alex</title>
        <meta name="description" content="How much money do people owe Alex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Add entry</h2>
        <Box sx={{
          width: '30%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}>
          <TextField
            id="name"
            label="Name"
            type="string"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="amount"
            label="Amount"
            type="number"
            value={amt}
            onChange={(e) => {
              setAmt(e.target.value);
            }}
          />
          <Button 
            variant="contained"
            onClick={async () => {
              const response = await fetch("/api/addEntry", {
                method: "POST",
                body: JSON.stringify({
                  name: name,
                  amount: amt
                })
              });
              fetchData();
            }}
          >
            Add
          </Button>
        </Box>
        
        <h2 className={styles.title}>
          People who owe Alex money:
        </h2>
        <div style={{ height: 400, width: '30%', paddingTop: "20px" }}>
          { loading ? null : <DataGrid
            rows={entries}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />}
        </div>

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
