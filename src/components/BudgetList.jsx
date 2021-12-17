import BudgetItem from './BudgetItem';

const BudgetList = ({
	expenses,
	setSpending,
	handleDeleteSpending,
	filter,
    filteredExpenses,
}) => {
    const conditionalExpenses = filter ? filteredExpenses : expenses;

	return (
		<div className="listado-gastos contenedor">
			<h2>
				{expenses.length
					? 'Listado de gastos'
					: 'Comience añadiendo gastos...'}
			</h2>
			<p className="listado-dialogo">
				Deslice el cajón del gasto para editar o eliminar
			</p>
			{conditionalExpenses.map((spending) => (
				<BudgetItem
					key={spending.id}
					spending={spending}
					setSpending={setSpending}
					handleDeleteSpending={handleDeleteSpending}
				/>
			))}

            {
                filter && !filteredExpenses.length && (
                    <p className="listado-dialogo no-gastos-enfatizar">Sin gastos para esta categoría</p>
                )
            }
		</div>
	);
};

export default BudgetList;
