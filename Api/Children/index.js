import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Children, { schema } from './model'

const router = new Router()
const { name, fecha_nacimiento, user_id } = schema.tree

/**
 * @api {post} /Children Create children
 * @apiName CreateChildren
 * @apiGroup Children
 * @apiParam name Children's name.
 * @apiParam fecha_nacimiento Children's fecha_nacimiento.
 * @apiParam user_id Children's user_id.
 * @apiSuccess {Object} children Children's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Children not found.
 */
router.post('/',
  body({ name, fecha_nacimiento, user_id }),
  create)

/**
 * @api {get} /Children Retrieve children
 * @apiName RetrieveChildren
 * @apiGroup Children
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of children.
 * @apiSuccess {Object[]} rows List of children.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Children/:id Retrieve children
 * @apiName RetrieveChildren
 * @apiGroup Children
 * @apiSuccess {Object} children Children's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Children not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Children/:id Update children
 * @apiName UpdateChildren
 * @apiGroup Children
 * @apiParam name Children's name.
 * @apiParam fecha_nacimiento Children's fecha_nacimiento.
 * @apiParam user_id Children's user_id.
 * @apiSuccess {Object} children Children's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Children not found.
 */
router.put('/:id',
  body({ name, fecha_nacimiento, user_id }),
  update)

/**
 * @api {delete} /Children/:id Delete children
 * @apiName DeleteChildren
 * @apiGroup Children
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Children not found.
 */
router.delete('/:id',
  destroy)

export default router
