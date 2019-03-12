import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Child } from '.'

const app = () => express(apiRoot, routes)

let child

beforeEach(async () => {
  child = await Child.create({})
})

test('POST /Children 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', fecha_nacimiento: 'test', user_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.fecha_nacimiento).toEqual('test')
  expect(body.user_id).toEqual('test')
})

test('GET /Children 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /Children/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${child.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(child.id)
})

test('GET /Children/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Children/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${child.id}`)
    .send({ name: 'test', fecha_nacimiento: 'test', user_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(child.id)
  expect(body.name).toEqual('test')
  expect(body.fecha_nacimiento).toEqual('test')
  expect(body.user_id).toEqual('test')
})

test('PUT /Children/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', fecha_nacimiento: 'test', user_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Children/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${child.id}`)
  expect(status).toBe(204)
})

test('DELETE /Children/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
