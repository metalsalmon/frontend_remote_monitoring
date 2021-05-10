import React, {useEffect, useState, useContext } from 'react';
import { Box } from "@material-ui/core";
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";
import ConfigUpload from './ConfigUpload'
import DataContentUpload from './DataContentUpload'
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { Context } from "./Context";
import api from '../http-axios'


const PackageTable = () =>{
    const [context, setContext] = useContext(Context);
    const [devicePackages, setDevicePackages] = useState([]);
    const { mac } = useParams();
  
    useEffect(() => {
        const getPackages = async () => {
            try {
                const resp  = await api.get('/api/packages/' + mac);
                
                console.log(resp.data);
                setDevicePackages(resp.data);
            } catch(e) {
                console.log(e);
            }
        };
        
        getPackages();
    }, [context]); 

    const columns=[
        {
            title:'Name', field:'name'

        },
        {
            title:'Version', field:'version'
        },
        {
            title: 'Latest version',
            field: 'latest_version',
            hidden: true

        }
    ]

    const HandleDeleteOnClick = async (packageName) =>{
        if(window.confirm("Do you want to remove " + packageName))
        {
            const data = 
            {
                mac: mac,
                package: packageName,
                action: "remove",
            }
            try {           
                  const resp = await api.post('/api/management',
                    JSON.stringify(data),
                  )
                  console.log(resp.data);
              } catch (err) {
                  console.error(err);
              }
        }
    }

    const HandleUpdateOnClick = async (packageName, latestVersion) =>{
        if(window.confirm("Do you want to update " + packageName +  ' (' + latestVersion + ')'))
        {
            const data = 
            {
                mac: mac,
                package: packageName,
                action: 'update',
                version: ''
            }
            try {           
                  const resp = await api.post('/api/management',
                    JSON.stringify(data),
                    )
                  console.log(resp.data);
              } catch (err) {
                  console.error(err);
              }
        }
    }

    const HandleUpdateAllClick = async () =>{
        if(window.confirm("Do you want to update all?"))
        {
            const data = 
            {
                mac: mac,
                action: 'updateAll'
            }
            try {           
                  const resp = await api.post('/api/management',
                    JSON.stringify(data),
                    )
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
                {
                    icon: 'updateIcon',
                    tooltip: 'Update all',
                    isFreeAction: true,
                    onClick: (event) => HandleUpdateAllClick()
                },
                rowData => ({
                  icon: CheckCircleOutlineOutlinedIcon,
                  tooltip: 'up to date',
                  hidden: rowData.version != rowData.latest_version
                }),
                rowData => ({
                    icon: WarningIcon,
                    tooltip: 'Outdated version',
                    hidden: rowData.version == rowData.latest_version,
                    onClick: (event, rowData) => HandleUpdateOnClick(rowData.name, rowData.latest_version)
                  }),
                {
                    icon: 'delete',
                    tooltip: 'Delete package',
                    onClick: (event, rowData) => HandleDeleteOnClick(rowData.name)
                }
            ]}
            options={{
            actionsColumnIndex: -1
            }}
            detailPanel={rowData => {
            return (
                <div>
                    <Box className="mb25" display="flex" alignItems="center">
                        
                    </Box>



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