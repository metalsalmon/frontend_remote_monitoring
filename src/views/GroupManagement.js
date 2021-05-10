import React from 'react'
import ManageApp from "../Components/GroupManagement/ManageApp";
import GroupPackageTable from '../Components/GroupManagement/GroupPackageTable';
import GroupDeviceTable from '../Components/GroupManagement/GroupDeviceTable'
import { Box } from "@material-ui/core";


const GroupManagement = () =>{
        
    return(
        <div>
            <h1>Group management</h1>
            <GroupDeviceTable/>
            <Box m={3} />
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