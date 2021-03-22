import React, { createElement, useEffect, useState } from 'react';
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from 'axios';
import MaterialTable from 'material-table'
import { useHistory } from "react-router-dom"

const Devices = () =>{

    const [devices, setDevices] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
        const getDevices = async () => {
          try {
              const resp  = await axios.get('http://127.0.0.1:5000/api/devices');
              
              console.log(resp.data);
              setDevices(resp.data);
            } catch(e) {
              console.log(e);
            }
      
          };
        getDevices();
        }, []);     

    const columns=[
        {title:'Name', field:'name'},
        {title:'Mac', field:'mac'},
        {title:'Distribution', field:'distribution'},
        {title:'Version', field:'version'}
    ]


    return(
        <div>
            <MaterialTable title="Devices"
            data={devices}
            columns={columns}
            onRowClick={(event, rowData) => history.push("/Management/" + rowData.mac)}
            />
        </div>
    )
}

export default Devices