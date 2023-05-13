import logo from './logo.svg';
import './App.css';
import API_URL from "./common/APIurl";
import React, {useEffect,useState} from "react";

function App() {

  const [state, setState] = useState([{}])
  useEffect(() => {
    fetch(`${API_URL}/api`)
        .then(res => res.json())
        .then(data => {
      setState(data)
    })
  },[])
  return (
    <div className="App">
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
