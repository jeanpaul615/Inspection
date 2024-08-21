import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { GetNameIndicators } from "../../../controllers/Indicators/Indicators/GetIndicators";
import { VariablesbyId } from "../../../controllers/Indicators/Variables/GetVariables";
import { NewVariables } from "../../../controllers/Indicators/Variables/NewVariables";
import { NewIndicators } from "../../../controllers/Indicators/Indicators/NewIndicators";
import { VerifyIndicator } from "../../../controllers/Indicators/Indicators/VerifyIndicator";

import CalculateIndicator from "./CalculateIndicator"; // Make sure the path is correct
import Swal from "sweetalert2";

/**
 * InputModal Component
 * El componente InputModal se encarga de desplegar un form el cual permite elegir un indicador,
 * listar las variables relacionadas, mostrar el valor del indicador y su periodicidad.
 * -Hace un fetch para traer los indicadores, tambien trae las variables
 * -Hace el llamado del consumo de la API para agregar las variables y indicadores a la base de datos.
 */

const InputModal = ({ isOpen, onRequestClose }) => {
  const [variables, setVariables] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [inputs, setInputs] = useState({});
  const [period, setPeriod] = useState("");
  // eslint-disable-next-line
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const fetchedIndicators = await GetNameIndicators();
        setIndicators(fetchedIndicators || []);
      } catch (error) {
        console.error("Error fetching indicators:", error);
      }
    };

    fetchIndicators();
  }, []);

  useEffect(() => {
    const fetchVariables = async () => {
      if (selectedIndicator) {
        try {
          const indicatorId = indicators.find(
            (ind) => ind.nombre_indicador === selectedIndicator
          )?.id_indicador;
          if (indicatorId) {
            const fetchedVariables = await VariablesbyId(indicatorId);
            setVariables(fetchedVariables || []);
          }
        } catch (error) {
          console.error("Error fetching variables:", error);
        }
      }
    };

    fetchVariables();
  }, [selectedIndicator, indicators]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = (calculatedValue) => {
    setValue(calculatedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedIndicatorId || !period) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, selecciona un indicador y un periodo.",
      });
    }
  
    // Obtener la periodicidad del indicador seleccionado
    const indicator = indicators.find(
      (ind) => ind.id_indicador === selectedIndicatorId
    );
    const periodicidad = indicator ? indicator.frecuencia : "";
  
    // Extraer el mes y año de la fecha seleccionada
    const periodDate = new Date(period);
    const selectedMonth = periodDate.getMonth() + 1; // +1 porque getMonth() es 0-indexado
  
    // Validar la fecha según la periodicidad
    const isValidDate = (periodicidad) => {
      switch (periodicidad) {
        case "anual":
          // Solo enero para anual
          return selectedMonth === 1; // Solo enero
        case "semestral":
          return selectedMonth === 6 || selectedMonth === 12; // Solo junio y diciembre
        case "trimestral":
          return [3, 6, 9, 12].includes(selectedMonth); // Solo marzo, junio, septiembre, diciembre
        case "mensual":
          return true; // Todos los meses
        default:
          return false; // Periodicidad no válida
      }
    };
  
    if (!isValidDate(periodicidad)) {
      return Swal.fire({
        icon: "error",
        title: "Fecha Inválida",
        html: `La fecha seleccionada no es válida para un indicador de periodicidad <strong>${periodicidad}</strong>.<br><br>
          Si es anual: <strong>Enero</strong><br>
          Si es semestral: <strong>Junio-Diciembre</strong><br>
          Si es trimestral: <strong>Marzo, Junio, Septiembre, Diciembre</strong>`,
      });
    }
  
    try {
      // Verificar si el indicador ya existe para el período seleccionado
      const existingIndicator = await VerifyIndicator({
        indicador_id: selectedIndicatorId,
        periodo_inicio: periodDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      });
  
      if (existingIndicator && existingIndicator.exists) {
        // Si el indicador ya existe, mostrar una alerta y no proceder con el submit
        return Swal.fire({
          icon: "warning",
          title: "Indicador Existente",
          text: "El indicador ya está registrado para el período seleccionado.",
        });
      }
  
      // Preparar datos para enviar
      const requests = Object.keys(inputs).map(async (variableName) => {
        const variable = variables.find((v) => v.nombre === variableName);
        if (variable) {
          const variableId = variable.id_variable;
          const valor = inputs[variableName];
  
          // Enviar datos de la variable al servidor
          await NewVariables({
            indicador_id: selectedIndicatorId,
            variable_id: variableId,
            valor: valor,
            periodo: period,
          });
        }
      });
  
      // Esperar que todas las solicitudes se completen
      await Promise.all(requests);
  
      // También puedes enviar el indicador si es necesario
      await NewIndicators({
        indicador_id: selectedIndicatorId,
        valor: value,
        periodo_inicio: periodDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      });
  
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Los datos se han guardado correctamente.",
      });
  
      // Limpiar el formulario
      setInputs({});
      setSelectedIndicator("");
      setPeriod("");
      setValue("");
  
      onRequestClose();
    } catch (error) {
      console.error("Error al guardar datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se logró insertar la variable o el indicador.",
      });
    }
  };
  

  const selectedIndicatorId = indicators.find(
    (ind) => ind.nombre_indicador === selectedIndicator
  )?.id_indicador;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="md:pl-28 lg:pl-28 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      contentLabel="Input Modal"
      ariaHideApp={false}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl mx-auto relative">
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close modal"
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
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Registrar Indicador
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {variables.length > 0 ? (
                variables.map((variable, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      {`${variable.nombre}:`}
                    </label>
                    <input
                      type="number"
                      name={variable.nombre}
                      value={inputs[variable.nombre] || ""}
                      onChange={handleChange}
                      required
                      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                ))
              ) : (
                <p>No hay variables</p>
              )}
              <CalculateIndicator
                variables={Object.keys(inputs).map((key) => ({
                  nombre: key,
                  value: inputs[key],
                }))}
                id_indicador={selectedIndicatorId}
                onCalculate={handleCalculate}
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Nombre del indicador:
                </label>
                <select
                  value={selectedIndicator}
                  onChange={(e) => setSelectedIndicator(e.target.value)}
                  required
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Seleccionar indicador</option>
                  {indicators.length > 0 ? (
                    indicators.map((indicator) => (
                      <option
                        key={indicator.id_indicador}
                        value={indicator.nombre_indicador}
                      >
                        {`${indicator.nombre_indicador} (${indicator.frecuencia})`}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay indicadores disponibles</option>
                  )}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Fecha de Inicio:
                </label>
                <input
                  type="date"
                  name="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  required
                  className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default InputModal;
