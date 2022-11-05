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
    index: 3,
    isValid: true,
    inputs: {
        time: {
            value: '12:00',
            isTouched: false,
            isValid: true
        }
    }
};

const Time: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);
    
	const times = [];
	for (let i = 12; i <= 21; i++) {
		for (let j = 0; j <= 3; j++) {
			// For 21pm, you can only go either 21:00 or 21:15
			if (i === 21 && j > 1) {
				break;
			}
			times.push(`${i}:${(15*j).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`)
		}
	}

    return (
        <Portlet>
			<h2>Select number of guests</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={formClasses['form__wide-row']}>
                                   </div>
                <div className={formClasses['form__wide-row']} style={{
					gridTemplateColumns: '1fr 1fr 1fr 1fr',
					gridTemplateRows: '1fr 1fr 1fr 1fr',
					gap: '0.5rem',
				}}>
					{
						times.map((time, index) => {
							return (
								<Button
									type="submit"
									onClick={() => {
										inputHandler('time', time, true);
										props.stepChangeHandler(step.index, formState, step.index + 1);
										setLocalStorageValue({
											...step,
											isValid: true,
											inputs: { ...formState.inputs }
										});
									}}
									color="primary"
									width="6.37rem"
									height="4.37rem"
									key={index}
								>
									{time}
								</Button>
							);
						})
					}
                </div>
            </form>
        </Portlet>
    );
};

export default Time;
