import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import instance from '../api/api_instance';


export default function PostTable(props) {
  const [results_df, setResults_df] = useState({})
  useEffect(() => {
    async function GetAnalysis() {
      try{ 
        await instance ({
          url: "/post/analysis_by_id",
          method: "GET",
          params: {analysis_id: props.results_id}
      }).then((res) => {
        setResults_df(res.data.analysis);
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetAnalysis();
  }, [])

  const finaldf = results_df.result_df

  return (
    <TableContainer component={Paper}>
    <Table stickyHeader sx={{ minWidth: 650, maxHeight: 500 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        {finaldf?.columns?.map((column, index) => (
          <TableCell key={index}>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {finaldf?.data?.map((row) => (
        <TableRow
          key={row[0]}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="left"> <div dangerouslySetInnerHTML={{ __html: row[0].replace(/(\d+)/g, '<sub>$1</sub>') }} /></TableCell> 
          <TableCell align="left">{row[1]}</TableCell>
          <TableCell align="left">{row[2]}</TableCell>
          <TableCell align="left">{row[3]}</TableCell>
          <TableCell align="left">{row[4]}</TableCell>
          <TableCell align="left">{row[5]}</TableCell>
          <TableCell align="right">{row[6]}</TableCell>
          <TableCell align="right">{row[7] ? "True":"False"}</TableCell>

          
        </TableRow>
      ))}
    </TableBody>
    </Table>
    </TableContainer>
  );
}