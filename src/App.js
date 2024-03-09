import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Route, Routes } from 'react-router-dom';
import  CheckAccuracy from './components/CheckAccuracy.jsx';
import Root from './components/Root.jsx';
import Dashboard from './components/dashbaord/Dashboard.jsx';

function App() {

    return (
        <>    
            <Routes>
                <Route
                    path="/"
                    element={
                        <Root/>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard/>
                    }
                />
                <Route
                    path="/check-accuracy"
                    element={
                        <CheckAccuracy/>
                    }
                />
            </Routes>
           
        </>
    );
}

export default App;
