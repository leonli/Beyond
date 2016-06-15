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
          username: 'devuser',
          password: 'LocalDev123',
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
          username: 'devuser',
          password: 'LocalDev123',
          connection: {
              dialect: "mysql",
              host: 'localhost',
              port: 3306,
              logging: false
            }
        }
    },

    env: function () {
      var conf = {};
      switch (__ENV_MODE__) {
        case 'development':
          conf = this.development;
          break;
        case 'test':
          conf = this.test;
          break;
        case 'production':
          conf = this.production;
          break;
        default:
          conf = this.development;
      }
      return conf;
    }
};

module.exports = config.env();
 
