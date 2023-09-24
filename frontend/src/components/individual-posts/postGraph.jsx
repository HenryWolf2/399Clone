import * as React from 'react';
import { useState, useEffect, PureComponent } from 'react';
import instance from '../api/api_instance';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function PostGraph(props) {
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

  const graphData = finaldf?.data?.map(row => ({
    'Theoretical Peak Mass': row[3],
    'Relative Abundance': row[2],
  }))

  console.log(graphData)

  return (
    
    <ResponsiveContainer width="95%" height={500}>
      <LineChart data={graphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis label={"Atomic Mass"} dataKey="Theoretical Peak Mass" height={80} />
        <YAxis label={{value:'Relative Abundance', angle:'-90'}} width={100} dataKey="Relative Abundance" />
        <Tooltip />
        <Line type="monotone" dataKey="Relative Abundance" stroke="#8884d8" dot={false} activeDot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}