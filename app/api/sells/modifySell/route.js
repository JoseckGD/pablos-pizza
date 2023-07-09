import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../../utils/dbPizzeriaConnection';


export async function PUT(req, res) {
    const body = await req.json()
    try {
        if (await editSell(body)) {
            return NextResponse.json({ status: true, message: 'Venta actualizada exitosamente' });
        }
        return NextResponse.json({ status: true, message: 'No existe ese registro de venta' });
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Error al actualizar la venta: ', error: error });
    }
}

async function editSell(data) {
    console.log(data);
    const { usuario_id, fecha, total, id } = data
    return new Promise((resolve, reject) => {
        const query = 'UPDATE ventas SET usuario_id = ?, fecha = ?, total = ? WHERE id = ?';
        const values = [usuario_id, fecha, total, id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
}