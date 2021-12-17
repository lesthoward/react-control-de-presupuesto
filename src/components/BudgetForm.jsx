import { useState } from 'react';
import Message from './Message';
const BudgetForm = ({budget, setBudget, setIsValidBudget}) => {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!budget || budget <= 0) {
            return setMessage('Formato de presupuesto incorrecto');
        }

        setMessage('');
        setIsValidBudget(true);
    }

    return (
		<div className="contenedor-presupuesto contenedor sombra">
			<form className="formulario" onSubmit={handleSubmit}>
				<div className="campo">
					<label htmlFor="">Dirija su presupuesto</label>
					<input
						type="number"
						className="nuevo-presupuesto"
						placeholder="$ Cifra"
						
						onChange={(e) => setBudget(Number(e.target.value))}
					/>
				</div>

				<input type="submit" value="Añadir"/>
				{message && <Message type="error">{message}</Message>}
			</form>
		</div>
	);
}
 
export default BudgetForm;