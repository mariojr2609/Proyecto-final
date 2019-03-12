import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Canguro } from '.'

const app = () => express(apiRoot, routes)

let canguro

beforeEach(async () => {
  canguro = await Canguro.create({})
})

test('POST /Canguros 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', photo: 'test', age: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', studies: 'test', loc: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.photo).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.zipcode).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.province).toEqual('test')
  expect(body.studies).toEqual('test')
  expect(body.loc).toEqual('test')
})

test('GET /Canguros 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /Canguros/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${canguro.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(canguro.id)
})

test('GET /Canguros/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /Canguros/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${canguro.id}`)
    .send({ name: 'test', photo: 'test', age: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', studies: 'test', loc: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(canguro.id)
  expect(body.name).toEqual('test')
  expect(body.photo).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.zipcode).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.province).toEqual('test')
  expect(body.studies).toEqual('test')
  expect(body.loc).toEqual('test')
})

test('PUT /Canguros/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', photo: 'test', age: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', studies: 'test', loc: 'test' })
  expect(status).toBe(404)
})

test('DELETE /Canguros/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${canguro.id}`)
  expect(status).toBe(204)
})

test('DELETE /Canguros/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
