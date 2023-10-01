import * as React from 'react';
import { useState, useEffect, PureComponent } from 'react';
import instance from '../api/api_instance';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';



export default function PostGraph(props) {
  const [results_df, setResults_df] = useState({})

  useEffect(() => {
    async function GetAnalysis() {
      try{ 
        await instance ({
          url: "post/get/graph_data",
          method: "GET",
          params: {post_id: props.post_id}
      }).then((res) => {
        setResults_df(res.data.all_points);
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetAnalysis();
  }, [])

  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.species !== 'N/A') {
        return (
          <div className="custom-tooltip" style={{background: "white", padding: "10px"}}>
            <p>{`Species: ${data.species}hi`}</p>
            <p>{`Intensity: ${data.normalised_intensity}`}</p>
          </div>
        );
      }
    }
    return null;
  };

  const CustomDot = ({ cx, cy, payload }) => {
    if (payload.species !== 'N/A') {
      return <Dot cx={cx} cy={cy} r={3} fill="blue" />;
    }
    return null;
  };
  const CustomActiveDot = ({ cx, cy, payload }) => {
    if (payload.species !== 'N/A') {
      return <Dot cx={cx} cy={cy} r={3} fill="orange" />;
    }
    return null;
  };

  const customXAxisTickFormatter = (value) => {
    return Math.round(value / 200) * 200; // Round to the nearest whole number
  };

  return (
    
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={results_df}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="m/z" label={"Atomic Mass"} height={80} tickFormatter={customXAxisTickFormatter}/>
        <YAxis label={{value:'Relative Abundance', angle:'-90'}} width={100}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="normalised_intensity"
          name="Intensity"

          dot = {<CustomDot />}
          activeDot = {<CustomActiveDot />}
 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}