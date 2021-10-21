const env = {
  database: 'shay_db',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 300000,
	  idle: 100000
  }
};
 
module.exports = env;