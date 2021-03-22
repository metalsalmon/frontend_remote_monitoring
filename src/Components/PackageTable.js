import React, { createElement, useEffect, useState } from 'react';
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import InstallAppFormSubmit from "./InstallAppFormSubmit";
import axios from 'axios';
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";

const PackageTable = () =>{

    const [devicePackages, setDevicePackages] = useState([]);
    let { mac } = useParams();
  
    useEffect(() => {
        const getPackages = async () => {
            try {
                const resp  = await axios.get('http://127.0.0.1:5000/api/packages/' + mac);
                
                console.log(resp.data);
                setDevicePackages(resp.data);
            } catch(e) {
                console.log(e);
            }
        };
        
        getPackages();
    }, []);        

    const columns=[
        {
            title:'Name', field:'name'

        },
        {
            title:'Version', field:'version'
        }
    ]


    return(
        <div>
            <MaterialTable title="Packages"
            data={devicePackages}
            columns={columns}
            />
        </div>
    )
}

export default PackageTable