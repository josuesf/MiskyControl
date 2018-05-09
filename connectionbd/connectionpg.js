// Create connection to database
var dbConfig = {
    user: process.env.user_database || 'postgres', // update me
    host: process.env.host_database || 'localhost',
    password: process.env.password_database || 'toor1234', // update me
    database: process.env.name_database || 'bdrestaurant',
    port: process.env.port_database || '5432'
}
exports.dbConfig = dbConfig;
