var config = {

    production: {
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
          global.$config = this.development;
          break;
        case 'test':
          global.$config = this.test;
          break;
        case 'production':
          global.$config = this.production;
          break;
        default:
          global.$config = this.development;
      }
      return global.$config;
    }
};

module.exports = config.env();
