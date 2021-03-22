import React from 'react'
import { Button, Icon, TextField, Paper, Typography, InputLabel, Select, MenuItem } from "@material-ui/core";
import InstallAppFormSubmit from "./InstallAppFormSubmit";
import DeviceDropdown from "./DeviceDropdown"
import PackageTable from './PackageTable';


const handleInput = () => {
    console.log("omg")
  };

const Management = () =>{
    
        
    return(
        <div>
            <h1>Management page</h1>
            _{/*<DeviceDropdown/>*/}

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