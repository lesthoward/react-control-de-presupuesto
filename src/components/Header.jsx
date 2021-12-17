import BudgetForm from "./BudgetForm";
import BudgetResume from "./BudgetResume";
const Header = ({ 
    budget, 
    setBudget, 
    isValidBudget, 
    setIsValidBudget,
    expenses,
    setExpenses,
    }) => {

    return (
		<header>
			<h1>Control de Presupuesto</h1>
			{isValidBudget ? (
				<BudgetResume
					budget={budget}
                    setBudget={setBudget}
					expenses={expenses}
					setExpenses={setExpenses}
					setIsValidBudget={setIsValidBudget}
				/>
			) : (
				<BudgetForm
					budget={budget}
					setBudget={setBudget}
					setIsValidBudget={setIsValidBudget}
				/>
			)}
		</header>
	);
}
 
export default Header;