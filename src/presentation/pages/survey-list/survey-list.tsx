import React, { useEffect, useState, useContext } from 'react'
import Styles from './survey-list-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveyListItem, SurveyContext, Error } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState((prevState) => ({ ...prevState, surveys })))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState((prevState) => ({ ...prevState, error: error.message }))
        }
      })
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
