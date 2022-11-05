import { connect } from 'react-redux';

import * as actions from 'stores/hotels/actions';

export const mapState = (state: TypeAppProps) => ({
    data: state.hotels.data,
    status: state.hotels.status,
    error: state.hotels.error
});

export const mapDispatch = {
    onInitReservationForm: () => actions.getHotels()
};

const connector = connect(mapState, mapDispatch);

export default connector;
