import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Canguro, { schema } from './model'

const router = new Router()
const { name, photo, age, address, zipcode, city, province, studies, loc } = schema.tree

/**
 * @api {post} /Canguros Create canguro
 * @apiName CreateCanguro
 * @apiGroup Canguro
 * @apiParam name Canguro's name.
 * @apiParam photo Canguro's photo.
 * @apiParam age Canguro's age.
 * @apiParam address Canguro's address.
 * @apiParam zipcode Canguro's zipcode.
 * @apiParam city Canguro's city.
 * @apiParam province Canguro's province.
 * @apiParam studies Canguro's studies.
 * @apiParam loc Canguro's loc.
 * @apiSuccess {Object} canguro Canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canguro not found.
 */
router.post('/',
  body({ name, photo, age, address, zipcode, city, province, studies, loc }),
  create)

/**
 * @api {get} /Canguros Retrieve canguros
 * @apiName RetrieveCanguros
 * @apiGroup Canguro
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of canguros.
 * @apiSuccess {Object[]} rows List of canguros.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /Canguros/:id Retrieve canguro
 * @apiName RetrieveCanguro
 * @apiGroup Canguro
 * @apiSuccess {Object} canguro Canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canguro not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /Canguros/:id Update canguro
 * @apiName UpdateCanguro
 * @apiGroup Canguro
 * @apiParam name Canguro's name.
 * @apiParam photo Canguro's photo.
 * @apiParam age Canguro's age.
 * @apiParam address Canguro's address.
 * @apiParam zipcode Canguro's zipcode.
 * @apiParam city Canguro's city.
 * @apiParam province Canguro's province.
 * @apiParam studies Canguro's studies.
 * @apiParam loc Canguro's loc.
 * @apiSuccess {Object} canguro Canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canguro not found.
 */
router.put('/:id',
  body({ name, photo, age, address, zipcode, city, province, studies, loc }),
  update)

/**
 * @api {delete} /Canguros/:id Delete canguro
 * @apiName DeleteCanguro
 * @apiGroup Canguro
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Canguro not found.
 */
router.delete('/:id',
  destroy)

export default router
