import React from "react";

const InspectionVehicule = ({ formData, handleChange }) => {
  return (
    <fieldset className="mb-6 p-4 border rounded-lg shadow-md">
      <legend className="text-xl font-bold text-indigo-600 mb-4">Datos del Vehículo</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="mb-6">
          <label htmlFor="tipoVehiculo" className="block text-gray-700 font-semibold mb-2">Tipo de Vehículo:</label>
          <input
            type="text"
            id="tipoVehiculo"
            name="tipoVehiculo"
            value={formData.tipoVehiculo}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="placa" className="block text-gray-700 font-semibold mb-2">Placa:</label>
          <input
            type="text"
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="marca" className="block text-gray-700 font-semibold mb-2">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="dependencia" className="block text-gray-700 font-semibold mb-2">Dependencia:</label>
          <input
            type="text"
            id="dependencia"
            name="dependencia"
            value={formData.dependencia}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="kilometraje" className="block text-gray-700 font-semibold mb-2">Kilometraje:</label>
          <input
            type="number"
            id="kilometraje"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="soat" className="block text-gray-700 font-semibold mb-2">SOAT:</label>
          <input
            type="text"
            id="soat"
            name="soat"
            value={formData.soat}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="rtm" className="block text-gray-700 font-semibold mb-2">RTM:</label>
          <input
            type="text"
            id="rtm"
            name="rtm"
            value={formData.rtm}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="seguroContractual" className="block text-gray-700 font-semibold mb-2">Seguro Contractual:</label>
          <input
            type="text"
            id="seguroContractual"
            name="seguroContractual"
            value={formData.seguroContractual}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="seguroExtracontractual" className="block text-gray-700 font-semibold mb-2">Seguro Extracontractual:</label>
          <input
            type="text"
            id="seguroExtracontractual"
            name="seguroExtracontractual"
            value={formData.seguroExtracontractual}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
    </fieldset>
  );
};

export default InspectionVehicule;
