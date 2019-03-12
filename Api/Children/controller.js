import { success, notFound } from '../../services/response/'
import { Children } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Children.create(body)
    .then((children) => children.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Children.count(query)
    .then(count => Children.find(query, select, cursor)
      .then((children) => ({
        count,
        rows: children.map((children) => children.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Children.findById(params.id)
    .then(notFound(res))
    .then((children) => children ? children.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Children.findById(params.id)
    .then(notFound(res))
    .then((children) => children ? Object.assign(children, body).save() : null)
    .then((children) => children ? children.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Children.findById(params.id)
    .then(notFound(res))
    .then((children) => children ? children.remove() : null)
    .then(success(res, 204))
    .catch(next)
