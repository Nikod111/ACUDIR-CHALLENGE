import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Personas from './Pages/Personas';
import AgregarPersona from './Pages/AgregarPersona';
import EditarPersona from './Pages/EditarPersona';

function App() {
    return (
        <Router>
            <nav style={{ padding: '1rem', background: '#eee' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>Personas</Link>
                <Link to="/agregar">Agregar Persona</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Personas />} />
                <Route path="/agregar" element={<AgregarPersona />} />
                <Route
                    path="/EditarPersona/:id/:nombre/:apellido/:email/:edad"
                    element={<EditarPersona />}
                />
            </Routes>
        </Router>
    );
}

export default App;

