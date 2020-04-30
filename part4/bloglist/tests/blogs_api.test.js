const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const noteObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = noteObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('correct amount of blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
	mongoose.connection.close()
})