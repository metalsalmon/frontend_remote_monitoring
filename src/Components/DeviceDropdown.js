import React, { createElement, useEffect, useState } from 'react';
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import InstallAppFormSubmit from "./InstallAppFormSubmit";
import axios from 'axios';

const DeviceDropdown = () =>{
  const [deviceData, setDeviceData] = useState([]);
  
  const handleInput = () => {
      console.log("omg")
    };
    
  useEffect(() => {
    const getDevices = async () => {
      try {
          const resp  = await axios.get('http://127.0.0.1:5000/api/devices');
          
          console.log(resp.data);
          setDeviceData(resp.data);
        } catch(e) {
          console.log(e);
        }
  
      };
    getDevices();
    }, []);    

    return(
        <div>
        <h1>{deviceData.length}</h1>
        <InputLabel id="label">device</InputLabel>
        <Select labelId="label" id="select" value="install" onChange={handleInput} name="devices">
            {deviceData.map((item, idx) =>
            <MenuItem key={idx} value={item.mac} >{item.name}</MenuItem>
            
            )}
        </Select>    

        </div>
        
    );
}

export default DeviceDropdown