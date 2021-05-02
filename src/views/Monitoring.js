import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonitorDetail from '../Components/MonitorDetail';
import CpuChart from '../Components/CpuChart'
import { Line, defaults } from 'react-chartjs-2'

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [cpuData, setcpuData] = useState([]);

  useEffect(() => {
    const intervalHandle = setInterval(async () => {
      try {
        const { data } = (await axios.get('http://127.0.0.1:5000/api/monitoring')).data;
        setMonitoringData(data);
        setcpuData(prevCpuData => [...prevCpuData, data[0].cpu_usage]);
        console.log(data[0].cpu_usage)
        console.log(cpuData)
      } catch(e) {
        console.log(e);
      }
    }, 4000);

    return () => clearInterval(intervalHandle);
  }, []);

    var arr = [];
    return (
      <div className="Monitoring">
        
        <h1>Monitoring</h1>
        <div>
          {!monitoringData?.length && false ? (
            <div>loading... </div>
          ) : (
            <div>
              {
                monitoringData.map((deviceData, idx) =>
                  <MonitorDetail key={idx} data={deviceData}></MonitorDetail>)
  
              }
              <div>
              <CpuChart cpuData={cpuData}/>
    </div>
            </div>  
            
          )
            
          }
        </div>
    </div>
  );

}
export default Monitoring;
