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

import {UserInstance} from "./user.model";
import {SpaceInstance} from "./space.model";

export interface TicketProps {
    id        : number;
    name      : string;
    price     : number;
    date      : string;
    validation: string;
}

export interface TicketCreationProps extends Optional<TicketProps, "id"> {}

export interface TicketInstance extends Model<TicketProps, TicketCreationProps>, TicketProps {
    setUser: BelongsToSetAssociationMixin<UserInstance, "id">;
    getUser: BelongsToGetAssociationMixin<UserInstance>;

    getSpaces: BelongsToManyGetAssociationsMixin<SpaceInstance>;
    addSpace: BelongsToManyAddAssociationMixin<SpaceInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<TicketInstance> {
    return sequelize.define<TicketInstance>("Ticket", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        name: {
            type  : DataTypes.STRING
        },
        price: {
            type  : DataTypes.DOUBLE
        },
        date: {
            type: DataTypes.DATE
        },
        validation: {
            type: DataTypes.DATE
        }
    });
}