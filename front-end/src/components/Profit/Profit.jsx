import React, { useState, useEffect } from "react";
import {formatToday, formatLastMonth} from '../utils/date-manipulations';
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { fetchAmount } from '../../api';

export default function Profit() {
    const [data,setData] = useState([]);
  const [type, setType] = useState();
  const [dateFrom, setDateFrom] = useState(formatLastMonth);
  const [dateTo, setDateTo] = useState(formatToday);

  useEffect(() => {
    const fetchAPI = async () => {
        setData(await fetchAmount());
    }
    fetchAPI();
}, []);

  const lineChart = data.length ? (
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
          ],
        }}
      />
    ) : null
  ) : (
    ""
  );

  if (!data[0]) {
    return "Loading";
  }

  return <div className="container">{lineChart}</div>;
}
