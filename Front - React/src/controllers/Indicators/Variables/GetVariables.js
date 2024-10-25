import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem('access_token');

export const GetVariables = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/variables`, {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}

export const GetVariablesbyIndicators = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/variables/getvariables`, {
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener los vehículos:', error.message);
  }
}

export const VariablesbyId = async (valor_indicador) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/variables/variablesbyid`, {
      params: { valor_indicador }, // Enviar valor_indicador como parámetro de consulta
      headers: {
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de la solicitud
      }
    });
    return response.data;
  } catch (error) {
    Swal.fire('Error al obtener las variables:', error.message);
  }
}

