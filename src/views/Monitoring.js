import React, { useEffect, useState } from 'react';
import MonitorDetail from '../Components/MonitorDetail';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import api from '../http-axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 750,
    width: 800,
  },
  control: {
    padding: theme.spacing(),
  },
}));

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [AllMonitoringData, setAllMonitoringData] = useState([]);
  // const [cpuData, setcpuData] = useState([]);
  const classes = useStyles();

  const getMonitoringData = async  () => {
    try {
      const { data } = (await api.get('/api/monitoring')).data;
      setMonitoringData(data);
      // setcpuData(prevCpuData => [...prevCpuData, data[0].cpu_usage]);
      setAllMonitoringData(prevMonitoringData => [...prevMonitoringData, data]);
      console.log(data)
      setTimeout(getMonitoringData, 5000);
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
           <div className={classes.root}>

    </div>
        <h1>Monitoring</h1>
        <div>
          {!monitoringData?.length && false ? (
            <div>loading... </div>
            ) : (
              <div>
                <Grid container spacing={1}>
                  {
                      monitoringData.map((deviceData, idx) =>
                      
                      <Grid item xs={12} md = {6}><Paper className={classes.paper}><MonitorDetail key={idx} data={deviceData}></MonitorDetail></Paper></Grid>
                      )              
                  }       
                </Grid>
              </div>              
            )          
          }
        </div>
    </div>
  );

}
export default Monitoring;
