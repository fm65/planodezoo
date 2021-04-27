import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin
} from "sequelize";

import {SpaceInstance}            from "./space.model";
import {TicketInstance}          from "./ticket.model";

export interface SpaceTicketProps {
    SpaceId?    : number;
    TicketType? : number;
}

// export interface SpaceTicketCreationProps extends Optional<SpaceTicketProps, "space_id"> {}

export interface SpaceTicketInstance extends Model<SpaceTicketProps>, SpaceTicketProps {
    getTickets: BelongsToManyGetAssociationsMixin<TicketInstance>;
    addTicket : BelongsToManyAddAssociationMixin<TicketInstance, "type">;

    getSpace: HasManyGetAssociationsMixin<SpaceInstance>;
    addSpace : HasManyAddAssociationMixin<SpaceInstance, "id">;
 }

 export default function(sequelize: Sequelize): ModelCtor<SpaceTicketInstance> {
    return sequelize.define<SpaceTicketInstance>("SpaceTicket",{}, { timestamps: false });
}