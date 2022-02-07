const express=require('express');
const app=express();
const port=3000;

//middleware
const morgan=require('morgan');
app.use(morgan('combined'));
app.use(morgan('dev'));

//instalar 
//npm install connect-timeout
const timeout = require('connect-timeout');
app.use(timeout('5s'));

var cookieParser = require('cookie-parser')
app.use(cookieParser())

//para usar EJS
app.set('view engine','ejs');

//se define que use la carpeta public 
//asi si se pone /index.html, le dirige a 
// /public/index.html
app.use(express.static('public'));
//usar views
app.use(express.static('views'));

//para configurar los valores iniciales de la aplicacion
//se usa el concepto de settitng
//declaramos el nombre de la app
app.set('nombreApp','Aplicacion para manejo de gastos SRI');
//se imprime la informacion
console.log(app.get('nombreApp'));


//tambien es posible configurar el valor del puerto del servidor
/*
app.set('puerto',4000);
app.listen(app.get('puerto'),()=>{
    console.log('Nombre de la App',app.get('nombreApp'));
    console.log('Puerto del servidor',app.get('puerto'));
});
*/

//llamar a la vista de views
app.get('/indexejs',(req,res)=>{
    res.render('index.ejs');
    console.log('Cookies: ', req.cookies);
});

function logger(req,res,next){
    console.log('Ruta Recibida'+req.protocol+'://'+req.get('host')+req.originalUrl);
    next();
}

app.use(express.json());

app.get('/misitio', (req,res)=>{
    res.send('Bienvenido a mi sitio web, nombre: Jair');
});

app.listen(port, ()=>{
    console.log('Servidor escuchado en el puerto ' + port);
});

app.get('/misitio/about', (req,res)=>{
    res.send('<h1>Acerca de nosotros</h1>');
});

app.get('/misitio/gastos', (req,res)=>{
    res.json(
        {
            gasto:'Salud',
            monto:14575.60,
            informacion:'Corresponde a consultas medicas, pagos de seguros, medicinas'
        }
    );
});

app.post('/misitio/calculo', (req,res)=>{
    console.log(req.body);
    res.send('Calculo impuesto a la renta');
});

//para registro de nuevos usuarios
app.post('/misitio/usuario/:id', (req,res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('Usuario nuevo registrado');
});

//para actualizar datos del usuario
app.put('/misitio/usuario/:id', (req,res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send(`Usuario actualizado`);
});

//metodo delete
app.delete('/misitio/usuario/:id', (req,res)=>{
    res.send('Usuario '+req.params.id+' borrado');
});

