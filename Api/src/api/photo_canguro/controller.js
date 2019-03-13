import { success, notFound } from '../../services/response/'
import { PhotoCanguro } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  PhotoCanguro.create(body)
    .then((photoCanguro) => photoCanguro.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PhotoCanguro.count(query)
    .then(count => PhotoCanguro.find(query, select, cursor)
      .then((photoCanguros) => ({
        count,
        rows: photoCanguros.map((photoCanguro) => photoCanguro.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PhotoCanguro.findById(params.id)
    .then(notFound(res))
    .then((photoCanguro) => photoCanguro ? photoCanguro.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  PhotoCanguro.findById(params.id)
    .then(notFound(res))
    .then((photoCanguro) => photoCanguro ? Object.assign(photoCanguro, body).save() : null)
    .then((photoCanguro) => photoCanguro ? photoCanguro.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PhotoCanguro.findById(params.id)
    .then(notFound(res))
    .then((photoCanguro) => photoCanguro ? photoCanguro.remove() : null)
    .then(success(res, 204))
    .catch(next)
