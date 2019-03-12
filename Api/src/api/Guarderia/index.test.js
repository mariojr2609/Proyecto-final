import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Guarderia } from '.'

const app = () => express(apiRoot, routes)

let guarderia

beforeEach(async () => {
  guarderia = await Guarderia.create({})
})

test('POST /Guarderias 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', photo: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', description: 'test', loc: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.photo).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.zipcode).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.province).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.loc).toEqual('test')
})

test('GET /Guarderias 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /Guarderias/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${guarderia.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(guarderia.id)
})

test('GET /Guarderias/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Guarderias/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${guarderia.id}`)
    .send({ name: 'test', photo: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', description: 'test', loc: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(guarderia.id)
  expect(body.name).toEqual('test')
  expect(body.photo).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.zipcode).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.province).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.loc).toEqual('test')
})

test('PUT /Guarderias/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', photo: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', description: 'test', loc: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Guarderias/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${guarderia.id}`)
  expect(status).toBe(204)
})

test('DELETE /Guarderias/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
