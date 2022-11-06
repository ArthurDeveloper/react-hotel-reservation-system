import React, { useEffect } from 'react';
import { ConnectedProps } from 'react-redux';

import connector from './connector';
import { CircularProgress, Header, Steps, StepsIndicator } from 'components';
import { HotelDate, Calendar, Area, Time, Finish, ContactForm } from 'containers/Steps';
import { useSteps } from 'hooks';

import iconCalendar from 'lib/media/icons/calendar.svg';
import iconBed from 'lib/media/icons/bed.svg';
import iconCreditCard from 'lib/media/icons/credit-card.svg';

type TypeAppReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<TypeAppReduxProps> = (props: TypeAppReduxProps) => {
    const { stepsState, stepChangeHandler } = useSteps();

    const { onInitReservationForm, data, status, error } = props;

    useEffect(() => {
        if (data.names && !data.names.length && !error) {
            onInitReservationForm();
        }
    }, [onInitReservationForm, data, error]);

    const renderStep = () => {
        if (stepsState.currentStep === 0) {
            return <HotelDate stepChangeHandler={stepChangeHandler} />;
        }
        if (stepsState.currentStep === 1) {
            return <Calendar stepChangeHandler={stepChangeHandler} />;
        }
        if (stepsState.currentStep === 2) {
            return <Area stepChangeHandler={stepChangeHandler} />;
        }
		if (stepsState.currentStep === 3) {
			return <Time stepChangeHandler={stepChangeHandler} />;
		}
        if (stepsState.currentStep === 4) {
            return <ContactForm stepChangeHandler={stepChangeHandler} />;
        }
		if (stepsState.currentStep === 5) {
			return <Finish stepChangeHandler={stepChangeHandler} />
		}
    };

    return (
        <>
            <main className={'container'}>
                {status === 'pending' && <CircularProgress />}
                {status === 'resolved' && renderStep()}
                {status === 'rejected' && error && <h3 style={{ textAlign: 'center', color: 'red' }}>{error}</h3>}
            </main>
        </>
    );
};

export default connector(App);
