import { Canguro } from '.'

let canguro

beforeEach(async () => {
  canguro = await Canguro.create({ name: 'test', photo: 'test', age: 'test', address: 'test', zipcode: 'test', city: 'test', province: 'test', studies: 'test', loc: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = canguro.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(canguro.id)
    expect(view.name).toBe(canguro.name)
    expect(view.photo).toBe(canguro.photo)
    expect(view.age).toBe(canguro.age)
    expect(view.address).toBe(canguro.address)
    expect(view.zipcode).toBe(canguro.zipcode)
    expect(view.city).toBe(canguro.city)
    expect(view.province).toBe(canguro.province)
    expect(view.studies).toBe(canguro.studies)
    expect(view.loc).toBe(canguro.loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = canguro.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(canguro.id)
    expect(view.name).toBe(canguro.name)
    expect(view.photo).toBe(canguro.photo)
    expect(view.age).toBe(canguro.age)
    expect(view.address).toBe(canguro.address)
    expect(view.zipcode).toBe(canguro.zipcode)
    expect(view.city).toBe(canguro.city)
    expect(view.province).toBe(canguro.province)
    expect(view.studies).toBe(canguro.studies)
    expect(view.loc).toBe(canguro.loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
