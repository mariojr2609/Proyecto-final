import { success, notFound } from '../../services/response/'
import { Child } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Child.create(body)
    .then((child) => child.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Child.count(query)
    .then(count => Child.find(query, select, cursor)
      .then((children) => ({
        count,
        rows: children.map((child) => child.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Child.findById(params.id)
    .then(notFound(res))
    .then((child) => child ? child.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Child.findById(params.id)
    .then(notFound(res))
    .then((child) => child ? Object.assign(child, body).save() : null)
    .then((child) => child ? child.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Child.findById(params.id)
    .then(notFound(res))
    .then((child) => child ? child.remove() : null)
    .then(success(res, 204))
    .catch(next)
