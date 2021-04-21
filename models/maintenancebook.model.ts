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

import {SpaceInstance} from "./space.model";

export interface MaintenancebookProps {
    id     : number;
    date   : string;
    comment: string;
    month  : string;
}

export interface MaintenancebookCreationProps extends Optional<MaintenancebookProps, "id"> {}

export interface MaintenancebookInstance extends Model<MaintenancebookProps, MaintenancebookCreationProps>, MaintenancebookProps {}

export default function(sequelize: Sequelize): ModelCtor<MaintenancebookInstance> {
    return sequelize.define<MaintenancebookInstance>("Maintenancebook", {
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
        },
        month: {
            type  : DataTypes.STRING
        }
    });
}