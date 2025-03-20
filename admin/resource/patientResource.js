import Patient from '../../models/Patient.js';

const patientResource = {
	resource: Patient,
	options: {
		navigation: { name: 'Patients', icon: 'User' },
		actions: {
			list: {
				isAccessible: ({ currentAdmin }) => currentAdmin && (currentAdmin.role === 'doctor' || currentAdmin.role === 'admin'),
				before: async (request, { currentAdmin }) => {
					if (currentAdmin?.role === 'doctor') {
						request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
					}
					return request;
				}
			}
		}
	}
};

export default patientResource