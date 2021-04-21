import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin
} from "sequelize";

import {SessionInstance} from "./session.model";
import {SpaceInstance}   from "./space.model";
import {TicketInstance}   from "./ticket.model";

export interface UserProps {
    id       : number;
    firstname: string;
    lastname : string;
    login    : string;
    password : string;
    email    : string;
    role     : number;
}

export interface UserCreationProps extends Optional<UserProps, "id"> {}

export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
    getSessions: HasManyGetAssociationsMixin<SessionInstance>;
    addSession : HasManyAddAssociationMixin<SessionInstance, "id">;

    getSpaces: BelongsToManyGetAssociationsMixin<SpaceInstance>;
    addSpace : BelongsToManyAddAssociationMixin<SpaceInstance, "id">;

    getTickets: HasManyGetAssociationsMixin<TicketInstance>;
    addTicket : HasManyAddAssociationMixin<TicketInstance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<UserInstance> {
    return sequelize.define<UserInstance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey   : true,
            autoIncrement: true
        },
        firstname: {
            type  : DataTypes.STRING
        },
        lastname: {
            type  : DataTypes.STRING
        },
        login: {
            type  : DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        role: {
            type : DataTypes.INTEGER //['guest', 'employee', 'veterinary', 'admin']
        }
    });
}