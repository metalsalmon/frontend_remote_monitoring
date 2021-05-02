import React from 'react'
import { Line } from 'react-chartjs-2';



const CpuChart = ({cpuData}) => {
  return (
    <Line
        data={{
          labels: cpuData,
          datasets: [
            {
              label: 'cpu usage %',
              data: cpuData,
              fill: true,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }
          ],
        }}
        height={400}
        width={600}
        options={{
          animation: { duration: 0 },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  min: 0,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
  )
}

export default CpuChart