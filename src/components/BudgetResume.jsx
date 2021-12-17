import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
const BudgetResume = ({
	budget,
	expenses,
	setIsValidBudget,
	setBudget,
	setExpenses,
}) => {
	const [available, setAvailable] = useState(0);
	const [spent, setSpent] = useState(0);
	const [percent, setPercent] = useState(0);

	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const handleEditBudget = () => {
		setIsValidBudget(false);
	};

    const handleResetData = () => {
        const confirmMessage = confirm('¿Seguro que quieres reiniciar los datos?')
        if(!confirmMessage) return

        setBudget(0);
        setExpenses([]);
        setIsValidBudget(false);
    }

	useEffect(() => {
		const totalExpenses = expenses.reduce(
			(total, spending) => spending.amount + total,
			0
		);
		const availableBudget = budget - totalExpenses;
		setSpent(totalExpenses);
		setAvailable(availableBudget);

		const percentSpent = ((totalExpenses * 100) / budget).toFixed(2);
		setTimeout(function () {
			setPercent(percentSpent);
		}, 500);
	}, [expenses]);
	return (
		<div className="contenedor-presupuesto contenedor sombra">
			<div className="dos-columnas nuevo-contenedor-presupuesto">
				<div className="contenedor-svg">
					<CircularProgressbar
						value={percent}
						styles={{
							path: {
								stroke: percent < 100 ? '#00a680' : '#ff0000',
								transition: 'stroke-dashoffset 0.5s ease 0s',
								transform: 'rotate(0.25turn)',
								transformOrigin: 'center center',
							},
							trail: { stroke: 'gainsboro' },
							text: {
								fill: '#333',
								fontWeight: 'bold',
								textAnchor: 'middle',
								dominantBaseline: 'central',
							},
						}}
						text={`${percent}% Gastado`}
					/>
				</div>

				<div className="contenido-presupuesto">
                    <button className='reset-app' onClick={handleResetData}>Restablecer datos</button>
                    <button className="reset-app" onClick={handleEditBudget}>
                        Cambiar mi presupuesto
                    </button>
					<p>
						<span>Presupuesto: </span>
						{formatCurrency(budget)}
					</p>
					<p className={available < 0 ? 'negativo' : ''}>
						<span>Disponible: </span>
						{formatCurrency(available)}
					</p>
					<p>
						<span>Gasto: </span>
						{formatCurrency(spent)}
					</p>
				</div>
			</div>
		</div>
	);
};
 
export default BudgetResume;