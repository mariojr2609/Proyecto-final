import { Child } from '.'

let child

beforeEach(async () => {
  child = await Child.create({ name: 'test', fecha_nacimiento: 'test', user_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = child.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(child.id)
    expect(view.name).toBe(child.name)
    expect(view.fecha_nacimiento).toBe(child.fecha_nacimiento)
    expect(view.user_id).toBe(child.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = child.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(child.id)
    expect(view.name).toBe(child.name)
    expect(view.fecha_nacimiento).toBe(child.fecha_nacimiento)
    expect(view.user_id).toBe(child.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
