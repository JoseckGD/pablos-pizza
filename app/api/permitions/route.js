import { NextResponse } from 'next/server';
import dbPizzeriaConnection from '../../../utils/dbPizzeriaConnection';

export async function POST(req, res) {
    const body = await req.json();
    const { operation } = body;

    const handlers = {
        create: handleCreatePermission,
        read: handleReadPermissions,
        update: handleUpdatePermission,
        delete: handleDeletePermission,
    };

    const handler = handlers[operation] || handleInvalidOperation;
    return await handler(body);
}

export async function GET(req, res) {
    return await handleReadPermissions();
}

async function handleCreatePermission(data) {
    const { rol_id, permiso_id } = data;
    try {
        const createdPermission = await crearPermiso(rol_id, permiso_id);
        return respond(true, 'Permiso creado exitosamente', createdPermission);
    } catch (error) {
        return respond(false, 'Error from the API! ' + error);
    }
}

async function handleReadPermissions() {
    try {
        const permissions = await leerPermisos();
        return respond(true, 'Permisos obtenidos exitosamente', permissions);
    } catch (error) {
        return respond(false, 'Error from the API! ' + error);
    }
}

async function handleUpdatePermission(data) {
    const { id, rol_id, permiso_id } = data;
    try {
        await actualizarPermiso(id, rol_id, permiso_id);
        return respond(true, 'Permiso actualizado exitosamente');
    } catch (error) {
        return respond(false, 'Error from the API! ' + error);
    }
}

async function handleDeletePermission(data) {
    const { id } = data;
    try {
        await eliminarPermiso(id);
        return respond(true, 'Permiso eliminado exitosamente');
    } catch (error) {
        return respond(false, 'Error from the API! ' + error);
    }
}

async function handleInvalidOperation() {
    return respond(false, 'Operación no válida');
}

async function crearPermiso(rol_id, permiso_id) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tabla_permisos (rol_id, permiso_id) VALUES (?, ?)';
        const values = [rol_id, permiso_id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

async function leerPermisos() {
    async function leerPermisos() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM permisos';
            dbPizzeriaConnection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    
}

async function actualizarPermiso(id, rol_id, permiso_id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE tabla_permisos SET rol_id = ?, permiso_id = ? WHERE id = ?';
        const values = [rol_id, permiso_id, id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

async function eliminarPermiso(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM tabla_permisos WHERE id = ?';
        const values = [id];
        dbPizzeriaConnection.query(query, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function respond(status, message, data = null) {
    return NextResponse.json({ status, message, data });
}
