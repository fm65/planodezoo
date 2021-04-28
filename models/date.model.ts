import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin,
} from "sequelize";

import {SpaceInstance} from "./space.model";

export interface DateProps {
    id     : number;
    visitors: number;
    SpaceId?: number;
}

export interface DateCreationProps extends Optional<DateProps, "id"> {}

export interface DateInstance extends Model<DateProps, DateCreationProps>, DateProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<DateInstance> {
    return sequelize.define<DateInstance>("Date", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        visitors: {
            type  : DataTypes.INTEGER
        }
    });
}