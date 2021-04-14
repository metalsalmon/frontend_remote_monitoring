import React, {useEffect, useState } from 'react';
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from 'axios';
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";
import ConfigUpload from './ConfigUpload'
import DataContentUpload from './DataContentUpload'

const PackageTable = () =>{

    const [devicePackages, setDevicePackages] = useState([]);
    const { mac } = useParams();    
  
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

    const HandleDeleteOnClick = async (packageName) =>{
        if(window.confirm("You want to remove " + packageName))
        {
            const data = 
            {
                mac: mac,
                package: packageName,
                action: "remove",
            }
            try {           
                  const resp = await axios({
                    method: 'post',
                    url : 'http://0.0.0.0:5000/api/management',
                    data: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                  })
                  console.log(resp.data);
              } catch (err) {
                  console.error(err);
              }
        }
    }


    return(
        <div>
            <MaterialTable title="Packages"
            data={devicePackages}
            columns={columns}
            actions={[
                rowData => ({
                  icon: 'delete',
                  tooltip: 'Delete package',
                  onClick: (event, rowData) => HandleDeleteOnClick(rowData.name)
                })
            ]}
            options={{
            actionsColumnIndex: -1
            }}
            detailPanel={rowData => {
            return (
                <div>
                    <h3>upload config</h3>
                    <ConfigUpload packageName = {rowData.name}/>

                    <h3>upload data</h3>
                    <DataContentUpload packageName = {rowData.name}/>
                </div>
        

            )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
        </div>
    )
}

export default PackageTable