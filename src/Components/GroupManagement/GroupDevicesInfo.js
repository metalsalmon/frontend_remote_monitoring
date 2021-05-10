import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import DeviceDetail from './DeviceDetail'
import api from '../../http-axios'


const GroupDevicesInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState([])
    const { group } = useParams();

    useEffect(() => {
        const getDevice = async () => {
            try {
                const data = await (await api.get('/api/groupDevices/' + group)).data
                console.log(data);
                const nameArr = data.map((item) => item);
                setDeviceInfo(nameArr);
            } catch(e) {
                console.log(e);
            }
        }
        
        getDevice();
    }, []);
    return(
        
        <div>
            
        {
            deviceInfo.map((deviceData, idx) =>

            <DeviceDetail key={idx} data={deviceData}></DeviceDetail>

            )              
        }     
        </div>
    );
};

export default GroupDevicesInfo;