
export const EnvConfigutarion = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
    defaultLimit: +process.env.DEFAULT_LIMIT || 5,
    dbhost: process.env.DB_HOST,
    dbport: process.env.DB_PORT,
    bdname: process.env.BD_NAME,
    dbusername: process.env.DB_USERNAME,
    dbpassword: process.env.DB_PASSWORD
});
