import React from "react";


/**
 * FilterControls Component
 * El componente FilterControls se encarga de filtrar la tabla, en base a el Mes, Año, Periodicidad del indicador,
 *  ademas de manejar el boton que el boton que despliega el form para ingresar nuevos datos.
 */
const FilterControls = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  selectedFrequency,
  setSelectedFrequency,
  openModal,
}) => {
  return (
    <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <select
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center w-full md:w-auto"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Todos los meses</option>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>

      <select
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center w-full md:w-auto"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Todos los años</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      <select
        className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center w-full md:w-auto"
        value={selectedFrequency}
        onChange={(e) => setSelectedFrequency(e.target.value)}
      >
        <option value="">Todas las frecuencias</option>
        <option value="mensual">Mensual</option>
        <option value="trimestral">Trimestral</option>
        <option value="semestral">Semestral</option>
        <option value="anual">Anual</option>
      </select>

      <div className="flex-1 text-right md:text-left">
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-gray-800 text-white focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center w-full md:w-auto"
        >
          Ingresar Datos
        </button>
      </div>
    </div>
  );
};

export default FilterControls;