import User from '../../models/User.js';
const validateEmail = async (request) => {
    if (request.method === 'post' || request.method === 'put') {
        const { email } = request.payload;

        if (!email) {
            throw new Error('Email is required.');
        }

        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format. Please enter a valid email address.');
        }
    }
    return request;
};
const userResource = {
	resource: User,
	options: {
        navigation: { name: 'Users', icon: 'User' },
        actions: {
            list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { 
                isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
                before: validateEmail
            },
            delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            new: { 
                isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin',
                before: validateEmail
            }
        },
        properties: {
            email: {
                type: 'email',
                isRequired: true,
                props: {
                    placeholder: 'use format {{name@domain.com}}' 
                }
            },
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