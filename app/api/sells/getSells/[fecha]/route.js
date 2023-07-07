import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../../utils/dbPizzeriaConnection';

export async function GET(req, { params }) {
    try {
        const fecha = params.fecha; // Obtener el valor de fecha desde la URL
        const sells = await getSellsByDate(fecha); // Consulta las ventas por fecha
        if (sells.length > 0) {
            return NextResponse.json({ status: true, message: 'Lista de Ventas', sells: sells });
        }
        return NextResponse.json({ status: true, message: 'No hay ventas en la base de datos' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}

async function getSellsByDate(date) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ventas WHERE DATE(fecha) = ?'; // Consulta modificada con cláusula WHERE para comparar solo la fecha
        const values = [date]; // Valor de fecha para filtrar las ventas
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}
