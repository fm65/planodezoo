import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin
} from "sequelize";

import {AnimalInstance} from "./animal.model";

export interface HealthbookProps {
    id     : number;
    date   : string;
    comment: string;
}

export interface HealthbookCreationProps extends Optional<HealthbookProps, "id"> {}

export interface HealthbookInstance extends Model<HealthbookProps, HealthbookCreationProps>, HealthbookProps {}

export default function(sequelize: Sequelize): ModelCtor<HealthbookInstance> {
    return sequelize.define<HealthbookInstance>("Healthbook", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        date: {
            type  : DataTypes.DATE
        },
        comment: {
            type  : DataTypes.TEXT
        }
    });
}