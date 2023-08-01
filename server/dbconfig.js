const config = {
  user: "sa", // sql user
  password: "123@com", //sql user password
  //server: "10.0.0.186\\COMBILL", // if it does not work try- localhost
  server: "localhost", // if it does not work try- localhost
  database: "QuickRec",

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },

  //   options: {
  //     trustedconnection: true,
  //     enableArithAbort: true,
  //     instancename: "SQLEXPRESS", // SQL Server instance name
  //   },
  //port: 55892,
};

export default config;
