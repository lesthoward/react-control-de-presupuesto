import React, { useState, useEffect } from 'react';
const BudgetListFilter = ({filter, setFilter}) => {
    return (  
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label htmlFor="name">Filtrar gastos</label>
                    <select
						name="category"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
					>
						<option value="">-- Seleccione una opcion --</option>
						<option value="salud">Salud</option>
						<option value="ahorro">Ahorro</option>
						<option value="alimentacion">Alimentacion</option>
						<option value="vivienda">Vivienda</option>
						<option value="ocio">Ocio</option>
						<option value="suscripciones">Suscripciones</option>
						<option value="otros">Otros</option>
					</select>
                </div>
            </form>
        </div>
    );
}
 
export default BudgetListFilter;