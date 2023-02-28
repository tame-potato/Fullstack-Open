import { useState } from 'react'

const Button = ({title, handler}) => {
  return (
    <button onClick={handler}>{title}</button>
  )
}

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const StatisticLine = ({name, value, percent}) => {
  return (
    <tr>
      <td>{name} {value} {percent ? '%' : null}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <li>No feedback given</li>
    )
  }
  const total = good + bad + neutral
  const avg = total / 3
  const pos = good/total * 100
  return (
    <table>
      <tbody>
        <StatisticLine name={'good'} value={good}/>
        <StatisticLine name={'neutral'} value={neutral}/>
        <StatisticLine name={'bad'} value={bad}/>
        <StatisticLine name={'average'} value={avg}/>
        <StatisticLine name={'positive'} value={pos} percent={true}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={'give feedback'}/>
      <Button title={'good'} handler={() => setGood(good + 1)}/>
      <Button title={'neutral'} handler={() => setNeutral(neutral + 1)}/>
      <Button title={'bad'} handler={() => setBad(bad + 1)}/>
      <Header title={'statistics'}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App