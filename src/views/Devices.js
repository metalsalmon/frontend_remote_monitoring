import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table'
import { useHistory } from "react-router-dom"
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import { Context } from "../Components/Context";
import CloseIcon from '@material-ui/icons/Close';
import replayIcon from '@material-ui/icons/Replay';
import api from '../http-axios'


const Devices = () =>{

    const [devices, setDevices] = useState([]);
    const [groups, setGroups] = useState([]);
    const [data, setData] = useState([]);
    const history = useHistory();
    const [context, setContext] = useContext(Context);
  
    useEffect(() => {
        const getDevices = async () => {
          try {
              const resp  = await api.get('/api/devices');
              
              console.log(resp.data);
              setDevices(resp.data);
            } catch(e) {
              console.log(e);
            }
      
          };

          const getGroups = async () => {
            try {
                const resp  = await api.get('/api/groups');
                
                console.log(resp.data);
                setGroups(resp.data);
                setData(resp.data);
              } catch(e) {
                console.log(e);
              }
        
            };
        getDevices();
        getGroups();
        }, [context]);     

    const columns=[
        {title:'Name', field:'name'},
        {title:'IP', field:'ip'},
        {title:'Mac', field:'mac'},
        {title:'Distribution', field:'distribution'},
        {title:'Version', field:'version'},
        {title:'Connected', field:'connected', hidden: true}
    ]

    const groupColumns=[
      {title:'Name', field:'name'},

  ]

  const HandleRebootClick = async (ip, mac) =>{
    if(window.confirm("Do you want to reboot " + ip))
    {
        const data = 
        {
            mac: mac
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
            <MaterialTable title="Devices"
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
                    icon: replayIcon,
                    tooltip: 'reboot device',
                    onClick: (event, rowData) => HandleRebootClick(rowData.ip, rowData.mac)
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

            <MaterialTable
                      columns={[
                        {
                          title: "Name",
                          field: "name",
                          editComponent: editProps => (
                            <Input
                              autoFocus={true}
                              onChange={e => editProps.onChange(e.target.value)}
                            />
                          )
                        },
                      ]}
                      data={data}
                      title="Groups"
                      icons={{
                        Add: props => <AddIcon />,
                        Edit: props => <EditIcon />,
                        Delete: props => <DeleteIcon />,
                        Clear: props => <DeleteIcon />,
                        Check: props => <CheckIcon />
                      }}
                      editable={{
                        onRowAdd: async (newData) => {
                            const addRequest = 
                            {
                                action: 'Add',
                                name: newData.name
                            }
                            try {           
                                  const resp = await api.post('/api/groups', 
                                    JSON.stringify(addRequest)
                                  )
                                  console.log(resp.data);
                              } catch (err) {
                                  console.error(err);
                              }
                              setData([...data, newData]);
                          },
                        onRowUpdate: async (newData, oldData) => {
                            const updateRequest = 
                            {
                                action: 'Update',
                                name: newData.name,
                                old_name: oldData.name
                            }
                            try {           
                                  const resp = await api.post('/api/groups',
                                    JSON.stringify(updateRequest)
                                  )
                                  console.log(resp.data);
                              } catch (err) {
                                  console.error(err);
                              }
                              const dataUpdate = [...data];
                              const index = oldData.tableData.id;
                              dataUpdate[index] = newData;
                              setData([...dataUpdate]);
                          },
                        onRowDelete: async (oldData) => {
                              const delete_request = 
                              {
                                  action: 'Delete',
                                  name: oldData.name
                              }
                              try {           
                                    const resp = await api.post('/api/groups',
                                      JSON.stringify(delete_request),
                                    )
                                    console.log(resp.data);
                                } catch (err) {
                                    console.error(err);
                                }

                              const dataDelete = [...data];
                              const index = oldData.tableData.id;
                              dataDelete.splice(index, 1);
                              setData([...dataDelete]);
                          }
                      }}
                      
                      onRowClick={(event, rowData) => history.push("/GroupManagement/" + rowData.name)}
                    />
        </div>
        
    )
}

export default Devices