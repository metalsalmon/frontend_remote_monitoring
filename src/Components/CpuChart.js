import React from 'react'
import { Line } from 'react-chartjs-2';



const CpuChart = ({cpuData, ramData, time}) => {
  return (
    <Line
        data={{
          labels: time,
          datasets: [
            {
              label: 'cpu usage %',
              data: cpuData,
              fill: false,
              borderColor: 'rgba(0, 0, 255, 1)',
              borderWidth: 1,
            },
            { 
              label: 'ram usage %',
              data: ramData,
              fill: false,
              borderColor: 'rgba(255, 5, 10, 1)',
              borderWidth: 1,
            }
          ],
        }}
        height={400}
        width={600}
        options={{
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