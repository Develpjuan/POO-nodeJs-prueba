//import mysql from 'mysql';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'POO-user'
});

connection.connect((err) => {
    if(err) {
        console.error("Error con la conexion a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos");
});

export default connection;