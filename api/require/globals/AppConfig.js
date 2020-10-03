let AppConfig = {
    database : {
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        server:process.env.DB_ADDRESS,
        name:process.env.DB_NAME,
    },
}

module.exports = AppConfig; 