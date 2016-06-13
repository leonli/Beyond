 var config = {

    production: {
      database: {
          dbname: 'beyond_db',
          username: 'dbadmin',
          password: 'Rdbms1234',
          connection: {
              dialect: "mysql",
              host: 'beyond-db.cqjutmbqwnuk.us-west-2.rds.amazonaws.com',
              port: 3306,
              logging: false
          }
      }
    },


    development: {
        database: {
          dbname: 'beyond_db',
          username: 'beyond',
          password: 'LocalDev',
          connection: {
              dialect: "mysql",
              host: 'localhost',
              port: 3306,
              logging: false
            }
        }
    },

    test: {
        database: {
          dbname: 'beyond_db',
          username: 'beyond',
          password: 'LocalDev',
          connection: {
              dialect: "mysql",
              host: 'localhost',
              port: 3306,
              logging: false
            }
        }
    },

    env: function () {
      switch (__ENV_MODE__) {
        case 'development':
          global. = this.development;
          break;
        case 'test':
          global. = this.test;
          break;
        case 'production':
          global. = this.production;
          break;
        default:
          global. = this.development;
      }
      return global.;
    }
};

module.exports = config.env();
 
