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

import {SpaceInstance}            from "./space.model";
import {TicketInstance}          from "./ticket.model";

export interface SpaceTicketProps {
    space_id      : number;
    ticket_type   : number;
}

// export interface SpaceTicketCreationProps extends Optional<SpaceTicketProps, "space_id"> {}

export interface SpaceTicketInstance extends Model<SpaceTicketProps>, SpaceTicketProps {
    getTickets: BelongsToManyGetAssociationsMixin<TicketInstance>;
    addTicket : BelongsToManyAddAssociationMixin<TicketInstance, "type">;

    getSpace: HasManyGetAssociationsMixin<SpaceInstance>;
    addSpace : HasManyAddAssociationMixin<SpaceInstance, "id">;
 }

 export default function(sequelize: Sequelize): ModelCtor<SpaceTicketInstance> {
    return sequelize.define<SpaceTicketInstance>("SpaceTicket", {
        space_id: {
            type: DataTypes.BIGINT,
            primaryKey   : true
        },
        ticket_type: {
            type  : DataTypes.BIGINT,
            primaryKey   : true
        }
    });
}