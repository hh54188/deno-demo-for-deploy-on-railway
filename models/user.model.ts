import {
  Sequelize,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  BelongsTo,
  Op
} from "npm:sequelize@6.12.0";
import userTableAttributes from './attributes/user.ts'
import {Folder} from './folder.model.ts';
import {commonInitTableOptions} from './common.ts'

interface UserAttributes {
  id: number,
  oauthProviderId: number,
  userIdOnOauthProvider: string,
  userNameOnOauthProvider: string;
  userEmailOnOauthProvider: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
};

export interface UserUpdateAttributes extends Optional<UserAttributes, "id" | "oauthProviderId" | "userIdOnOauthProvider"> {
};

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public oauthProviderId!: number;
  public userIdOnOauthProvider!: string;
  public userNameOnOauthProvider!: string;
  public userEmailOnOauthProvider!: string;

  public readonly deletedAt!: Date;
  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;

  public getFolders!: HasManyGetAssociationsMixin<Folder>;
  public addFolder!: HasManyAddAssociationMixin<Folder, number>;
  public hasFolder!: HasManyHasAssociationMixin<Folder, number>;
  public countFolders!: HasManyCountAssociationsMixin;
  public createFolder!: HasManyCreateAssociationMixin<Folder>;

  public readonly folders?: Folder[];

  public static associations: {
    folders: Association<User, Folder>;
  };
}

export default function (sequelize: Sequelize): void {
  User.init(userTableAttributes, {
      tableName: "user",
      sequelize,
      ...commonInitTableOptions
    }
  );
}


