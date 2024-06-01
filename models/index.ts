import {Sequelize, Options} from "npm:sequelize@6.12.0";
import * as pg from 'npm:pg@latest';
import * as pgHstore from 'npm:pg-hstore@latest';

import UserInitialization, {User} from './user.model.ts';
import FolderInitialization, {Folder} from './folder.model.ts';
import OAuthProviderInitialization from './oauth-provider.model.ts';
import LinkInitialization, {Link} from './link.model.ts';

// const connectionStr = 'postgres://postgres:password@127.0.0.1:5432/postgres'
const connectionStr = 'postgres://postgres.xpmevuxornlbxbznbyyq:Lee13576147290@aws-0-us-west-1.pooler.supabase.com:5432/postgres'

export const sequelize = new Sequelize(connectionStr, {
    dialect: 'postgres',
    logQueryParameters: true,
});

UserInitialization(sequelize);
FolderInitialization(sequelize);
OAuthProviderInitialization(sequelize);
LinkInitialization(sequelize);

User.hasMany(Folder, {
  as: 'folders',
  sourceKey: 'id',
  foreignKey: 'authorId'
});

Folder.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'authorId'
})

Folder.hasMany(Link, {
  as: 'links',
  sourceKey: 'id',
  foreignKey: 'folderId'
});

Link.belongsTo(Folder, {
  targetKey: 'id',
  foreignKey: 'folderId'
});

export default {
  User,
  Folder,
  Link,
}

