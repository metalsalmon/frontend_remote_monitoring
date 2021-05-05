import React from 'react'
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import ManageApp from "../Components/GroupManagement/ManageApp";
import GroupPackageTable from '../Components/GroupManagement/GroupPackageTable';
import GroupDevicesInfo from '../Components/GroupManagement/GroupDevicesInfo'

const GroupManagement = () =>{
        
    return(
        <div>
            <h1>Group management</h1>
            <GroupDevicesInfo/>

            <div className="App">
                <ManageApp
                    formName="Manage app"
                />
            </div>

            <GroupPackageTable/>
        </div>
        
    );
}

export default GroupManagement