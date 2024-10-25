import React, { useState } from "react";
import Swal from "sweetalert2";
import { NewVehicle } from "../../../controllers/Inspection/VehicleControllers/NewVehicle";
import { motion } from "framer-motion";

const ModalNewVehicle = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    type: "",
    license_plate: "",
    brand: "",
    area: "",
    soat_until: "",
    rtm_until: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newVehicleData = await NewVehicle(formData);
      if (newVehicleData) {
        Swal.fire({
          title: 'Éxito',
          text: 'Vehículo agregado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        onClose();
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `No se pudo agregar el vehículo.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!isOpen) return null; // Si el modal no está abierto, no mostrar nada

  return (
    <motion.div
className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
>
<motion.div
  className="rounded-xl w-11/12 md:w-1/3"
  initial={{ y: "-50vh" }}
  animate={{ y: "0" }}
  exit={{ y: "50vh" }}
>
    <div
      className="z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={onClose} // Cerrar al hacer clic fuera del modal
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-4xl mx-auto z-60"
        onClick={(e) => e.stopPropagation()} // Evitar que el clic se propague y cierre el modal
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Cerrar modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex justify-center items-center mb-4">
          <span className="text-lg font-semibold">Nuevo Vehículo:</span>
        </div>

        <hr className="border-gray-400 opacity-50 pt-2 mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            {/* Input fields in rows */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700">
                  Tipo (*):
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="RECOLECTOR">RECOLECTOR</option>
                  <option value="VOLQUETA">VOLQUETA</option>
                  <option value="LIVIANO">LIVIANO</option>
                  <option value="CAMION">CAMIÓN</option>
                  <option value="CAMIONETA">CAMIONETA</option>
                  <option value="MOTO">MOTO</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700">
                  Placa (*):
                </label>
                <input
                  type="text"
                  name="license_plate"
                  value={formData.license_plate}
                  onChange={handleChange}
                  required
                  maxLength="6"
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
            </div>

            {/* More input fields */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700">
                  Marca (*):
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="mb-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700">
                  Área:
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                >
                  <option value="">Seleccione un área</option>
                  <option value="ASEO">ASEO</option>
                  <option value="ACUEDUCTO">ACUEDUCTO</option>
                  <option value="ALCANTARILLADO">ALCANTARILLADO</option>
                  <option value="OTRO">OTRO</option>
                </select>
              </div>
            </div>

            {/* More inputs */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700">
                  SOAT hasta (*):
                </label>
                <input
                  type="date"
                  name="soat_until"
                  value={formData.soat_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-medium font-medium text-gray-700">
                  RTM hasta (*):
                </label>
                <input
                  type="date"
                  name="rtm_until"
                  value={formData.rtm_until}
                  onChange={handleChange}
                  required
                  className="mb-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                />
              </div>
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 text-center transition ease-in-out duration-150"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
    
    </motion.div>
  </motion.div>
  );
};

export default ModalNewVehicle;
