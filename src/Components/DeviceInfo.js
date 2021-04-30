import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';

const DeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState([])
    const { mac } = useParams();

    useEffect(() => {
        const getDevice = async () => {
            try {
                const resp = await axios.get('http://127.0.0.1:5000/api/device/' + mac)
                console.log(resp.data);
                setDeviceInfo(resp.data);
            } catch(e) {
                console.log(e);
            }
        }
        
        getDevice();
    }, []);
    return(
        <div>
            <h2>
                <Box component="div" display="inline" p={1} m={1}>{deviceInfo.name}</Box>
                <Box component="div" display="inline" p={1} m={1}>{deviceInfo.ip}</Box>
                <Box component="div" display="inline" p={1} m={1}>{deviceInfo.mac}</Box>
                <Box component="div" display="inline" p={1} m={1}>{deviceInfo.distribution}</Box>
                <Box component="div" display="inline" p={1} m={1}>{deviceInfo.version}</Box>
            </h2>
        </div>
    );
};

export default DeviceInfo;