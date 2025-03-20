import Doctor from '../../models/Doctor.js';

const doctorResource = {
	resource: Doctor,
	options: {
		navigation: 'Doctors Management',
		actions: {
			list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
			edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
			delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
			new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
		},
		properties: {
			id: { isVisible: { list: false, filter: false, show: false, edit: false } },
			user_id: { 
				position: 1, 
				label: 'User',
				type: 'reference',
				reference: 'users',  
				isVisible: { list: true, filter: true, show: true, edit: true }
			},
			first_name: { position: 1, label: 'First Name' },
			middle_name: { position: 2, label: 'Middle Name' },
			last_name: { position: 3, label: 'Last Name' },
			phone_number: { position: 4, label: 'Phone Number' },
			gender: { 
				position: 5, 
				label: 'Gender', 
				availableValues: [
					{ value: 'male', label: 'Male' }, 
					{ value: 'female', label: 'Female' }
				] 
			},
			specialization: { 
				position: 6,
				label: 'Specialization',
				type: 'reference',
				reference: 'specializations',
			},
			medical_license: { position: 7, label: 'Medical License' },
			consultation_fee: { position: 8, label: 'Consultation Fee' },
			created_at: { isVisible: { list: true, filter: false, show: true, edit: false }, label: 'Created At' },
			updated_at: { isVisible: { list: true, filter: false, show: true, edit: false }, label: 'Updated At' },
		},
		listProperties: ['user_id','first_name', 'last_name', 'phone_number', 'specialization_id', 'consultation_fee'],
		editProperties: ['user_id','first_name', 'middle_name', 'last_name', 'phone_number', 'gender', 'specialization_id', 'medical_license', 'consultation_fee'],
		showProperties: ['user_id','first_name', 'middle_name', 'last_name', 'phone_number', 'gender', 'specialization_id', 'medical_license', 'consultation_fee', 'created_at', 'updated_at'],
		filterProperties: ['user_id','first_name', 'last_name', 'specialization_id', 'gender'],
	},
};

export default doctorResource;
