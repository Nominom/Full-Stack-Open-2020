const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {logger.info('connected to MongoDB')})
	.catch((error) => {
		logger.error('Error connecting to MongoDB: ', error.message)
	})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})