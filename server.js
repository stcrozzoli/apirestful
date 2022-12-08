// Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
// //////////////////////GET '/api/productos' -> devuelve todos los productos.
// //////////////////////GET '/api/productos/:id' -> devuelve un producto según su id.
// ////////////////////// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.

let productos = [
    {
        title: 'Llave de oro',
        price: 3700,
        thumbnail: 'https://previews.123rf.com/images/pulup/pulup1705/pulup170500008/77438765-llave-de-oro-sobre-un-fondo-blanco-ilustraci%C3%B3n-3d-.jpg',
        id: 1
    },
    {
        title: 'Reloj de Bolsillo',
        price: 5800,
        thumbnail: 'https://apollo-virginia.akamaized.net/v1/files/3bvur2uwmkq2-AR/image;s=360x0',
        id: 2
    },
    {
        title: 'Anillo de Obsidiana',
        price: 7000,
        thumbnail: 'https://d22fxaf9t8d39k.cloudfront.net/4550514d75d016c226d80396eee8ee891ff24c266889668438fb75fb1cb9649a45031.jpeg',
        id: 3
    }
]

const express = require('express')
const app = express()
app.use(express.static('public'))
const routeProductos = express.Router()
routeProductos.use('/api/productos/guardar',routeProductos)
app.use(express.json())
app.use('/api',routeProductos)

routeProductos.use(express.urlencoded({extended: true}))

routeProductos.get('/productos',(req, res)=> {
    res.json(productos)
})


routeProductos.get('/productos/:id',(req, res)=> {
    for (let i of productos){
        if (i.id == req.params.id){
            res.json(i)
        }else{
            // No puedo manejar el error con res.send ({error}) porque me tira el sig error en consola: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            console.log('Producto no encontrado')
        }
    }

})


routeProductos.post('/productos/guardar',(req, res)=> {
    const idUltimoProd = productos[productos.length - 1].id
    req.body.id = idUltimoProd + 1
    productos.push(req.body)
    res.json(productos)
})


routeProductos.put('/productos/:id',(req, res)=> {

    for (let i of productos){
        if (i.id == req.params.id){
            req.body.id = i.id
            productos.splice(productos.indexOf(i),1)
            productos.push(req.body)
            res.json({i: req.body})
        }else{
            console.log('Producto no encontrado')
        }
    }
  
})

routeProductos.delete('/productos/:id',(req, res)=> {
    for (let i of productos){
        if (i.id == req.params.id){
            productos.splice(productos.indexOf(i),1)
            res.send(`Producto eliminado!`)
        }else{
            console.log('Producto no encontrado')
        }
    }
})


const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))