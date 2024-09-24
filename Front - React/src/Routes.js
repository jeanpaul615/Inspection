import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';
import MainDashboard from './components/Inspection/Dashboard/MainDashboard';
import InspectionForm from './components/Inspection/CheckInspection/Main/InspectionForm';
import DatatableInspection from './components/Inspection/ListInspection/Datatable';
import DatatableDrivers from './components/Inspection/Drivers/Datatable';
import DataTableIndicators from './components/Indicators/IndicatorsComponent/Datatable';
import DataTableVariables from './components/Indicators/Variables/Datatable';
import DatatableVehicles from './components/Inspection/Vehicle/Datatable';
import Register from './components/LogIn/Register/Register';
import ResetPassword from './components/LogIn/ResetPassword/ResetPassword';
import NewPassword from './components/LogIn/NewPassword/NewPassword';

/**
 * App Component
 *
 * El componente principal de la aplicación que configura las rutas y renderiza los diferentes componentes
 * basados en la ruta actual. Utiliza `react-router-dom` para manejar la navegación entre páginas.
 *
 * @returns {JSX.Element} El componente `App` con las rutas configuradas.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que renderiza el componente de Login */}
        <Route exact path='/' element={<Login />} />

        {/* Ruta para el registro de nuevos usuarios */}
        <Route exact path='/register' element={<Register />} />

        <Route exact path='/resetpassword' element={<ResetPassword />} />


        <Route exact path='/newpassword' element={<NewPassword />} />



        {/* Ruta para el panel de control principal */}
        <Route exact path='/dashboard' element={<MainDashboard />} />

        {/* Ruta para el formulario de inspección */}
        <Route exact path='/inspection' element={<InspectionForm/>} />

        {/* Ruta para la lista de inspección */}
        <Route exact path='/listinspection' element={<DatatableInspection />} />


        {/* Ruta para la tabla de conductores */}
        <Route exact path='/drivers' element={<DatatableDrivers />} />

        {/* Ruta para la tabla de indicadores */}
        <Route exact path='/indicators' element={<DataTableIndicators />} />

        {/* Ruta para la tabla de variables */}
        <Route exact path='/variables' element={<DataTableVariables />} />

        {/* Ruta para la tabla de vehículos */}
        <Route exact path='/vehicules' element={<DatatableVehicles />} />
      </Routes>
    </Router>
  );
}
