import { success, notFound } from '../../services/response/'
import { PhotoGuarderia } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  PhotoGuarderia.create(body)
    .then((photoGuarderia) => photoGuarderia.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PhotoGuarderia.count(query)
    .then(count => PhotoGuarderia.find(query, select, cursor)
      .then((photoGuarderias) => ({
        count,
        rows: photoGuarderias.map((photoGuarderia) => photoGuarderia.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PhotoGuarderia.findById(params.id)
    .then(notFound(res))
    .then((photoGuarderia) => photoGuarderia ? photoGuarderia.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  PhotoGuarderia.findById(params.id)
    .then(notFound(res))
    .then((photoGuarderia) => photoGuarderia ? Object.assign(photoGuarderia, body).save() : null)
    .then((photoGuarderia) => photoGuarderia ? photoGuarderia.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PhotoGuarderia.findById(params.id)
    .then(notFound(res))
    .then((photoGuarderia) => photoGuarderia ? photoGuarderia.remove() : null)
    .then(success(res, 204))
    .catch(next)
