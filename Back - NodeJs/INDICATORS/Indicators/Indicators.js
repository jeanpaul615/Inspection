const db = require('../../config/db/connectionindicators');

const Indicator = {
    getAllIndicators: (callback) => {
        const query = 'SELECT id_indicador, nombre_indicador, frecuencia, valor, periodo_inicio FROM indicadores INNER JOIN registro_indicadores ON indicadores.id_indicador=registro_indicadores.indicador_id'; 

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, results); 
        });
    },
};

module.exports = Indicator;