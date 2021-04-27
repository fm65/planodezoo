import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin
} from "sequelize";

import {UserInstance} from "./user.model";
import {SpaceInstance}   from "./space.model";

export interface UserSpaceProps {
    UserId?  : number;
    SpaceId? : number;
}

export interface UserCreationProps extends UserSpaceProps {}

export interface UserSpaceInstance extends Model<UserSpaceProps, UserCreationProps>, UserSpaceProps {
    getUsers: HasManyGetAssociationsMixin<UserInstance>;
    addUser: HasManyAddAssociationMixin<UserInstance, "id">;

    getSpaces: HasManyGetAssociationsMixin<SpaceInstance>;
    addSpace: HasManyAddAssociationMixin<SpaceInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<UserSpaceInstance> {
    return sequelize.define<UserSpaceInstance>("UserSpace",{}, { timestamps: false });
}