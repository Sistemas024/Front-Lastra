import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Formulario } from './componente/Formulario';
import { Home } from "./componente/Home";
import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={!user.length > 0 ? <Formulario setUser={setUser} /> : <Home user={user} setUser={setUser} />}
          />
          <Route
            path="/home"
            element={<Home user={user} setUser={setUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

