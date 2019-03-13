import { success, notFound } from '../../services/response/'
import { Canguro } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Canguro.create(body)
    .then((canguro) => canguro.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Canguro.count(query)
    .then(count => Canguro.find(query, select, cursor)
      .then((canguros) => ({
        count,
        rows: canguros.map((canguro) => canguro.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Canguro.findById(params.id)
    .then(notFound(res))
    .then((canguro) => canguro ? canguro.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Canguro.findById(params.id)
    .then(notFound(res))
    .then((canguro) => canguro ? Object.assign(canguro, body).save() : null)
    .then((canguro) => canguro ? canguro.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Canguro.findById(params.id)
    .then(notFound(res))
    .then((canguro) => canguro ? canguro.remove() : null)
    .then(success(res, 204))
    .catch(next)
