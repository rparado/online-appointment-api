import DoctorAvailability from  '../../models/DoctorAvailability.js';

const doctorAvailabilityResource = {
    resource: DoctorAvailability,
    options: {
        navigation: { name: 'Doctor Availability', icon: 'Clock' },
        actions: {
            list: { isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin') }
        }
    }
};

export default doctorAvailabilityResource;