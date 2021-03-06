import {Dialect}                                         from "sequelize/types/lib/sequelize";
import {ModelCtor, Sequelize}                            from "sequelize";
import userCreator, {UserInstance}                       from "./user.model";
import sessionCreator, {SessionInstance}                 from "./session.model";
import spaceCreator, {SpaceInstance}                     from "./space.model";
import ticketCreator, {TicketInstance}                   from "./ticket.model";
import animalCreator, {AnimalInstance}                   from "./animal.model";
import healthbookCreator, {HealthbookInstance}           from "./healthbook.model";
import maintenancebookCreator, {MaintenancebookInstance} from "./maintenancebook.model";
import userSpaceCreator, {UserSpaceInstance}             from "./userSpace.model";
import spaceTicketCreator, {SpaceTicketInstance}         from "./spaceTicket.model";
import dateCreator, {DateInstance}                       from "./date.model";


export interface SequelizeManagerProps {
    sequelize      : Sequelize;
    User           : ModelCtor<UserInstance>;
    Session        : ModelCtor<SessionInstance>;
    Space          : ModelCtor<SpaceInstance>;
    Ticket         : ModelCtor<TicketInstance>;
    Animal         : ModelCtor<AnimalInstance>;
    Healthbook     : ModelCtor<HealthbookInstance>;
    Maintenancebook: ModelCtor<MaintenancebookInstance>;
    UserSpace      : ModelCtor<UserSpaceInstance>;
    SpaceTicket    : ModelCtor<SpaceTicketInstance>;
    Date           : ModelCtor<DateInstance>;
}

export class SequelizeManager implements SequelizeManagerProps {

    private static instance?: SequelizeManager;

    sequelize      : Sequelize;
    User           : ModelCtor<UserInstance>;
    Session        : ModelCtor<SessionInstance>;
    Space          : ModelCtor<SpaceInstance>;
    Ticket         : ModelCtor<TicketInstance>;
    Animal         : ModelCtor<AnimalInstance>;
    Healthbook     : ModelCtor<HealthbookInstance>;
    Maintenancebook: ModelCtor<MaintenancebookInstance>;
    UserSpace      : ModelCtor<UserSpaceInstance>;
    SpaceTicket    : ModelCtor<SpaceTicketInstance>;
    Date           : ModelCtor<DateInstance>;

    private constructor(props: SequelizeManagerProps) {
        this.sequelize       = props.sequelize;
        this.User            = props.User;
        this.Session         = props.Session;
        this.Space           = props.Space;
        this.Ticket          = props.Ticket;
        this.Animal          = props.Animal;
        this.Healthbook      = props.Healthbook;
        this.Maintenancebook = props.Maintenancebook;
        this.UserSpace       = props.UserSpace;
        this.SpaceTicket     = props.SpaceTicket;
        this.Date            = props.Date;

    }

    public static async getInstance(): Promise<SequelizeManager> {
        if(SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect : process.env.DB_DRIVER as Dialect,
            host    : process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port    : Number.parseInt(process.env.DB_PORT as string), 
            
            define: {
                freezeTableName: true,
                paranoid       : true,
                timestamps     : true
            }
        });
        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            User           : userCreator(sequelize),
            Session        : sessionCreator(sequelize),
            Space          : spaceCreator(sequelize),
            Ticket         : ticketCreator(sequelize),
            Animal         : animalCreator(sequelize),
            Healthbook     : healthbookCreator(sequelize),
            Maintenancebook: maintenancebookCreator(sequelize),
            UserSpace      : userSpaceCreator(sequelize),
            SpaceTicket    : spaceTicketCreator(sequelize),
            Date           : dateCreator(sequelize)
        }
        SequelizeManager.associate(managerProps);
        await sequelize.sync();
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {
        props.User.hasMany(props.Session); 
        props.Session.belongsTo(props.User);
        
        props.User.belongsTo(props.Ticket);
        props.Ticket.hasMany(props.User);
        
        props.Space.hasMany(props.Animal);
        props.Animal.belongsTo(props.Space);
        
        props.Animal.hasMany(props.Healthbook);
        props.Healthbook.belongsTo(props.Animal);
        
        props.Maintenancebook.belongsTo(props.Space);
        props.Space.hasMany(props.Maintenancebook);

        props.Date.belongsTo(props.Space);
        props.Space.hasMany(props.Date);
        
        props.User.belongsToMany(props.Space, {through: props.UserSpace});
        props.Space.belongsToMany(props.Ticket, {through: props.SpaceTicket});
    }
}
export * from './spaceTime.model';