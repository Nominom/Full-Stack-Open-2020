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

test('a new blog is created', async () => {
	const newBlog = {
		title: "Blog4",
		author: "Authori",
		url: "localhost",
		likes: 55,
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	
	expect(response.body.map(r => r.title)).toContain(newBlog.title);
	expect(response.body.map(r => r.author)).toContain(newBlog.author);
	expect(response.body.map(r => r.url)).toContain(newBlog.url);
	expect(response.body.map(r => r.likes)).toContain(newBlog.likes);
})

afterAll(() => {
	mongoose.connection.close()
})