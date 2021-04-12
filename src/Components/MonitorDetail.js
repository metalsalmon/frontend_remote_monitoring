import React from 'react'

const MonitorDetail = ({ data }) => {
    const { name, cpu_usage, disk_space, used_disk_space, ram_usage } = data;

    return(
        <div>
            <ul>
                <li>Name: {name}</li>
                <li>CPU: {cpu_usage} %</li>
                <li>Ram: {ram_usage} %</li>
                <li>Disk: {used_disk_space}/{disk_space} GB</li>

            </ul>
        </div>
    );
};

export default MonitorDetail;