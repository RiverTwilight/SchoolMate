var mysql = require("mysql");

// Load enviroment varible
require('dotenv').config()

var pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.PASS,
	socketPath: "/var/lib/mysql/mysql.sock",
    database: "ygkapi",
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
}); // 数据库连接配置

function query(sql, callback) {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!
		connection.query(sql, function (err, rows) {
			callback(err, rows);
            connection.release();
		});
	});
} //对数据库进行增删改查操作的基础

const update = (table, data, condition) => {
	var insertSql = Object.keys(data)
		.map((key) => `${key} = '${data[key]}'`)
		.join(" ");
	var sql = `UPDATE ${table} SET ${insertSql} WHERE ${condition.key} = '${condition.value}' `;
	console.log(sql);
	return new Promise((resolve, reject) => {
		query(sql, (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
};

const insert = (table, data) => {
	const keys = Object.keys(data).join(",");
	const values = Object.values(data)
		.map((item) => `'${item}'`)
		.join(",");
	var sql = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
	console.log(sql);
	return new Promise((resolve, reject) => {
		query(sql, (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
};

const del = (table, condition) => {
	var sql = `DELETE FROM ${table} WHERE ${condition.where.key} = '${condition.where.value}' `;
	console.log(sql);
	return new Promise((resolve, reject) => {
		query(sql, (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
};

/**
 * 
 * @param {string} table 数据表名称
 * @param {*[]} keys 
 * @param {{
 *     order?: string,
 *     where?: *
 *     sort?: 'DESC' | 'ASEC'
 * }} config 
 */
const get = (table, keys, config) => {
	var getSql;
	if (keys !== "*") {
		getSql = "";
		keys.map((item) => {
			getSql += item;
		});
	} else {
		getSql = keys;
	}
	var configSql = "";
	Object.keys(config).map((key) => {
		configSql += {
			order: `ORDER BY ${config[key]} ${config.sort} `,
			limit: `LIMIT ${config[key]} `,
			where: `WHERE ${config.where.key} = '${config.where.value}'`
		}[key] || ""
	});
	var sql = `SELECT ${getSql} FROM ${table} ${configSql}`;
	console.log(sql);
	return new Promise((resolve, reject) => {
		query(sql, (err, rows) => {
			if (err) {
				reject(err);
			}
			resolve(rows);
		});
	});
};

exports.del = del;
exports.insert = insert;
exports.update = update;
exports.get = get;
exports.query = query;
