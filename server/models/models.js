const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Customer Model
const User = sequelize.define("User", {
    customer_name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    confirmation_code: { type: DataTypes.TEXT },
    confirmation_time: { type: DataTypes.DATE },
});

const Administrator = sequelize.define("Administrator", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

const Support = sequelize.define("Support", {
    title: { type: DataTypes.STRING(255), allowNull: false },
    body: {type: DataTypes.STRING(255), allowNull: false},
    statusClose: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Message = sequelize.define("Message", {
    text: { type: DataTypes.TEXT, allowNull: false },
    room: { type: DataTypes.INTEGER, allowNull: false },
});

// Country Model
const Country = sequelize.define("Country", {
    country_name: { type: DataTypes.STRING(255), allowNull: false },
});

// Manufacturer Model
const Manufacturer = sequelize.define("Manufacturer", {
    manufacture_name: { type: DataTypes.STRING(255), allowNull: false },
    contact_info: { type: DataTypes.STRING(255) },
    website: { type: DataTypes.STRING(255) },
});

// Category Model
const Category = sequelize.define("Category", {
    category_name: { type: DataTypes.STRING(255), allowNull: false },
});

// Instrument Model
const Instrument = sequelize.define("Instrument", {
    instrument_name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
});

// Item Model
const Item = sequelize.define("Item", {
    serial_number: { type: DataTypes.STRING(255), allowNull: false },
    year_of_production: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    characteristics: { type: DataTypes.STRING(255) },
});

// Cart Model
const Cart = sequelize.define("Cart", {
    session_id: { type: DataTypes.STRING(100) },
    status: { type: DataTypes.SMALLINT },
    firstName: { type: DataTypes.STRING(50) },
    lastName: { type: DataTypes.STRING(50) },
    mobile: { type: DataTypes.STRING(20) },
});

// Cart Item Model
const CartItem = sequelize.define("CartItem", {
    price: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.FLOAT },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

// User Order Model
const UserOrder = sequelize.define("UserOrder", {
    delivery_address: { type: DataTypes.STRING(255) },
    total_price: { type: DataTypes.DECIMAL(10, 2) },
    discount: { type: DataTypes.FLOAT },
    final_price: { type: DataTypes.DECIMAL(10, 2) },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

// Order Status Model
const OrderStatus = sequelize.define("OrderStatus", {
    status_name: { type: DataTypes.STRING(255), allowNull: false },
});

// Transaction Model
const Transaction = sequelize.define("Transaction", {
    mode: { type: DataTypes.SMALLINT },
    status: { type: DataTypes.SMALLINT },
});

// Order Item Model
const OrderItem = sequelize.define("OrderItem", {
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount: { type: DataTypes.FLOAT },
});

// Relationships
User.belongsTo(Country);
Country.hasMany(User);

User.hasMany(Message);
Message.belongsTo(User);

Administrator.hasMany(Message);
Message.belongsTo(Administrator);

Support.hasMany(Message);
Message.belongsTo(Support);

Item.belongsTo(Instrument);
Instrument.hasMany(Item);

Instrument.belongsTo(Category);
Category.hasMany(Instrument);

Item.belongsTo(Manufacturer);
Manufacturer.hasMany(Item);

Cart.belongsTo(User);
User.hasMany(Cart);

CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

UserOrder.belongsTo(User);
User.hasMany(UserOrder);

UserOrder.belongsTo(OrderStatus);
OrderStatus.hasMany(UserOrder);

Transaction.belongsTo(User);
User.hasMany(Transaction);

OrderItem.belongsTo(UserOrder);
UserOrder.hasMany(OrderItem);

OrderItem.belongsTo(Item);
Item.hasMany(OrderItem);

module.exports = {
    User,
    Country,
    Manufacturer,
    Category,
    Instrument,
    Item,
    Cart,
    CartItem,
    UserOrder,
    OrderStatus,
    Transaction,
    OrderItem,
    Administrator,
    Support,
    Message,
};