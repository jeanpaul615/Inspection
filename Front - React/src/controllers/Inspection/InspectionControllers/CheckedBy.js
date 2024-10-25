import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../../containers/Api"; 

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem("access_token"); // O sessionStorage.getItem('authToken')

export const CheckedBy = async (data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/inspection/checkedby`,
      {
        checked_by: data.auditor, 
        inspection_id: data.row.inspection_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
          "Content-Type": "application/json" // Ensure Content-Type is JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire("Error al obtener los vehículos:", error.message);
  }
};
