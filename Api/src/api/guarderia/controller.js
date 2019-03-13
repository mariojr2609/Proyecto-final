import { success, notFound } from '../../services/response/'
import { Guarderia } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Guarderia.create(body)
    .then((guarderia) => guarderia.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Guarderia.count(query)
    .then(count => Guarderia.find(query, select, cursor)
      .then((guarderias) => ({
        count,
        rows: guarderias.map((guarderia) => guarderia.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Guarderia.findById(params.id)
    .then(notFound(res))
    .then((guarderia) => guarderia ? guarderia.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Guarderia.findById(params.id)
    .then(notFound(res))
    .then((guarderia) => guarderia ? Object.assign(guarderia, body).save() : null)
    .then((guarderia) => guarderia ? guarderia.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Guarderia.findById(params.id)
    .then(notFound(res))
    .then((guarderia) => guarderia ? guarderia.remove() : null)
    .then(success(res, 204))
    .catch(next)
