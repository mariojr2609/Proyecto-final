import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export PhotoCanguro, { schema } from './model'

const router = new Router()
const { canguro_id, imggu[r_link, deletehashr_link, deletehash } = schema.tree

/**
 * @api {post} /photo_canguros Create photo canguro
 * @apiName CreatePhotoCanguro
 * @apiGroup PhotoCanguro
 * @apiParam canguro_id Photo canguro's canguro_id.
 * @apiParam imggu[r_link Photo canguro's imggu[r_link.
 * @apiParam deletehashr_link Photo canguro's deletehashr_link.
 * @apiParam deletehash Photo canguro's deletehash.
 * @apiSuccess {Object} photoCanguro Photo canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo canguro not found.
 */
router.post('/',
  body({ canguro_id, imggu[r_link, deletehashr_link, deletehash }),
  create)

/**
 * @api {get} /photo_canguros Retrieve photo canguros
 * @apiName RetrievePhotoCanguros
 * @apiGroup PhotoCanguro
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of photo canguros.
 * @apiSuccess {Object[]} rows List of photo canguros.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /photo_canguros/:id Retrieve photo canguro
 * @apiName RetrievePhotoCanguro
 * @apiGroup PhotoCanguro
 * @apiSuccess {Object} photoCanguro Photo canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo canguro not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /photo_canguros/:id Update photo canguro
 * @apiName UpdatePhotoCanguro
 * @apiGroup PhotoCanguro
 * @apiParam canguro_id Photo canguro's canguro_id.
 * @apiParam imggu[r_link Photo canguro's imggu[r_link.
 * @apiParam deletehashr_link Photo canguro's deletehashr_link.
 * @apiParam deletehash Photo canguro's deletehash.
 * @apiSuccess {Object} photoCanguro Photo canguro's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Photo canguro not found.
 */
router.put('/:id',
  body({ canguro_id, imggu[r_link, deletehashr_link, deletehash }),
  update)

/**
 * @api {delete} /photo_canguros/:id Delete photo canguro
 * @apiName DeletePhotoCanguro
 * @apiGroup PhotoCanguro
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Photo canguro not found.
 */
router.delete('/:id',
  destroy)

export default router
