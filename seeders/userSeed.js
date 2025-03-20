import sequelize from '../config/db.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const seedUsers = async () => {
    try {
        // Sync database (drop and recreate tables)
        await sequelize.sync({ force: true });
        console.log('✅ Database synced.');

        // Hash passwords before storing
        const hashedPassword1 = await bcrypt.hash('admin123', 10);
        const hashedPassword2 = await bcrypt.hash('doctor123', 10);

        // Insert Users
        const users = await User.bulkCreate([
            {
                email: 'admin@admin.com',
                password: hashedPassword1,
                role: 'admin',
            },
            {
                email: 'doctor@doctor.com',
                password: hashedPassword2,
                role: 'user',
            },
        ]);

        console.log('Users seeded:', users.map(user => user.email));

    } catch (error) {
        console.error('User seeding failed:', error);
    } finally {
        process.exit();
    }
};

seedUsers();
