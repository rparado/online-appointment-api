import MedicalRecord from '../../models/MedicalRecord.js';

const medicalRecordResource = {
	resource: MedicalRecord,
	options: {
		navigation: { name: 'Medical Records', icon: 'File' },
		actions: {
			list: {
				isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin'),
				before: async (request, { currentAdmin }) => {
					if (currentAdmin?.role === 'doctor') {
						request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
					}
					return request;
				}
			},
			new: {isVisible: false}
		}
	}
};
export default medicalRecordResource;