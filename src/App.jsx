import React, { useEffect, useState } from 'react';
import IconAdd from './icons/add.png';
import { generateID } from './helpers/index.helpers';
import Header from "./components/Header";
import SpendingModal from './components/SpendingModal';
import BudgetList from './components/BudgetList';
import BudgetListFilter from './components/BudgetListFilter';

const App = () => {
    const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
    const initialBudget = localStorage.getItem('budget') ? JSON.parse(localStorage.getItem('budget')) : 0;

	const [budget, setBudget] = useState(initialBudget);
	const [isValidBudget, setIsValidBudget] = useState(false);
	const [spendingModal, setSpendingModal] = useState(false);
    const [expenses, setExpenses] = useState(initialExpenses);
    const [spending, setSpending] = useState({});
    const [filter, setFilter] = useState('');
    const [filteredExpenses, setFilteredExpenses] = useState([]);

	const handleSpendingModal = () => {
        setSpending({})
		setSpendingModal(true);
	}
    
    const handleSpending = (spendingObj) => {
        if(spendingObj.id) {
            const mappedExpenses = expenses.map((spending) => {
                if(spending.id === spendingObj.id) {
                    return spendingObj;
                } else {
                    return spending;
                }
            })
            setSpending({})
            return setExpenses(mappedExpenses);
        }

        spendingObj.id = generateID();
        spendingObj.date = Date.now()
        setExpenses([...expenses, spendingObj]);
    }

    const handleDeleteSpending = (id) => {
        const filteredExpenses = expenses.filter((spending) => spending.id !== id);
        setExpenses(filteredExpenses);
    }

    useEffect(() => {
        if(spending.id) {
            setSpendingModal(true)
        }
    }, [spending])

    useEffect(() => {
        if(expenses.length) {
            localStorage.setItem('expenses', JSON.stringify(expenses));
            localStorage.setItem('budget', budget);
            setIsValidBudget(true);
        } else {
            localStorage.removeItem('expenses');
            localStorage.removeItem('budget');
        }
    }, [expenses])

    useEffect(() => {
        if(filter) {
            const filteredExpenses = expenses.filter((spending) => spending.category === filter);
            console.log('file: App.jsx ~ line 69 ~ useEffect ~ filteredExpenses', filteredExpenses)
            setFilteredExpenses(filteredExpenses);
        }
    }, [filter]);

	return (
		<div>
			<Header
				budget={budget}
				setBudget={setBudget}
				isValidBudget={isValidBudget}
				setIsValidBudget={setIsValidBudget}
				expenses={expenses}
                setExpenses={setExpenses}
				setIsValidBudget={setIsValidBudget}
			/>

			{isValidBudget && (
				<>
					<main>
						<BudgetListFilter
							filter={filter}
							setFilter={setFilter}
						/>
						<BudgetList
							expenses={expenses}
							setSpending={setSpending}
							handleDeleteSpending={handleDeleteSpending}
							filter={filter}
							filteredExpenses={filteredExpenses}
						/>
					</main>
					<div className="nuevo-gasto" onClick={handleSpendingModal}>
						<img src={IconAdd} alt="Icono de nuevo gasto" />
					</div>
				</>
			)}

			{spendingModal && (
				<SpendingModal
					setSpendingModal={setSpendingModal}
					handleSpending={handleSpending}
					spending={spending}
					setSpending={setSpending}
				/>
			)}
		</div>
	);
}
 
export default App;