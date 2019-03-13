import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Canguro, { schema } from './model'

const router = new Router()
const { name, photo, phone, age, address, city, studies, loc } = schema.tree

/**
 * @api {post} /canguros Create canguro
 * @apiName CreateCanguro
 * @apiGroup Canguro
 * @apiParam name Canguro's name.
 * @apiParam photo Canguro's photo.
 * @apiParam phone Canguro's phone.
 * @apiParam age Canguro's age.
 * @apiParam address Canguro's address.
 * @apiParam city Canguro's city.
 * @apiParam studies Canguro's studies.
 * @apiParam loc Canguro's loc.
 * @apiSuccess {Object} canguro Canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canguro not found.
 */
router.post('/',
  body({ name, photo, phone, age, address, city, studies, loc }),
  create)

/**
 * @api {get} /canguros Retrieve canguros
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
 * @api {get} /canguros/:id Retrieve canguro
 * @apiName RetrieveCanguro
 * @apiGroup Canguro
 * @apiSuccess {Object} canguro Canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canguro not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /canguros/:id Update canguro
 * @apiName UpdateCanguro
 * @apiGroup Canguro
 * @apiParam name Canguro's name.
 * @apiParam photo Canguro's photo.
 * @apiParam phone Canguro's phone.
 * @apiParam age Canguro's age.
 * @apiParam address Canguro's address.
 * @apiParam city Canguro's city.
 * @apiParam studies Canguro's studies.
 * @apiParam loc Canguro's loc.
 * @apiSuccess {Object} canguro Canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Canguro not found.
 */
router.put('/:id',
  body({ name, photo, phone, age, address, city, studies, loc }),
  update)

/**
 * @api {delete} /canguros/:id Delete canguro
 * @apiName DeleteCanguro
 * @apiGroup Canguro
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Canguro not found.
 */
router.delete('/:id',
  destroy)

export default router
