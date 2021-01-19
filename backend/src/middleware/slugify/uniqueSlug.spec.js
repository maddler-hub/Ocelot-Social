import uniqueSlug from './uniqueSlug'

describe('uniqueSlug', () => {
  it('slugifies given string', () => {
    const string = 'Hello World'
    const isUnique = jest.fn().mockResolvedValue(true)
    expect(uniqueSlug(string, isUnique)).resolves.toEqual('hello-world')
  })

  it('increments slugified string until unique', () => {
    const string = 'Hello World'
    const isUnique = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true)
    expect(uniqueSlug(string, isUnique)).resolves.toEqual('hello-world-1')
  })

  it('slugify null string', () => {
    const string = null
    const isUnique = jest.fn().mockResolvedValue(true)
    expect(uniqueSlug(string, isUnique)).resolves.toEqual('anonymous')
  })

  it('Converts umlaut to a two letter equivalent', async () => {
    const umlaut = 'ä'
    const isUnique = jest.fn().mockResolvedValue(true)
    await expect(uniqueSlug(umlaut, isUnique)).resolves.toEqual('ae')
  })

  it('Removes Spanish enya ', async () => {
    const enya = 'ñ'
    const isUnique = jest.fn().mockResolvedValue(true)
    await expect(uniqueSlug(enya, isUnique)).resolves.toEqual('n')
  })
})
