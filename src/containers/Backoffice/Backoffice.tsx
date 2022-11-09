import { Portlet } from 'components';
import { useState, useEffect } from 'react';

export default function Backoffice() {
	const [data, setData] = useState({});

	useEffect(() => {
		fetch('https://hotel-reservation-system-react-default-rtdb.firebaseio.com/reservations.json', 
		{
			method: 'GET',
		}).then((data) => data.json())
		.then((json) => setData(json));
	}, []);

	return (
		<Portlet>
			<pre>{JSON.stringify(data, null, 2) ?? 'Loading...'}</pre>
		</Portlet>
	);
}
