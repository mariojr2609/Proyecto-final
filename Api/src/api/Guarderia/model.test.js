import { Guarderia } from '.'

let guarderia

beforeEach(async () => {
  guarderia = await Guarderia.create({ name: 'test', photo: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', description: 'test', loc: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = guarderia.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(guarderia.id)
    expect(view.name).toBe(guarderia.name)
    expect(view.photo).toBe(guarderia.photo)
    expect(view.address).toBe(guarderia.address)
    expect(view.zipcode).toBe(guarderia.zipcode)
    expect(view.city).toBe(guarderia.city)
    expect(view.province).toBe(guarderia.province)
    expect(view.description).toBe(guarderia.description)
    expect(view.loc).toBe(guarderia.loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = guarderia.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(guarderia.id)
    expect(view.name).toBe(guarderia.name)
    expect(view.photo).toBe(guarderia.photo)
    expect(view.address).toBe(guarderia.address)
    expect(view.zipcode).toBe(guarderia.zipcode)
    expect(view.city).toBe(guarderia.city)
    expect(view.province).toBe(guarderia.province)
    expect(view.description).toBe(guarderia.description)
    expect(view.loc).toBe(guarderia.loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
