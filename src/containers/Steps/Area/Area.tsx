import React from 'react';
import validator from 'validator';

import { useForm, useLocalStorage, useHotels } from 'hooks';
import { Portlet, Button, } from 'components';

import formClasses from 'components/Form/Form.module.scss';

let afterTwoDays: string | Date = new Date();
afterTwoDays.setDate(afterTwoDays.getDate() + 1);
afterTwoDays = afterTwoDays.toString();

const step: TypeStep = {
    index: 2,
    isValid: true,
    inputs: {
        date: {
            value: 'Villani Trattoria',
            isTouched: false,
            isValid: true
        }
    }
};

const Area: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);
    
	const handleSubmit = (areaName: string) => {
		inputHandler('area', areaName, true);
		props.stepChangeHandler(step.index, formState, step.index + 1, { area: areaName });
		setLocalStorageValue({
			area: areaName
		});
	}

    return (
        <Portlet>	
			<h2>Select the area</h2>

			<form onSubmit={(e) => e.preventDefault()} style={{ 
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				gap: '0.5em',
				width: '100%' }}
			>
				<Button 
					type="submit"
					width="20rem"
					height="7rem"
					onClick={() => handleSubmit('Villani Trattoria')}>
					<h2>Villani Trattoria</h2>
				</Button>
				
				<Button 
					type="submit"
					width="20rem"
					height="7rem"
					onClick={() => handleSubmit('Villani Osteria')}>
					<h2>Villani Osteria</h2>
				</Button>
			</form>
        </Portlet>
    );
};

export default Area;
