import React from 'react'
import {Link} from 'react-router-dom'

function NavBar(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Devices">Devices</Link></li>
            <li><Link to="/Monitoring">Monitoring</Link></li>
            <li><Link to="/FileUpload">Upload File</Link></li>
        </ul>
    );
}

export default NavBar