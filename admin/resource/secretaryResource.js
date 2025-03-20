import Secretary from '../../models/Secretary.js';

const secretaryResource = {
	resource: Secretary,
	options: {
		navigation: { name: 'Secretaries', icon: 'Assistant' },
		actions: {
			list: {
				isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin'),
				before: async (request, { currentAdmin }) => {
					if (currentAdmin?.role === 'doctor') {
						request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
					}
					return request;
				}
			}
		}
	}
}

;
export default secretaryResource