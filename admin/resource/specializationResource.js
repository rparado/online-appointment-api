import Specialization from '../../models/Specialization.js';

const specializationResource = {
	resource: Specialization,
	options: {
		navigation: 'Specialization Management',
		actions: {
			list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
			edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
			delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
			new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
		},
		properties: {
			id: { isVisible: { list: false, filter: false, show: false, edit: false } },
			name: { position: 1, label: 'Specialization Name', isTitle: true },
			created_at: { isVisible: { list: true, filter: false, show: true, edit: false }, label: 'Created At' },
			updated_at: { isVisible: { list: true, filter: false, show: true, edit: false }, label: 'Updated At' },
		},
		listProperties: ['name'],
		editProperties: ['name'],
		showProperties: ['name', 'created_at', 'updated_at'],
		filterProperties: ['name'],
	},
};

export default specializationResource;
