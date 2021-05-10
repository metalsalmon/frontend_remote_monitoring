import React from 'react'
import ManageApp from "../Components/GroupManagement/ManageApp";
import GroupPackageTable from '../Components/GroupManagement/GroupPackageTable';
import GroupDeviceTable from '../Components/GroupManagement/GroupDeviceTable'

const GroupManagement = () =>{
        
    return(
        <div>
            <h1>Group management</h1>
            <GroupDeviceTable/>

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