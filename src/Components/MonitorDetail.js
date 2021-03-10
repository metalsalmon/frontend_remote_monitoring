import React from 'react'

const MonitorDetail = ({ data }) => {
    const { name, cpu_usage, disk_space } = data;

    return(
        <div>
            <ul>
                <li>Name: {name}</li>
                <li>CPU: {cpu_usage}</li>
                <li>Disk: {disk_space}</li>
            </ul>
        </div>
    );
};

export default MonitorDetail;