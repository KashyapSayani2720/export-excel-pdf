import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Route, Routes } from 'react-router-dom';
import  CheckAccuracy from './components/CheckAccuracy.jsx';
import Root from './components/Root.jsx';
import Dashboard from './components/dashbaord/Dashboard.jsx';
import DaybookReport from './components/dashbaord/DaybookReport.jsx';
import SalesReport from './components/dashbaord/SalesReport.jsx';

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
                 <Route
                    path="/dashboard/sales-report"
                    element={
                        <SalesReport/>
                    }
                />
                 <Route
                    path="/dashboard/daybook-report"
                    element={
                        <DaybookReport/>
                    }
                />
            </Routes>
           
        </>
    );
}

export default App;
