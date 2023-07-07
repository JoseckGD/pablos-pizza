import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';

export async function POST(req, res) {
    const body = await req.json()
    try {
        await registerSell(body);
        return NextResponse.json({ status: true, message: 'Venta Registrada Exitosamente' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al registrar la venta: ', error: error });
    }
}

async function registerSell(data) {
    console.log(data);
    const { usuario_id, fecha, total } = data;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO ventas (usuario_id, fecha, total) VALUES (?, ?, ?)';
        const values = [usuario_id, fecha, total];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}
