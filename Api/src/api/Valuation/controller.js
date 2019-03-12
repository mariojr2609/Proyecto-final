import { success, notFound } from '../../services/response/'
import { Valuation } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Valuation.create(body)
    .then((valuation) => valuation.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Valuation.count(query)
    .then(count => Valuation.find(query, select, cursor)
      .then((valuations) => ({
        count,
        rows: valuations.map((valuation) => valuation.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Valuation.findById(params.id)
    .then(notFound(res))
    .then((valuation) => valuation ? valuation.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Valuation.findById(params.id)
    .then(notFound(res))
    .then((valuation) => valuation ? Object.assign(valuation, body).save() : null)
    .then((valuation) => valuation ? valuation.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Valuation.findById(params.id)
    .then(notFound(res))
    .then((valuation) => valuation ? valuation.remove() : null)
    .then(success(res, 204))
    .catch(next)
