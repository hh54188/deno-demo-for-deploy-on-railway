import {
  Sequelize,
  Model,
  Optional,
  HasManyGetAssociationsMixin,
  HasMany,
} from "npm:sequelize@6.12.0";
import folderTableAttributes from "./attributes/folder.ts"
import {LinkCreationAttributes} from "./link.model.ts"
import {Link} from "./link.model.ts";
import {commonInitTableOptions} from "./common.ts";

interface FolderAttributes {
  id: number,
  authorId: number,
  name: string,
  nsfw: number
}

export interface FolderCreationAttributes extends Optional<FolderAttributes, "id"> {
  links: LinkCreationAttributes[];
}

export interface FolderUpdateAttributes extends Optional<FolderAttributes, "authorId"> {
  links: LinkCreationAttributes[];
}

export class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes{
  public id!: number;
  public authorId!: number;
  public name!: string;
  public nsfw!: number;

  public readonly deletedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getLinks!: HasManyGetAssociationsMixin<Link>;

  public readonly links?: Link[];

  public static associations: {
    links: HasMany<Folder, Link>;
  }
}

export default function(sequelize: Sequelize): void {
  Folder.init(folderTableAttributes, {
    tableName: 'folder',
    sequelize,
    ...commonInitTableOptions
  });
}

