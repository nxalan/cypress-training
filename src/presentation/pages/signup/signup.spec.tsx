import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock , Helper } from '@/presentation/test'
import faker from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Signup
    validation={validationStub}
    />
  )
  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)
  test('Should start with inicial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
