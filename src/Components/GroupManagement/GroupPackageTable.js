import React, {useEffect, useState, useContext } from 'react';
import { Box } from "@material-ui/core";
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";
import GroupConfigUpload from './GroupConfigUpload'
import GroupDataContentUpload from './GroupDataContentUpload'
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { Context } from "../Context";
import api from '../../http-axios'


const GroupPackageTable = () =>{
    const [context, setContext] = useContext(Context);
    const [devicePackages, setDevicePackages] = useState([]);
    const { group } = useParams();
  
    useEffect(() => {
        const getPackages = async () => {
            try {
                const resp  = await api.get('/api/groupPackages/' + group);
                
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
                group: group,
                package: packageName,
                action: "remove",
            }
            try {           
                const resp = await api.post('/api/groupManagement',
                    JSON.stringify(data),
                )
                  console.log(resp.data);
              } catch (err) {
                  console.error(err);
              }
        }
    }

    const HandleUpdateOnClick = async (packageName, latestVersion) =>{
        if(window.confirm("Do you want to update " + packageName  +  ' (' + latestVersion + ')'))
        {
            const data = 
            {
                group: group,
                package: packageName,
                action: 'update',
                version: ''
            }
            try {           
                const resp = await api.post('/api/groupManagement',
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
                    <GroupConfigUpload packageName = {rowData.name}/>

                    <h3>upload data</h3>
                    <GroupDataContentUpload packageName = {rowData.name}/>
                </div>
        

            )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
        </div>
    )
}

export default GroupPackageTable