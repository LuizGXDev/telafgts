import express from 'express';
import cors from "cors";
import session from 'express-session';
import mysqlSession from 'express-mysql-session';
import rotasPublicas from '../Routes/rotasPublicas.js';

const app = express();
app.use(express.json());

// Configuração do CORS - Permitir requisições do frontend
app.use(cors({
    origin: 'https://lightgrey-shark-932846.hostingersite.com', // Seu frontend
    credentials: true, // Permitir cookies/sessões
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const portRunning = 3000;

// Criando a Store para MySQL
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'fgtsnovo'
});

// Configuração da Sessão - Para manter o login do usuário
app.use(session({
    secret: 'dakota@fgts',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: false,  // true se HTTPS
        httpOnly: true,
        maxAge: 3600000 // Sessão dura 1 hora
    }
}));

// Usando as rotas públicas sem prefixo /api
app.use('/admin', rotasPublicas);

// Iniciar o Servidor
app.listen(portRunning, () => {
    console.log(`Servidor  rodando na porta ${portRunning}`);
});
