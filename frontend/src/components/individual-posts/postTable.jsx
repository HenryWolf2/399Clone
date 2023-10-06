import React, { useState, useMemo, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';
import instance from '../api/api_instance';
import TablePagination from '@mui/material/TablePagination';

export default function PostTable(props) {
  const [results_df, setResults_df] = useState({}) 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  
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
  }, [props.results_id])

  const finaldf = results_df.result_df
  

  const slicedData = useMemo(() => {
    const firstItemIndex = page * rowsPerPage;
    const lastItemIndex = firstItemIndex + rowsPerPage;
    return finaldf?.data?.slice(firstItemIndex, lastItemIndex);
  }, [finaldf, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset to the first page when changing the number of rows per page
  };
  

  return (
    
    <TableContainer component={Paper}>
    <Table stickyHeader sx={{ minWidth: 650, maxHeight: 500 }} aria-label="simple table">
    <TableHead>
      <TableRow style={{ background: '#02AEEC' }}>
        {/* {finaldf?.columns?.map((column, index) => (
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }} key={index}>{column}</TableCell>
        ))} */}
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>Identity</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>PO</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>Intensity</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>Theoretical Peak Mass</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>Experimental Peak</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>PPM</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>Closeness of Fit</TableCell>
          <TableCell style={{ background: 'none', color: "white", fontWeight: "bold", fontSize: 16 }}>Closest</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {slicedData?.map((row, index) => (
        <TableRow
          key={row[0]}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          style ={ index % 2? { background : "#e0e0e0" }:{ background : "white" }}
        >
          <TableCell align="left"> <div dangerouslySetInnerHTML={{ __html: row[0].replace(/(\d+)/g, '<sub>$1</sub>') }} /></TableCell> 
          <TableCell align="left">{row[1]}</TableCell>
          <TableCell align="left">{row[2]}</TableCell>
          <TableCell align="left">{row[3]}</TableCell>
          <TableCell align="left">{row[4]}</TableCell>
          <TableCell align="left">{row[5]}</TableCell>
          <TableCell align="left">{row[6]}</TableCell>
          <TableCell align="left">{row[7] ? "TRUE":"FALSE"}</TableCell>

          
        </TableRow>
      ))}
    </TableBody>
    </Table>
    <Table>
    <TableFooter>
      <TableRow>
        <TablePagination
          count={finaldf?.data?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ paddingRight: 20 }}
        />
      </TableRow>
    </TableFooter>
  </Table>
    </TableContainer>
  );
}