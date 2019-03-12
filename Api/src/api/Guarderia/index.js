import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Guarderia, { schema } from './model'

const router = new Router()
const { name, photo, address, zipcode, city, province, description, loc } = schema.tree

/**
 * @api {post} /Guarderias Create guarderia
 * @apiName CreateGuarderia
 * @apiGroup Guarderia
 * @apiParam name Guarderia's name.
 * @apiParam photo Guarderia's photo.
 * @apiParam address Guarderia's address.
 * @apiParam zipcode Guarderia's zipcode.
 * @apiParam city Guarderia's city.
 * @apiParam province Guarderia's province.
 * @apiParam description Guarderia's description.
 * @apiParam loc Guarderia's loc.
 * @apiSuccess {Object} guarderia Guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guarderia not found.
 */
router.post('/',
  body({ name, photo, address, zipcode, city, province, description, loc }),
  create)

/**
 * @api {get} /Guarderias Retrieve guarderias
 * @apiName RetrieveGuarderias
 * @apiGroup Guarderia
 * @apiUse listParams
 * @apiSuccess {Object[]} guarderias List of guarderias.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Guarderias/:id Retrieve guarderia
 * @apiName RetrieveGuarderia
 * @apiGroup Guarderia
 * @apiSuccess {Object} guarderia Guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guarderia not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Guarderias/:id Update guarderia
 * @apiName UpdateGuarderia
 * @apiGroup Guarderia
 * @apiParam name Guarderia's name.
 * @apiParam photo Guarderia's photo.
 * @apiParam address Guarderia's address.
 * @apiParam zipcode Guarderia's zipcode.
 * @apiParam city Guarderia's city.
 * @apiParam province Guarderia's province.
 * @apiParam description Guarderia's description.
 * @apiParam loc Guarderia's loc.
 * @apiSuccess {Object} guarderia Guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Guarderia not found.
 */
router.put('/:id',
  body({ name, photo, address, zipcode, city, province, description, loc }),
  update)

/**
 * @api {delete} /Guarderias/:id Delete guarderia
 * @apiName DeleteGuarderia
 * @apiGroup Guarderia
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Guarderia not found.
 */
router.delete('/:id',
  destroy)

export default router
