import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";

const TasksTable = () =>{

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const resp  = await axios.get('http://127.0.0.1:5000/api/tasks');
                
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