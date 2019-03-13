import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Guarderia, { schema } from './model'

const router = new Router()
const { name, photo, phone, address, city, description, loc } = schema.tree

/**
 * @api {post} /guarderias Create guarderia
 * @apiName CreateGuarderia
 * @apiGroup Guarderia
 * @apiParam name Guarderia's name.
 * @apiParam photo Guarderia's photo.
 * @apiParam phone Guarderia's phone.
 * @apiParam address Guarderia's address.
 * @apiParam city Guarderia's city.
 * @apiParam description Guarderia's description.
 * @apiParam loc Guarderia's loc.
 * @apiSuccess {Object} guarderia Guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guarderia not found.
 */
router.post('/',
  body({ name, photo, phone, address, city, description, loc }),
  create)

/**
 * @api {get} /guarderias Retrieve guarderias
 * @apiName RetrieveGuarderias
 * @apiGroup Guarderia
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of guarderias.
 * @apiSuccess {Object[]} rows List of guarderias.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /guarderias/:id Retrieve guarderia
 * @apiName RetrieveGuarderia
 * @apiGroup Guarderia
 * @apiSuccess {Object} guarderia Guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guarderia not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /guarderias/:id Update guarderia
 * @apiName UpdateGuarderia
 * @apiGroup Guarderia
 * @apiParam name Guarderia's name.
 * @apiParam photo Guarderia's photo.
 * @apiParam phone Guarderia's phone.
 * @apiParam address Guarderia's address.
 * @apiParam city Guarderia's city.
 * @apiParam description Guarderia's description.
 * @apiParam loc Guarderia's loc.
 * @apiSuccess {Object} guarderia Guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guarderia not found.
 */
router.put('/:id',
  body({ name, photo, phone, address, city, description, loc }),
  update)

/**
 * @api {delete} /guarderias/:id Delete guarderia
 * @apiName DeleteGuarderia
 * @apiGroup Guarderia
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Guarderia not found.
 */
router.delete('/:id',
  destroy)

export default router
