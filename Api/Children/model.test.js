import { Children } from '.'

let children

beforeEach(async () => {
  children = await Children.create({ name: 'test', fecha_nacimiento: 'test', user_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = children.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(children.id)
    expect(view.name).toBe(children.name)
    expect(view.fecha_nacimiento).toBe(children.fecha_nacimiento)
    expect(view.user_id).toBe(children.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = children.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(children.id)
    expect(view.name).toBe(children.name)
    expect(view.fecha_nacimiento).toBe(children.fecha_nacimiento)
    expect(view.user_id).toBe(children.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
