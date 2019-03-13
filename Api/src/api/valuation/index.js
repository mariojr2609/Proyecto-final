import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Valuation, { schema } from './model'

const router = new Router()
const { name, opinion } = schema.tree

/**
 * @api {post} /valuations Create valuation
 * @apiName CreateValuation
 * @apiGroup Valuation
 * @apiParam name Valuation's name.
 * @apiParam opinion Valuation's opinion.
 * @apiSuccess {Object} valuation Valuation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Valuation not found.
 */
router.post('/',
  body({ name, opinion }),
  create)

/**
 * @api {get} /valuations Retrieve valuations
 * @apiName RetrieveValuations
 * @apiGroup Valuation
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of valuations.
 * @apiSuccess {Object[]} rows List of valuations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /valuations/:id Retrieve valuation
 * @apiName RetrieveValuation
 * @apiGroup Valuation
 * @apiSuccess {Object} valuation Valuation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Valuation not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /valuations/:id Update valuation
 * @apiName UpdateValuation
 * @apiGroup Valuation
 * @apiParam name Valuation's name.
 * @apiParam opinion Valuation's opinion.
 * @apiSuccess {Object} valuation Valuation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Valuation not found.
 */
router.put('/:id',
  body({ name, opinion }),
  update)

/**
 * @api {delete} /valuations/:id Delete valuation
 * @apiName DeleteValuation
 * @apiGroup Valuation
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Valuation not found.
 */
router.delete('/:id',
  destroy)

export default router
