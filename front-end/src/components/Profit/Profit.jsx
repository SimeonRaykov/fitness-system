import React, { useState, useEffect } from "react";
import {formatToday, formatLastMonth} from '../utils/date-manipulations';
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { fetchAmount } from '../../api';

export default function Profit() {
  const [data,setData] = useState([]);
  const [type, setType] = useState();
  const [fromDate, setFromDate] = useState(formatLastMonth);
  const [toDate, setToDate] = useState(formatToday);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
        setData(await fetchAmount(fromDate, toDate));
    }
    fetchAPI();
}, []);

function getProfits(){
  const fetchAPI = async () => {
    setData(await fetchAmount(fromDate, toDate));
}
fetchAPI();
}

function toggleCharts(){
setChecked(!checked);
}

  const lineChart = data ? (
    data[0] ? (
      <Line
        data={{
          labels: data.map(({ date }) => date),
          datasets: [
            {
              data: data.map(({ payments }) => payments),
              label: "Payments",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: data.map(({ expenses }) => expenses),
              label: "Expenses",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
            {
              data: data.map(({ profit }) => profit),
              label: "Profit",
              borderColor: "#f0f696",
              backgroundColor:"#facf5a",
              fill: true,
            },
          ],
        }}
      />
    ) : null
  ) : (
    ""
  );

  const barChart = data ? (
    data[0] ? (
      <Bar
        data={{
          labels: data.map(({ date }) => date),
          datasets: [
            {
              data: data.map(({ payments }) => payments),
              label: "Payments",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: data.map(({ expenses }) => expenses),
              label: "Expenses",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
            {
              data: data.map(({ profit }) => profit),
              label: "Profit",
              borderColor: "#f0f696",
              backgroundColor:"#facf5a",
              fill: true,
            },
          ],
        }}
      />
    ) : null
  ) : (
    ""
  );

  if (!data) {
    return "Loading";
  }

  return (<div className="container mt-2">
    <div className="row justify-content-center">
    <input value={checked} onClick={toggleCharts} class="tgl tgl-skewed" id="cb3" type="checkbox"/>
    <label class="tgl-btn" data-tg-off="Line" data-tg-on="Bar" for="cb3"></label>
    </div>
    {checked?barChart:lineChart}
    <div className="row justify-content-center mt-3">
    <input type="date" onChange={e=>setFromDate(e.target.value)} className="mr-3" value={fromDate}/>
    <input type="date" onChange={e=>setToDate(e.target.value)} value={toDate}/>
    </div>
    <button onClick={getProfits} className="button profits mt-5">Get profits</button>
    </div>
  );
}
