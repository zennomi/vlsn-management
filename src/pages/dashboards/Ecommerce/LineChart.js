import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,

} from "reactstrap";


const LineChart = (props) => {

  const theme = props.theme;
  const newStudentLineChart = props.newStudentLineChart;
  const deactivedStudentLineChart = props.deactivedStudentLineChart;

  const data = {
    labels: [
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6"
    ],
    datasets: [
      {
        label: "Học sinh mới ($)",
        fill: true,
        backgroundColor: "transparent",
        tension: 0.0,
        borderColor: theme.primary,
        data: newStudentLineChart
      },
      {
        label: "Học sinh nghỉ",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "orange",
        tension: 0.0,
        data: deactivedStudentLineChart
      },
      
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true
    },
    tooltips: {
      intersect: false
    },
    hover: {
      intersect: true
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 10
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }
      ]
    }
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div className="card-actions float-right">
         
        </div>
        <CardTitle tag="h5" className="mb-0">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart">
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(LineChart);
