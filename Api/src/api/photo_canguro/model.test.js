import { PhotoCanguro } from '.'

let photoCanguro

beforeEach(async () => {
  photoCanguro = await PhotoCanguro.create({ canguro_id: 'test', imggu[r_link: 'test', deletehashr_link: 'test', deletehash: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = photoCanguro.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photoCanguro.id)
    expect(view.canguro_id).toBe(photoCanguro.canguro_id)
    expect(view.imggu[r_link).toBe(photoCanguro.imggu[r_link)
    expect(view.deletehashr_link).toBe(photoCanguro.deletehashr_link)
    expect(view.deletehash).toBe(photoCanguro.deletehash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = photoCanguro.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photoCanguro.id)
    expect(view.canguro_id).toBe(photoCanguro.canguro_id)
    expect(view.imggu[r_link).toBe(photoCanguro.imggu[r_link)
    expect(view.deletehashr_link).toBe(photoCanguro.deletehashr_link)
    expect(view.deletehash).toBe(photoCanguro.deletehash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
