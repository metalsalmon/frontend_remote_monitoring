import React from 'react'
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import InstallAppFormSubmit from "../Components/InstallAppFormSubmit";
import PackageTable from '../Components/PackageTable';
import DeviceInfo from '../Components/DeviceInfo'

const Management = () =>{
    
        
    return(
        <div>
            <h1>Management</h1>
            <DeviceInfo/>
            {/*<DeviceDropdown/>*/}

            <div className="App">
                <InstallAppFormSubmit
                    formName="Install app"
                    //formDescription="This is sample form using Material UI."
                />
            </div>

            <PackageTable/>
        </div>
        
    );
}

export default Management