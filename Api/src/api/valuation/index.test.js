import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Valuation } from '.'

const app = () => express(apiRoot, routes)

let valuation

beforeEach(async () => {
  valuation = await Valuation.create({})
})

test('POST /valuations 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', opinion: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.opinion).toEqual('test')
})

test('GET /valuations 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /valuations/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${valuation.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(valuation.id)
})

test('GET /valuations/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /valuations/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${valuation.id}`)
    .send({ name: 'test', opinion: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(valuation.id)
  expect(body.name).toEqual('test')
  expect(body.opinion).toEqual('test')
})

test('PUT /valuations/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', opinion: 'test' })
  expect(status).toBe(404)
})

test('DELETE /valuations/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${valuation.id}`)
  expect(status).toBe(204)
})

test('DELETE /valuations/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
