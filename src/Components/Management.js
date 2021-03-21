import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import InstallAppFormSubmit from "./InstallAppFormSubmit";


const Management = () =>{

    const SearchButton = () => (
        <IconButton>
          <SearchIcon />
        </IconButton>
        )
        
    return(
        <div>
            <h1>Management page</h1>

            <div className="App">
                <InstallAppFormSubmit
                    formName="Install app"
                    //formDescription="This is sample form using Material UI."
                />
            </div>
        </div>
        
    );
}

export default Management