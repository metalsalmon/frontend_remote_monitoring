import React, { useEffect, useState } from 'react'
import CpuChart from '../Components/CpuChart';

const MonitorDetail = ({ data }) => {
    const { name, cpu_usage, disk_space, used_disk_space, ram_usage, time } = data;

    const [cpuData, setCpuData] = useState([]);
    const [ramData, setRamData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    useEffect(() => {
        setCpuData(prev => [...prev, cpu_usage]);
        setRamData(prev => [...prev, ram_usage]);
        setTimeData(prev => [...prev, time]);

    }, [data]);

    return(
        <div>
            <ul>
                <li>Name: {name}</li>
                <li>CPU: {cpu_usage} %</li>
                <li>Ram: {ram_usage} %</li>
                <li>Disk: {used_disk_space}/{disk_space} GB</li>

            </ul>
            <CpuChart cpuData={cpuData} ramData={ramData} time={timeData}/>
        </div>
    );
};

export default MonitorDetail;