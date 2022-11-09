import React, { useState, useEffect } from 'react';
import { ConnectedProps } from 'react-redux';

import connector from './connector';
import { CircularProgress, Header, Steps, StepsIndicator } from 'components';
import { HotelDate, Calendar, Area, Time, Finish, ContactForm } from 'containers/Steps';
import { useSteps } from 'hooks';

import { Routes, Route } from 'react-router-dom';

import iconCalendar from 'lib/media/icons/calendar.svg';
import iconBed from 'lib/media/icons/bed.svg';
import iconCreditCard from 'lib/media/icons/credit-card.svg';

import Backoffice from '../Backoffice';

import appClasses from './App.module.scss';

type TypeReservationData = {
	guests?: string | number,
	date?: Date | string,
	area?: 'Villani Trattoria' | 'Villani Osteria',
	time?: string,
	firstName?: string,
	lastName?: string,
	emailAdress?: string,
	phoneNumber?: string,
	company?: string,

}; 

type TypeAppReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<TypeAppReduxProps> = (props: TypeAppReduxProps) => {
    
	const { stepsState, stepChangeHandler } = useSteps();
	const [previousStepBeforeRecap, setPreviousStepBeforeRecap] = useState(-1);

	const [reservation, setReservation] = useState<TypeReservationData>({});

	const [hasDoneFirstSetup, setHasDoneFirstSetup] = useState(false);

	useEffect(() => {
		if (!hasDoneFirstSetup) {
			const values = new Array(4).fill(0).map((v, index) => JSON.parse(localStorage.getItem(`step-${index}`) ?? '{}'));

			try {
				setReservation({ 
					guests: values[0].guests,
					date: values[1].date,
					area: values[2].area,
					time: values[3].time,
				});
			} catch (Exception) {

			}
			setHasDoneFirstSetup(true);
		}
	}, []);

	const setStep = (stepIndex: number) => {
		//localStorage.setItem(`step-${stepIndex}`, '{}');
		//if (stepIndex === 0) setReservation({ ...reservation, guests: 0 });
		
		stepChangeHandler(stepsState.currentStep, { inputs: {}, isValid: true }, stepIndex);
	}

	const changeHandler = async (stepIndex: number, formState: any, next: number, value: TypeReservationData) => {
	//	localStorage.setItem(`step-${next}`, '{}');
		stepChangeHandler(stepIndex, formState, next);
		setReservation({...reservation, ...value});
	}

	const finish = () => {
		fetch('https://hotel-reservation-system-react-default-rtdb.firebaseio.com/reservations.json', 
		{
			method: 'POST',
			body: JSON.stringify(reservation),
		});
	}

	const send = (stepIndex: any, formState: any, next: any, value: any) => {
		changeHandler(stepIndex, formState, next, value);
	}

	const recap: () => JSX.Element = () => {
		return (
			<div className={appClasses['recap']} style={{ 
				maxWidth: stepsState.currentStep === 4 ? '30rem' : 'none',
				display: stepsState.currentStep === 5 ? 'none' : 'block',
				marginTop: stepsState.currentStep === 4 ? '0' : '2rem'
			}}>
				<div 
					className={appClasses['recap-data']}
					onClick={() => {
						setStep(0);
					}}
					style={{ display: reservation.guests ? 'flex' : 'none' }}
				>
					<span style={{fontWeight: '700'}}>Guests: </span> 
					{reservation.guests ?? ''}
				</div>
				<div 
					className={appClasses['recap-data']}
					onClick={() => {
						setStep(1);
					}}
					style={{ 
						display: reservation.date ? 'flex' : 'none',}}
				>
					<span style={{fontWeight: '700'}}>Date: </span> 
					{reservation.date?.toString().substr(0, 20) ?? ''}
				</div>
				<div 
					className={appClasses['recap-data']}
					onClick={() => {
						setStep(2);
					}}
					style={{ display: reservation.area ? 'flex' : 'none' }}
				>
					<span style={{fontWeight: '700' }}>Area: </span> 
					{reservation.area ?? ''}
				</div>
				<div 
					className={appClasses['recap-data']}
					onClick={() => {
						setStep(3);
					}}
					style={{ display: reservation.time ? 'flex' : 'none' }}
				>
					<span style={{fontWeight: '700'}}>Time: </span> 
					{reservation.time ?? ''}
				</div>
			</div>
		);
	}

    const { onInitReservationForm, data, status, error } = props;

    useEffect(() => {
		if (data.names && !data.names.length && !error) {
            onInitReservationForm();
        }
    }, [onInitReservationForm, data, error]);

    const renderStep = () => {
        if (stepsState.currentStep === 0) {
            return <HotelDate stepChangeHandler={changeHandler} />;
        }
        if (stepsState.currentStep === 1) {
            return <Calendar stepChangeHandler={changeHandler} />;
        }
        if (stepsState.currentStep === 2) {
            return <Area stepChangeHandler={changeHandler} />;
        }
		if (stepsState.currentStep === 3) {
			return <Time stepChangeHandler={changeHandler} />;
		}
        if (stepsState.currentStep === 4) {
            return (
				<ContactForm stepChangeHandler={send} />
			);
		}
		if (stepsState.currentStep === 5) {
			return <Finish stepChangeHandler={changeHandler} finish={finish} />
		}
    };

    return (
        <>
            <main className={'container'}>
                {status === 'pending' && <CircularProgress />}
                {status === 'resolved' && (<div style={{ display: 'flex', flexDirection: stepsState.currentStep === 4 ? 'row' : 'column', flexWrap: 'wrap', gap: '2rem' , justifyContent: 'center', alignItems: 'center' }}>
					{recap()}
					{renderStep()}
        		</div>)}
                {status === 'rejected' && error && <h3 style={{ textAlign: 'center', color: 'red' }}>{error}</h3>}
            </main>
        </>
    );
};

export default connector(App);
