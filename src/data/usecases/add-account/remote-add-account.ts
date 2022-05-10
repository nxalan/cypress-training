import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
    return httpResponse.body
  }
}
