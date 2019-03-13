import { PhotoGuarderia } from '.'

let photoGuarderia

beforeEach(async () => {
  photoGuarderia = await PhotoGuarderia.create({ guarderia_id: 'test', imggur_link: 'test', deletehash: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = photoGuarderia.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photoGuarderia.id)
    expect(view.guarderia_id).toBe(photoGuarderia.guarderia_id)
    expect(view.imggur_link).toBe(photoGuarderia.imggur_link)
    expect(view.deletehash).toBe(photoGuarderia.deletehash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = photoGuarderia.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photoGuarderia.id)
    expect(view.guarderia_id).toBe(photoGuarderia.guarderia_id)
    expect(view.imggur_link).toBe(photoGuarderia.imggur_link)
    expect(view.deletehash).toBe(photoGuarderia.deletehash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
