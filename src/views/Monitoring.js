import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonitorDetail from '../Components/MonitorDetail';

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState([]);

  useEffect(() => {
    const intervalHandle = setInterval(async () => {
      try {
        const { data } = (await axios.get('http://127.0.0.1:5000/monitoring')).data;
        console.log(data);
        setMonitoringData(data);
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
          {!monitoringData?.length ? (
            <div>loading... </div>
          ) : (
            <div>
              {
                monitoringData.map((deviceData, idx) =>
                  <MonitorDetail key={idx} data={deviceData}></MonitorDetail>)
              }
            </div>  
          )
            
          }
        </div>
    </div>
  );

}
export default Monitoring;
