import { formatDate } from '../helpers/index.helpers';
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoComida from '../icons/icono_comida.svg';
import IconoGastos from '../icons/icono_gastos.svg';
import IconoOcio from '../icons/icono_ocio.svg';
import IconoSalud from '../icons/icono_salud.svg';
import IconoSuscripciones from '../icons/icono_suscripciones.svg';
import IconoAhorro from '../icons/icono_ahorro.svg';
import IconoCasa from '../icons/icono_casa.svg';

const iconList = {
	salud: IconoSalud,
	ahorro: IconoAhorro,
	alimentacion: IconoComida,
	ocio: IconoOcio,
	suscripciones: IconoSuscripciones,
	vivienda: IconoCasa,
	otros: IconoGastos,
};

const BudgetItem = ({ spending, setSpending, handleDeleteSpending }) => {
	const { id, amount, category, name, date } = spending;
	const leadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={() => setSpending(spending)}>
				Editar
			</SwipeAction>
		</LeadingActions>
	);

	const trailingActions = () => (
		<TrailingActions>
			<SwipeAction
				onClick={() => handleDeleteSpending(id)}
				destructive={true}
			>
				Eliminar
			</SwipeAction>
		</TrailingActions>
	);
	return (
		<SwipeableList>
			<SwipeableListItem
				leadingActions={leadingActions()}
				trailingActions={trailingActions()}
			>
				<div className="gasto sombra">
					<div className="contenido-gasto">
						<img src={iconList[category]} alt={category} />

						<div className="descripcion-gasto">
							<div className="categoria">{category}</div>
							<div className="nombre-gasto">{name}</div>
							<div className="fecha-gasto">
								Creado en:
								<span> {formatDate(date)}</span>
							</div>
						</div>
					</div>

					<p className="cantidad-gasto">{amount}</p>
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
};

export default BudgetItem;
