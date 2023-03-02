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
  const total = parts.reduce((total, part) => total + part.exercises, 0)
  const totalStyle = { fontWeight: 'bold' }
  return(
    <p style={totalStyle}>total of {total} exercises</p> 
  )
}

const Course = ({name, parts}) => {
  return (
    <div>
      <Header title={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default Course