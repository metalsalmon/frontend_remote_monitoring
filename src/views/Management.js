import React from 'react'
import DeviceManagementBar from "../Components/DeviceManagementBar";
import PackageTable from '../Components/PackageTable';
import DeviceInfo from '../Components/DeviceInfo'

const Management = () =>{
    
        
    return(
        <div>
            <h1>Management</h1>
            <DeviceInfo/>
            {/*<DeviceDropdown/>*/}

            <div className="App">
                <DeviceManagementBar
                    formName="Manage app"
                    //formDescription="This is sample form using Material UI."
                />
            </div>

            <PackageTable/>
        </div>
        
    );
}

export default Management