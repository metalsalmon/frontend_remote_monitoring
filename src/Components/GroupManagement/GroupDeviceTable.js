import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table'
import { useHistory } from "react-router-dom"
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from '@material-ui/icons/Close';
import api from '../../http-axios';
import { Context } from "../Context";
import {useParams} from "react-router-dom";
import replayIcon from '@material-ui/icons/Replay';


const GroupDeviceTable = () =>{

    const [devices, setDevices] = useState([]);
    const history = useHistory();
    const [context, setContext] = useContext(Context);
    const { group } = useParams();
    
    useEffect(() => {
        const getDevice = async () => {
            try {
                const data = await (await api.get('/api/groupDevices/' + group)).data
                console.log(data);
                setDevices(data);
            } catch(e) {
                console.log(e);
            }
        }
        
        getDevice();
    }, [context]);

    const columns=[
        {title:'Name', field:'name'},
        {title:'IP', field:'ip'},
        {title:'Mac', field:'mac'},
        {title:'Distribution', field:'distribution'},
        {title:'Version', field:'version'},
        {title:'Connected', field:'connected', hidden: true}
    ]

    const HandleDeleteOnClick = async (deviceName, deviceMac) =>{
        if(window.confirm("Do you want to remove " + deviceName + " from " + group))
        {
            const data = 
            {
                mac: deviceMac,
                name: group,
            }
            try {           
                  const resp = await api.post('/api/removeFromGroup',
                    JSON.stringify(data),
                  )
                  console.log(resp.data);
              } catch (err) {
                  console.error(err);
              }
        }
    }

    const HandleRebootClick = async () =>{
      if(window.confirm("Do you want to reboot all devices?"))
      {
        const data = 
        {
            type: group,
        }
        try {           
              const resp = await api.post('api/reboot',
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
          <div></div>
            <MaterialTable title={group + " Group"}
              data={devices}
              columns={columns}
              actions={[
                rowData => ({
                  icon: CheckIcon,
                  tooltip: 'online',
                  hidden: !rowData.connected,
                  disabled: true
                }),
                rowData => ({
                    icon: CloseIcon,
                    tooltip: 'offline',
                    hidden: rowData.connected == true,
                    disabled: true,
                  }),
                {
                    icon: 'delete',
                    tooltip: 'remove from group',
                    onClick: (event, rowData) => HandleDeleteOnClick(rowData.name, rowData.mac)
                },
                {
                  icon: replayIcon,
                  tooltip: 'reboot all',
                  isFreeAction: true,
                  onClick: (event) => HandleRebootClick()
                }
            ]}
            options={{
              actionsColumnIndex: -1,

              }}
              localization={{
                header: {
                actions:  "Connected",
                }
                }}
              onRowClick={(event, rowData) => history.push("/Management/" + rowData.mac)}
            />
<div></div>
           
        </div>
        
    )
}

export default GroupDeviceTable