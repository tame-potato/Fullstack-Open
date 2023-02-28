const Header = ({title}) => { 
  return(
    <h1>{title}</h1>
  )
}
const Part = ({name, exercises}) => {
  return (
    <p> {name} {exercises}</p>
  )
}
const Content = ({parts}) => {
 return (
   <div>
      {parts.map(
        element => 
        <Part
        name={element.name}
        exercises={element.exercises}/>
      )}
  </div>
 )  
}
const Total = ({parts}) => {
  var total = 0
  parts.forEach(element => total += element.exercises)
  return(
    <p>Number of exercises {total}</p> 
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
        name:  'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
