import axios from "axios";
import Swal from "sweetalert2";

// Asegúrate de tener un token almacenado después de iniciar sesión
const token = localStorage.getItem("access_token");

export const NewVariables = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/variables/register",
      data, // Enviar los datos en el cuerpo de la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado de la solicitud
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire("Error al registrar la variable", error.message, "error");
  }
};