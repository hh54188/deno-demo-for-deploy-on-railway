import {DataTypes} from 'npm:sequelize@6.12.0'
import {TABLES} from './common.ts'

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  oauthProviderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TABLES.OAUTH_PROVIDER,
      key: 'id',
    },
  },
  userNameOnOauthProvider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmailOnOauthProvider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userIdOnOauthProvider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
