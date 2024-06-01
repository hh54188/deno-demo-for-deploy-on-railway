import {
  Sequelize,
  Model,
} from "npm:sequelize@6.12.0";
import oauthProviderTableAttributes from "./attributes/oauth-provider.ts"

interface OAuthProviderAttributes {
  id: number,
  name: string,
}

export class OAuthProvider extends Model<OAuthProviderAttributes> implements OAuthProviderAttributes{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize):void {
  OAuthProvider.init(oauthProviderTableAttributes,
    {
      tableName: "oauth_provider",
      sequelize,
    }
  );
}


