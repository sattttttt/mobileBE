import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
  // --- TAMBAHAN FIELD BARU ---
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  // -------------------------
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

User.hasMany(Schedule, { foreignKey: 'user_id' });
Schedule.belongsTo(User, { foreignKey: 'user_id' });

export default Schedule;