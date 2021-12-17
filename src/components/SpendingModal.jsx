import { useEffect, useState } from 'react';
import IconClose from '../icons/cerrar.svg';
import Message from './Message';

const SpendingModal = ({ setSpendingModal, handleSpending, spending, setSpending }) => {
	const [formValues, setFormValues] = useState({
		name: '',
		amount: '',
		category: '',
	});
	const [message, setMessage] = useState('');

	const hideModal = () => {
        const form = document.querySelector('.formulario');
		form.style.animation = 'fadeOut .5s reverse forwards';
		setTimeout(() => {
            setSpendingModal(false);
            setSpending({});
		}, 600);
	};

	const convertToNumber = (e) => {
		const inputNames = ['amount'];
		if (inputNames.includes(e.target.name)) {
			return Number(e.target.value);
		}
		return e.target.value.trim();
	};

	const handleChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: convertToNumber(e),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.values(formValues).includes('') || formValues.amount === 0) {
			setMessage('Todos los campos son obligatorios');
			setTimeout(() => {
				setMessage('');
			}, 2000);
			return;
		}
		setMessage('');
		hideModal(false);
		handleSpending(formValues);
	};

    useEffect(() => {
        if (Object.keys(spending).length) {
            setFormValues(spending);
        }
    }, [spending]);

	return (
		<div className="modal">
			<form
				className="formulario formulario-animar"
				onSubmit={handleSubmit}
			>
				<legend>{spending.id ? 'Editar gasto' : 'Crear gasto'}</legend>
				{message && <Message type="error">{message}</Message>}
				<div className="campo">
					<label htmlFor="name">Nombre</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Ej. Transporte"
						onChange={handleChange}
                        value={formValues.name}
					/>
				</div>

				<div className="campo">
					<label htmlFor="amount">Cantidad</label>
					<input
						type="number"
						id="amount"
						name="amount"
						placeholder="Ej. 300"
						onChange={handleChange}
                        value={formValues.amount}
					/>
				</div>

				<div className="campo">
					<label htmlFor="category">Categoria</label>
					<select
						name="category"
						id="category"
						onChange={handleChange}
                        value={formValues.category}
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

				<input type="submit" value={spending.id ? 'Guardar cambios' : 'Añadir gasto'} />
			</form>

			<div className="cerrar-modal" onClick={hideModal}>
				<img
					src={IconClose}
					alt="Icono de cerrar formulario de gasto"
				/>
			</div>
		</div>
	);
};

export default SpendingModal;
