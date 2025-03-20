import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const DoctorAvailability = sequelize.define('DoctorAvailability', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Doctors',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  day_of_week: {
    type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Unavailable'),
    allowNull: false,
    defaultValue: 'Available',
  },
}, {
  timestamps: true,
  tableName: 'doctor_availabilities',
});

export default DoctorAvailability;
