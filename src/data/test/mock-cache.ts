import { GetStorage } from '../protocols/cache'
import faker from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  key: string
  value: any = faker.helpers.objectValue({ one: 1, two: 2, three: 3 })

  get (key: string): any {
    this.key = key
    return this.value
  }
}
