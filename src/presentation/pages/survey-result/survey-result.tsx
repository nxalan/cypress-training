import React from 'react'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import { Footer, Header, Spinner } from '@/presentation/components'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react" />
            <span className={Styles.answer}>React</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
