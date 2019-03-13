import { Valuation } from '.'

let valuation

beforeEach(async () => {
  valuation = await Valuation.create({ name: 'test', opinion: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = valuation.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(valuation.id)
    expect(view.name).toBe(valuation.name)
    expect(view.opinion).toBe(valuation.opinion)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = valuation.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(valuation.id)
    expect(view.name).toBe(valuation.name)
    expect(view.opinion).toBe(valuation.opinion)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
