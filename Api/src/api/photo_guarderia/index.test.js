import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { PhotoGuarderia } from '.'

const app = () => express(apiRoot, routes)

let photoGuarderia

beforeEach(async () => {
  photoGuarderia = await PhotoGuarderia.create({})
})

test('POST /photo_guarderias 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ guarderia_id: 'test', imggur_link: 'test', deletehash: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.guarderia_id).toEqual('test')
  expect(body.imggur_link).toEqual('test')
  expect(body.deletehash).toEqual('test')
})

test('GET /photo_guarderias 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /photo_guarderias/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${photoGuarderia.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photoGuarderia.id)
})

test('GET /photo_guarderias/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /photo_guarderias/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${photoGuarderia.id}`)
    .send({ guarderia_id: 'test', imggur_link: 'test', deletehash: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photoGuarderia.id)
  expect(body.guarderia_id).toEqual('test')
  expect(body.imggur_link).toEqual('test')
  expect(body.deletehash).toEqual('test')
})

test('PUT /photo_guarderias/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ guarderia_id: 'test', imggur_link: 'test', deletehash: 'test' })
  expect(status).toBe(404)
})

test('DELETE /photo_guarderias/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${photoGuarderia.id}`)
  expect(status).toBe(204)
})

test('DELETE /photo_guarderias/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
