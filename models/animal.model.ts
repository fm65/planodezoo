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
import {HealthbookInstance} from "./healthbook.model";

export interface AnimalProps {
    id         : number;
    name       : string;
    species    : string;
    description: string;
}

export interface AnimalCreationProps extends Optional<AnimalProps, "id"> {}

export interface AnimalInstance extends Model<AnimalProps, AnimalCreationProps>, AnimalProps {
    setSpace: BelongsToSetAssociationMixin<SpaceInstance, "id">;
    getSpace: BelongsToGetAssociationMixin<SpaceInstance>;

    setUser: BelongsToSetAssociationMixin<HealthbookInstance, "id">;
    getUser: BelongsToGetAssociationMixin<HealthbookInstance>;
}

export default function(sequelize: Sequelize): ModelCtor<AnimalInstance> {
    return sequelize.define<AnimalInstance>("Animal", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        name: {
            type  : DataTypes.STRING
        },
        species: {
            type  : DataTypes.STRING
        },
        description: {
            type  : DataTypes.TEXT
        }
    });
}