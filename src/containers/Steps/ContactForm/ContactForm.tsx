import React, { useEffect, useState } from 'react';
import validatorjs from 'validator';

import { useForm, useLocalStorage, useCart, useCreditCard } from 'hooks';
import { Portlet, Button, CreditCard, ReservationDetails, Select, TextField } from 'components';
import { getCreditCardYears, getCreditCardMonths, isValidName, ccNumberMaskPipe } from 'lib/scripts/utils';

import formClasses from 'components/Form/Form.module.scss';

const step: TypeStep = {
    index: 4,
    isValid: false,
    inputs: {
        firstName: {
            value: '',
            isTouched: false,
            isValid: true
        },
        lastName: {
            value: '',
            isTouched: false,
            isValid: true
        },
        phoneNumber: {
            value: '',
            isTouched: false,
            isValid: true
        },
        emailAdress: {
            value: '',
            isTouched: false,
            isValid: true
        },
        company: {
            value: '',
            isTouched: false,
            isValid: true
        }
    }
};

const ContactForm: React.FC<TypeReservationStep> = (props: TypeReservationStep) => {
    const [storedValue, setLocalStorageValue] = useLocalStorage(`step-${step.index}`, step);
    const [formState, inputHandler] = useForm(storedValue.inputs, storedValue.isValid);

    return (
        <Portlet>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
					<div className={formClasses['form__wide-row']} style={{ 
						gap: '2rem',
						display: 'flex',
						flexDirection: 'column',
					}}>
							<div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
								<TextField
									id="firstName"
									type="text"
									label="First name"
									placeholder="Your first name"
									value={formState.inputs.firstName.value}
									onChange={(id, value, validity) => {
										inputHandler(id, value, true);
									}}
								/>
								
								<TextField
									id="lastName"
									type="text"
									label="Last name"
									placeholder="Your last name"
									value={formState.inputs.lastName.value}
									onChange={(id, value, validity) => {
										inputHandler(id, value, true);
									}}
								/>
							</div>
							<TextField
								id="phoneNumber"
								type="text"
								label="Phone number"
								placeholder="Your phone no."
								value={formState.inputs.phoneNumber.value}
								validity={formState.inputs.phoneNumber.isValid}
								validators={[[validatorjs.isMobilePhone]]}
								validationMessage="Please enter a valid phone number"
								onChange={(id, value, validity) => {
									inputHandler(id, value, validity);
								}}
							/>

							<TextField
								id="emailAdress"
								type="text"
								label="Email adress"
								placeholder="Your email adress"
								value={formState.inputs.emailAdress.value}
								validity={formState.inputs.emailAdress.isValid}
								validators={[[validatorjs.isEmail]]}
								validationMessage="Please type a valid email adress"
								onChange={inputHandler}
							/>

							<TextField
								id="company"
								type="text"
								label="Company"
								placeholder="Your company name"
								value={formState.inputs.company.value}
								onChange={(id, value, validity) => {
									inputHandler(id, value, true);
								}}
							/>
                        </div>
                    <div className={[formClasses['form__normal-row'], formClasses['form__actions']].join(' ')}>
                    <Button
                        type="button"
                        onClick={() => {
                            if (!formState.isValid) return;
							props.stepChangeHandler(step.index, formState, step.index + 1);
                        }}
                        disabled={!formState.isValid}
						width="9rem"
						height="2rem"
                    >
                        Finish
                    </Button>
                </div>
				</div>
            </form>
        </Portlet>
    );
};

export default ContactForm;
