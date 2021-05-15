import React, { useEffect, useState } from 'react'
import CpuChart from '../Components/CpuChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    '& li': {
        padding: 16
    }
  },
}));

const MonitorDetail = ({ data }) => {
    const classes = useStyles();
    const { ip, cpu_usage, disk_space, used_disk_space, ram_usage, time, cpu_temp } = data;

    const [cpuData, setCpuData] = useState([]);
    const [cpuTempData, setCpuTempData] = useState([]);
    const [ramData, setRamData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    useEffect(() => {
        setCpuData(prev => [...prev, cpu_usage]);
        setCpuTempData(prev => [...prev, cpu_temp]);
        setRamData(prev => [...prev, ram_usage]);
        setTimeData(prev => [...prev, time]);

    }, [data]);

    return(
        <div>
            <ul className={classes.list}>
                <li>IP: {ip}</li>
                <li>CPU: {cpu_usage} %</li>
                <li>CPU: {cpu_temp} °C</li>
                <li>Ram: {ram_usage} %</li>
                <li>Disk: {used_disk_space}/{disk_space} GB</li>

            </ul>
            <CpuChart cpuData={cpuData} ramData={ramData} cpuTemp={cpuTempData} time={timeData}/>
        </div>
    );
};

export default MonitorDetail;