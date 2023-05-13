import logo from './logo.svg';
import './App.css';
import API_URL from "./common/APIurl";
import {BrowserRouter} from 'react-router-dom'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import React, {useEffect,useState} from "react";

function App() {

  const [state, setState] = useState([{}])
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    fetch(`${API_URL}/api`)
        .then(res => res.json())
        .then(data => {
      setState(data)
    })
  },[])
  return (
    <div className="App">
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <p>Dialog</p>
      </Dialog>

      <Button label="Show" onClick={() => setVisible(true)} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {(typeof state.users === "undefined") ? <div>loading...</div> : <div>display data from server: {state.users.map((user) => (
            <div>
              {user}
            </div>
        ))}</div>}

      </header>
    </div>
  );
}

export default App;
