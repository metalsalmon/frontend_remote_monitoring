import React, { createElement, useEffect, useState } from 'react';
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from 'axios';
import MaterialTable from 'material-table'
import { useHistory } from "react-router-dom"
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";


const Devices = () =>{

    const [devices, setDevices] = useState([]);
    const [groups, setGroups] = useState([]);
      const [data, setData] = useState([]);
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

          const getGroups = async () => {
            try {
                const resp  = await axios.get('http://127.0.0.1:5000/api/groups');
                
                console.log(resp.data);
                setGroups(resp.data);
                setData(resp.data);
              } catch(e) {
                console.log(e);
              }
        
            };
        getDevices();
        getGroups();
        }, []);     

    const columns=[
        {title:'Name', field:'name'},
        {title:'IP', field:'ip'},
        {title:'Mac', field:'mac'},
        {title:'Distribution', field:'distribution'},
        {title:'Version', field:'version'}
    ]

    const groupColumns=[
      {title:'Name', field:'name'},

  ]

    return(
        <div>
          <div></div>
            <MaterialTable title="Devices"
              data={devices}
              columns={columns}
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
                                  const resp = await axios({
                                    method: 'post',
                                    url : 'http://0.0.0.0:5000/api/groups',
                                    data: JSON.stringify(addRequest),
                                    headers: { "Content-Type": "application/json" },
                                  })
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
                                  const resp = await axios({
                                    method: 'post',
                                    url : 'http://0.0.0.0:5000/api/groups',
                                    data: JSON.stringify(updateRequest),
                                    headers: { "Content-Type": "application/json" },
                                  })
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
                                    const resp = await axios({
                                      method: 'post',
                                      url : 'http://0.0.0.0:5000/api/groups',
                                      data: JSON.stringify(delete_request),
                                      headers: { "Content-Type": "application/json" },
                                    })
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
                    />
        </div>
        
    )
}

export default Devices