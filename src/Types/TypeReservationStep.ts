declare global {
    type TypeReservationStep = {
        stepChangeHandler: (stepIndex: number, formState: TypeFormState, targetStep: number, value: any) => void;
    	finish?: () => any;
	};
}

export {};
