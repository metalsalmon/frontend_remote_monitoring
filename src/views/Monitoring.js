import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonitorDetail from '../Components/MonitorDetail';
import { Line, defaults } from 'react-chartjs-2'

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [AllMonitoringData, setAllMonitoringData] = useState([]);
  // const [cpuData, setcpuData] = useState([]);

  const getMonitoringData = async  () => {
    try {
      const { data } = (await axios.get('http://127.0.0.1:5000/api/monitoring')).data;
      setMonitoringData(data);
      // setcpuData(prevCpuData => [...prevCpuData, data[0].cpu_usage]);
      setAllMonitoringData(prevMonitoringData => [...prevMonitoringData, data]);
      console.log(data)
      setTimeout(getMonitoringData, 4000);
    } catch(e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    getMonitoringData();
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
                // monitoringData.forEach((deviceData) => 
                //   <MonitorDetail data={deviceData}></MonitorDetail>
                // ),
                monitoringData.map((deviceData, idx) =>
                  <MonitorDetail key={idx} data={deviceData}></MonitorDetail>)
  
              }
              <div>
    </div>
            </div>  
            
          )
            
          }
        </div>
    </div>
  );

}
export default Monitoring;
