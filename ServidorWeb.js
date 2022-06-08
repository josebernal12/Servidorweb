const fs = require('fs')
//CONFIGURACION EXPRESS
const express = require('express')
const app = express()
const puerto = 8080

//CLASE
class Contenedor {
    constructor(nombredearchivos) {
        this.nombredearchivos = nombredearchivos
        fs.promises.writeFile(`./${this.nombredearchivos}`, '')
    }
    async save(objeto) {
        let data = await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8')
        if (!data) {
            objeto.id = 1
            const arr = [objeto]
            await fs.promises.writeFile(`./${this.nombredearchivos}`, JSON.stringify(arr))
            return objeto.id
        } else {
            data = JSON.parse(data);
            objeto.id = data.length + 1
            data.push(objeto)
            await fs.promises.writeFile(`./${this.nombredearchivos}`, JSON.stringify(data))
            return objeto.id
        }

    }
    async getByid(id) {
        let data = JSON.parse(await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8'))
        return data[id - 1]

    }
    async getAll() {
        try {
            let data = await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8')
            data = JSON.parse(data);
            return data
        } catch {
            console.log('error entro al catch')
        }
    }
    async deleteById(id) {

        let data = JSON.parse(await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8'))
        const indice = id - 1
        data[indice] = null
        await fs.promises.writeFile(`./${this.nombredearchivos}`, JSON.stringify(data))

    }
    async deleteAll() {
        JSON.parse(await fs.promises.readFile(`./${this.nombredearchivos}`, '[]'))

    }
}

const productos = new Contenedor('productos.txt')

const objeto1 = {

    tittle: 'borrador',
    price: 5
}
const objeto2 = {
    tittle: 'lapiz',
    price: 10
}
const objeto3 = {
    tittle: 'cuaderno',
    price: 20
}
const objeto4 = {
    tittle: 'Sacapunta',
    price: 10
}
const test = async () => {
    await productos.save(objeto1)
    await productos.save(objeto2)
    await productos.save(objeto3)
    await productos.save(objeto4)
    await productos.getByid(3)

    await productos.getAll()
    await productos.deleteById(2)
    await productos.deleteAll
}
test()

// RUTAS
app.get('/', (req, res) => {
    res.send('trabajo entregable')

})
app.get('/producto', async (req, res) => {
    const response = await productos.getAll()
    res.send(response)
})

app.get('/productoRandom', async (req, res) => {

    const response = await productos.getAll()
    const aleatorio = response[Math.floor(Math.random() * response.length)];
    res.send(aleatorio)
})

//  CODIGO PARA QUE EL PUERTO ESCUCHE


app.listen(puerto, () => {
    console.log(`Servidor escuchando el puerto ${puerto}`)

})

