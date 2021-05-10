import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table'
import {useParams} from "react-router-dom";
import api from '../http-axios'
import { Context } from "./Context";

const TasksTable = () =>{

    const [tasks, setTasks] = useState([]);
    const [context, setContext] = useContext(Context);

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
    }, [context]);        

    const columns=[
        {
            title:'IP', field:'ip'

        },
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
            title: 'State', field: 'state'
        },
        {
            title: 'Done', field: 'done'
        },
        {
            title: 'Created', field: 'created_at'
        },
        {
            title: 'Finished', field: 'finished'
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