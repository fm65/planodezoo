import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin
} from "sequelize";

import {AnimalInstance} from "./animal.model";

export interface HealthbookProps {
    id       : number;
    date     : string;
    isDone   : boolean;
    comment  : string;
    AnimalId?: number;
}

export interface HealthbookCreationProps extends Optional<HealthbookProps, "id"> {}

export interface HealthbookInstance extends Model<HealthbookProps, HealthbookCreationProps>, HealthbookProps {
    setAnimal: BelongsToSetAssociationMixin<AnimalInstance, "id">;
    getAnimal: BelongsToGetAssociationMixin<AnimalInstance>;
}

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
        isDone: {
            type  : DataTypes.BOOLEAN
        },
        comment: {
            type  : DataTypes.TEXT
        }
    });
}