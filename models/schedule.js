import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Foreign Key
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'schedules',
  timestamps: true
});

// Definisikan relasi: satu User memiliki banyak Schedule
User.hasMany(Schedule, { foreignKey: 'user_id' });
// Definisikan relasi: satu Schedule milik satu User
Schedule.belongsTo(User, { foreignKey: 'user_id' });

export default Schedule;