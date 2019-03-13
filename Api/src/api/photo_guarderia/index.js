import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export PhotoGuarderia, { schema } from './model'

const router = new Router()
const { guarderia_id, imggur_link, deletehash } = schema.tree

/**
 * @api {post} /photo_guarderias Create photo guarderia
 * @apiName CreatePhotoGuarderia
 * @apiGroup PhotoGuarderia
 * @apiParam guarderia_id Photo guarderia's guarderia_id.
 * @apiParam imggur_link Photo guarderia's imggur_link.
 * @apiParam deletehash Photo guarderia's deletehash.
 * @apiSuccess {Object} photoGuarderia Photo guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo guarderia not found.
 */
router.post('/',
  body({ guarderia_id, imggur_link, deletehash }),
  create)

/**
 * @api {get} /photo_guarderias Retrieve photo guarderias
 * @apiName RetrievePhotoGuarderias
 * @apiGroup PhotoGuarderia
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of photo guarderias.
 * @apiSuccess {Object[]} rows List of photo guarderias.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /photo_guarderias/:id Retrieve photo guarderia
 * @apiName RetrievePhotoGuarderia
 * @apiGroup PhotoGuarderia
 * @apiSuccess {Object} photoGuarderia Photo guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo guarderia not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /photo_guarderias/:id Update photo guarderia
 * @apiName UpdatePhotoGuarderia
 * @apiGroup PhotoGuarderia
 * @apiParam guarderia_id Photo guarderia's guarderia_id.
 * @apiParam imggur_link Photo guarderia's imggur_link.
 * @apiParam deletehash Photo guarderia's deletehash.
 * @apiSuccess {Object} photoGuarderia Photo guarderia's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo guarderia not found.
 */
router.put('/:id',
  body({ guarderia_id, imggur_link, deletehash }),
  update)

/**
 * @api {delete} /photo_guarderias/:id Delete photo guarderia
 * @apiName DeletePhotoGuarderia
 * @apiGroup PhotoGuarderia
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Photo guarderia not found.
 */
router.delete('/:id',
  destroy)

export default router
