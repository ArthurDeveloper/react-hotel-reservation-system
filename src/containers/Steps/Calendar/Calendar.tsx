import React from 'react';
import validator from 'validator';

import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../lib/styles/calendar.scss';

import { useForm, useLocalStorage, useHotels } from 'hooks';
import { Portlet, Button, } from 'components';

import formClasses from 'components/Form/Form.module.scss';

let afterTwoDays: string | Date = new Date();
afterTwoDays.setDate(afterTwoDays.getDate() + 1);
afterTwoDays = afterTwoDays.toString();

const step: TypeStep = {
    index: 1,
    isValid: true,
    inputs: {
        date: {
            value: new Date().toString(),
            isTouched: false,
            isValid: false
        }
    }
};

const Calendar: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);
    
    return (
        <Portlet>	
			<form onSubmit={(e) => e.preventDefault()}>
				<ReactCalendar onChange={(date: Date) => {
					console.log(date);
					inputHandler('calendar', date.toString(), true);
					console.log('monke');

					props.stepChangeHandler(step.index, formState, step.index + 1);
					setLocalStorageValue({
						...step,
						isValid: formState.isValid,
						inputs: { ...formState.inputs }
					});
				}} minDate={new Date()} />
			</form>
        </Portlet>
    );
};

export default Calendar;
