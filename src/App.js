import React, {useState} from 'react';
import './App.css';
import Monitoring from './views/Monitoring'
import Tasks from './views/Tasks'
import Management from './views/Management'
import GroupManagement from './views/GroupManagement'
import Download from './views/Download'
import Devices from './views/Devices'
import {Route} from 'react-router-dom'
import Drawer from "./Components/Drawer"
import Events from "./Components/WS/Events"
import { Context } from './Components/Context';
import{ useEffect } from 'react';


function App() {
  const [context, setContext] = useState("default context value");
  useEffect(() => {
    document.title = "Monitoring and management"
  }, [])
  return (
    <div className='App'>
      <Context.Provider value={[context, setContext]}>
        <Events />
        <Drawer>
          <Route exact path="/" component={Devices} />
          <Route exact path="/Devices" component={Devices}/>
          <Route exact path="/Tasks" component={Tasks} />
          <Route exact path="/Monitoring" component={Monitoring} />
          <Route exact path="/Management/:mac" component={Management} />
          <Route exact path="/GroupManagement/:group" component={GroupManagement} />
          <Route exact path="/Download" component={Download} />
        </Drawer>
      </Context.Provider>
    </div>

  );
}

export default App;
