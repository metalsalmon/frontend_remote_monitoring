import './App.css';
import Monitoring from './views/Monitoring'
import FileUpload from './views/FileUpload'
import Management from './views/Management'
import Download from './views/Download'
import Devices from './views/Devices'
import Home from './Components/Home'
import {Route, Link} from 'react-router-dom'
import Drawer from "./Components/Drawer"
import Events from "./Components/WS/Events"


function App() {

  return (
    <div className='App'>
      <Events/>
      <Drawer>
        <Route exact path="/" component={Home} />
        <Route exact path="/Devices" component={Devices}/>
        <Route exact path="/FileUpload" component={FileUpload} />
        <Route exact path="/Monitoring" component={Monitoring} />
        <Route exact path="/Management/:mac" component={Management} />
        <Route exact path="/Download" component={Download} />
      </Drawer>
    </div>

  );
}

export default App;
