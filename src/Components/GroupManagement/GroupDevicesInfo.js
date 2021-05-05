import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import DeviceDetail from './DeviceDetail'
import { makeStyles } from '@material-ui/core/styles';


const GroupDevicesInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState([])
    const { group } = useParams();

    useEffect(() => {
        const getDevice = async () => {
            try {
                const data = await (await axios.get('http://127.0.0.1:5000/api/groupDevices/' + group)).data
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