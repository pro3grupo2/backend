// Autor       : Adrian Toral, Ivan Guio
// Fecha       : 2024-02-17
// Descripcion : Punta de entrada de la aplicacion

express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const serveIndex = require('serve-index')

const rfs = require('rotating-file-stream')
const router_v1 = require('./routes/v1')
const path = require('path')

// Load environment variables
require('dotenv').config()
require('./databases')

// Create express application and define port
const app = express()
const port = process.env.PORT

/**
 * Use express.json middleware to parse incoming requests with JSON payloads
 */
app.use(express.json())

/**
 * Use cors middleware to enable Cross Origin Resource Sharing
 */
app.use(cors())

/**
 * Use morgan middleware for logging HTTP requests
 * @param {string} format - predefined format string 'tiny'
 * @param {object} options - stream for output
 */
app.use(morgan('combined', {
    stream: rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, 'logs')
    })
}))

/**
 * Use router_v1 for handling routes starting with '/api/v1'
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
app.use('/api/v1', router_v1)

/**
 * Serve static files from the 'logs' directory
 * Serve directory listings for the 'logs' directory
 * @param {string} path - Express path
 * @param {function} middleware - Express static serve middleware
 */
app.use('/logs', serveIndex(path.join(__dirname, 'logs'), {'icons': true}))
app.use('/logs', express.static(path.join(__dirname, 'logs')))

/**
 * Serve static files from the 'files' directory
 * @param {string} path - Express path
 * @param {function} middleware - Express static serve middleware
 */
app.use('/files', serveIndex('/files', {'icons': true}))
app.use('/files', express.static('/files'))

// Start server
app.listen(port, () => {
    console.log(`[*] API is listening on port ${port}`)
})