import * as React from 'react';
import { useState, useEffect, PureComponent } from 'react';
import instance from '../api/api_instance';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';



export default function HomeGraph() {
  const [results_df, setResults_df] = useState({})

  useEffect(() => {
    async function GetAnalysis() {
      try{ 
        await instance ({
          url: "home/graph",
          method: "GET",
          params: {post_id: 1}
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
            <p>Identity: <span dangerouslySetInnerHTML={{ __html: data.species.replace(/(\d+)/g, '<sub>$1</sub>') }} /></p>
            <p>Intensity: {data.normalised_intensity}</p>
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
    
    <ResponsiveContainer width="100%" height={400} >
      <LineChart data={results_df} margin={{left: -40, top: 10}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="m/z" label={"Atomic Mass"} height={80} tickFormatter={customXAxisTickFormatter}/>
        <YAxis label={{ value: 'Relative Abundance', angle: '-90' }} width={100} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
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