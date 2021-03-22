import './App.css';
import Monitoring from './views/Monitoring'
import FileUpload from './views/FileUpload'
import Management from './Components/Management'
import Devices from './views/Devices'
import Home from './Components/Home'
import {Route, Link} from 'react-router-dom'
import Drawer from "./Components/Drawer"


function App() {
  return (
    <div className='App'>
      <Drawer>
        <Route exact path="/" component={Home} />
        <Route exact path="/Devices" component={Devices}/>
        <Route exact path="/FileUpload" component={FileUpload} />
        <Route exact path="/Monitoring" component={Monitoring} />
        <Route exact path="/Management/:mac" component={Management} />
      </Drawer>
    </div>

  );
}

export default App;
