import faker from '@faker-js/faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
