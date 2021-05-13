import React, { useEffect, useState } from 'react'
import CpuChart from '../Components/CpuChart';

const MonitorDetail = ({ data }) => {
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
            <ul>
                <li>IP: {ip}</li>
                <li>CPU: {cpu_usage} %</li>
                <li>CPU: {cpu_temp} °</li>
                <li>Ram: {ram_usage} %</li>
                <li>Disk: {used_disk_space}/{disk_space} GB</li>

            </ul>
            <CpuChart cpuData={cpuData} ramData={ramData} cpuTemp={cpuTempData} time={timeData}/>
        </div>
    );
};

export default MonitorDetail;