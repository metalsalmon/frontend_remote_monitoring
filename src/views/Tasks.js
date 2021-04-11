import React from 'react'
import TasksTable from '../Components/TasksTable';
import DeviceInfo from '../Components/DeviceInfo'

const Tasks = () =>{
    
        
    return(
        <div>
            <h1>Executed tasks</h1>
            {/*<DeviceInfo/>*/}
            {/*<DeviceDropdown/>*/}

            <TasksTable/>
        </div>
        
    );
}

export default Tasks