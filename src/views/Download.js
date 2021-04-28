import React from 'react'
import DownloadAgentForm from "../Components/DownloadAgentForm";
import PackageTable from '../Components/PackageTable';
import DeviceInfo from '../Components/DeviceInfo'

const Download = () =>{
    
        
    return(
         <div>
            <h1></h1>

            <div className="App">
                <DownloadAgentForm
                    formName="Download agent"
                />
            </div>
        </div>
        
    );
}

export default Download