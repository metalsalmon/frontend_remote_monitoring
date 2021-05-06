import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";
import api from '../http-axios'

const TasksTable = () =>{

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const resp  = await api.get('/api/tasks');
                
                console.log(resp.data);
                setTasks(resp.data);
            } catch(e) {
                console.log(e);
            }
        };
        
        getTasks();
    }, []);        

    const columns=[
        {
            title:'Action', field:'action'

        },
        {
            title:'App', field:'app'
        },
        {
            title: 'Message', field: 'message'
        },
        {
            title: 'Done', field: 'done'
        },
        {
            title: 'Created', field: 'created_at'
        }
    ]


    return(
        <div>
            <MaterialTable title="Tasks"
            data={tasks}
            columns={columns}
            />
        </div>
    )
}

export default TasksTable