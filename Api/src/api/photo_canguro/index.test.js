import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { PhotoCanguro } from '.'

const app = () => express(apiRoot, routes)

let photoCanguro

beforeEach(async () => {
  photoCanguro = await PhotoCanguro.create({})
})

test('POST /photo_canguros 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ canguro_id: 'test', imggu[r_link: 'test', deletehashr_link: 'test', deletehash: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.canguro_id).toEqual('test')
  expect(body.imggu[r_link).toEqual('test')
  expect(body.deletehashr_link).toEqual('test')
  expect(body.deletehash).toEqual('test')
})

test('GET /photo_canguros 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /photo_canguros/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${photoCanguro.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photoCanguro.id)
})

test('GET /photo_canguros/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /photo_canguros/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${photoCanguro.id}`)
    .send({ canguro_id: 'test', imggu[r_link: 'test', deletehashr_link: 'test', deletehash: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photoCanguro.id)
  expect(body.canguro_id).toEqual('test')
  expect(body.imggu[r_link).toEqual('test')
  expect(body.deletehashr_link).toEqual('test')
  expect(body.deletehash).toEqual('test')
})

test('PUT /photo_canguros/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ canguro_id: 'test', imggu[r_link: 'test', deletehashr_link: 'test', deletehash: 'test' })
  expect(status).toBe(404)
})

test('DELETE /photo_canguros/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${photoCanguro.id}`)
  expect(status).toBe(204)
})

test('DELETE /photo_canguros/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
