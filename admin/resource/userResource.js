import User from '../../models/User.js';

const userResource = {
	resource: User,
	options: {
        navigation: { name: 'Users', icon: 'User' },
        actions: {
            list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        },
        properties: {
            token: {isVisible: false},
            password: {type: 'password'},
            role: {
                type: 'select',
                availableValues: [
                    { value: 'admin', label: 'Admin' },
                    { value: 'doctor', label: 'Doctor' },
                    { value: 'secretary', label: 'Secretary' }
                ] 
            }
        }
    }
};

export default userResource;