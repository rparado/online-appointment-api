import Appointment from '../../models/Appointments.js';

const appointmentResource = {
	resource: Appointment,
	options: {
		navigation: { name: 'Appointments', icon: 'Calendar' },
		actions: {
			list: {
				isAccessible: ({ currentAdmin }) => currentAdmin && (currentAdmin.role === 'doctor' || currentAdmin.role === 'admin'),
				before: async (request, { currentAdmin }) => {
					if (currentAdmin?.role === 'doctor') {
						request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
					}
					return request;
				}
			},
			new: { isAccessible: false }
		}
	}

}

export default appointmentResource;