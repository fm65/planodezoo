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

export interface MaintenancebookProps {
    id     : number;
    date   : string;
    isDone : boolean;
    comment: string;
    month  : number;
}

export interface MaintenancebookCreationProps extends Optional<MaintenancebookProps, "id"> {}

export interface MaintenancebookInstance extends Model<MaintenancebookProps, MaintenancebookCreationProps>, MaintenancebookProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;
}

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
        isDone: {
            type  : DataTypes.BOOLEAN
        },
        comment: {
            type  : DataTypes.TEXT
        },
        month: {
            type  : DataTypes.INTEGER
        }
    });
}