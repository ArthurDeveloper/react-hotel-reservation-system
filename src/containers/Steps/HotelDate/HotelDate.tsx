import React from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../lib/styles/calendar.scss';

import { useForm, useLocalStorage, useHotels } from 'hooks';
import { Portlet, Button, } from 'components';

import formClasses from 'components/Form/Form.module.scss';

let afterTwoDays: string | Date = new Date();
afterTwoDays.setDate(afterTwoDays.getDate() + 1);
afterTwoDays = afterTwoDays.toString();

const step: TypeStep = {
    index: 0,
    isValid: false,
    inputs: {
        guests: {
            value: '0',
            isTouched: false,
            isValid: false
        }
    }
};

const HotelDate: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);
    
    return (
        <Portlet>
			<h2>Select number of guests</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={formClasses['form__wide-row']}>
                                   </div>
                <div className={formClasses['form__wide-row-center']}>
					{new Array(10).fill(0).map((value, index) => index+1).map((value) => {
                    	return (
							<Button
                        		type="submit"
								onClick={() => {
									inputHandler('guests', value, true);
									props.stepChangeHandler(step.index, formState, step.index + 1);
									setLocalStorageValue({
										...step,
										isValid: true,
										inputs: { ...formState.inputs }
									});
								}}
								color="primary"
								width="4.37rem"
								height="4.37rem"
								key={value}
							>
								{value < 12 ? value : `${value}+`}
							</Button>
						);
					})}
                </div>
            </form>
        </Portlet>
    );
};

export default HotelDate;
