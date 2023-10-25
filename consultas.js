const { Pool } = require('pg')
const bcrypt = require('bcryptjs')


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'naldi1291',
    database: 'vida_sana',
    allowExitOnIdle: true
})

const getEventos = async () => {
    const { rows: eventos } = await pool.query("SELECT * FROM eventos")
    return eventos
}

const deleteEvento = async (id) => {
    const consulta = "DELETE FROM eventos WHERE id = $1"
    const values = [id]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún evento con este ID" }
}

const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" }
    }
    
    
const actualizarEvento = async (lugar, id) => {
    const consulta = "UPDATE eventos SET lugar = $1 WHERE id = $2"
    const values = [lugar, id]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún evento con este ID" }
}

const registrarUsuario = async (usuario) => {
    let { email, password } = usuario
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [email, passwordEncriptada]
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2)"
    await pool.query(consulta, values)
    }
    

module.exports = { getEventos, deleteEvento, verificarCredenciales, actualizarEvento, registrarUsuario }
