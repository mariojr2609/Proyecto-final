import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Child, { schema } from './model'

const router = new Router()
const { name, fecha_nacimiento, user_id } = schema.tree

/**
 * @api {post} /Children Create child
 * @apiName CreateChild
 * @apiGroup Child
 * @apiParam name Child's name.
 * @apiParam fecha_nacimiento Child's fecha_nacimiento.
 * @apiParam user_id Child's user_id.
 * @apiSuccess {Object} child Child's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Child not found.
 */
router.post('/',
  body({ name, fecha_nacimiento, user_id }),
  create)

/**
 * @api {get} /Children Retrieve children
 * @apiName RetrieveChildren
 * @apiGroup Child
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of children.
 * @apiSuccess {Object[]} rows List of children.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Children/:id Retrieve child
 * @apiName RetrieveChild
 * @apiGroup Child
 * @apiSuccess {Object} child Child's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Child not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Children/:id Update child
 * @apiName UpdateChild
 * @apiGroup Child
 * @apiParam name Child's name.
 * @apiParam fecha_nacimiento Child's fecha_nacimiento.
 * @apiParam user_id Child's user_id.
 * @apiSuccess {Object} child Child's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Child not found.
 */
router.put('/:id',
  body({ name, fecha_nacimiento, user_id }),
  update)

/**
 * @api {delete} /Children/:id Delete child
 * @apiName DeleteChild
 * @apiGroup Child
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Child not found.
 */
router.delete('/:id',
  destroy)

export default router
