import { NextResponse } from "next/server";
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

export async function GET(req,res) {
    try {
        const sells = await getSells(); // Consulta las ventas
        if (sells.length > 0) {
            return NextResponse.json({ status: true, message: 'Lista de Ventas', sells: sells });
        }
        return NextResponse.json({ status: true, message: 'No hay ventas en la base de datos' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error from the API! ' + error });
    }
}

async function getSells() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ventas'; // Consulta modificada con cláusula WHERE para comparar solo la fecha
        dbPizzeriaConnection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}