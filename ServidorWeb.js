const fs = require('fs')

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
        try {

            let data = JSON.parse(await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8'))
            data = data.find(product => product.id === id)
            data ? console.log(data) : null
        } catch {
            console.log('entro al catch')
        }


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
        try {
            let data = await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8')
            data = JSON.parse(data);
            data = data.filter(res => res.id !== id)
            await fs.promises.writeFile(`./${this.nombredearchivos}`, JSON.stringify(data))

            console.log(data)

        } catch {
            console.log('error entro al catch')
        }
    }



    async deleteAll() {
        try {
            let data = JSON.parse(await fs.promises.readFile(`./${this.nombredearchivos}`, 'utf-8'))
            data = JSON.parse(data);
            data = []
            console.log(data)

        } catch {
            console.log('hubo un error entro al catch')
        }


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
    await productos.getByid(1)
    await productos.getAll()
    await productos.deleteById(2)
    await productos.deleteAll
}
test()

const express = require('express')
const app = express()
const puerto = 8080



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

app.get('/Contenedor', async (req, res) => {
   
    const response = await productos.getByid(1)
    res.send(response)
   
   



})






app.listen(puerto, () => {
    console.log(`Servidor escuchando el puerto ${puerto}`)

})

