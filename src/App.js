import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    const names = persons.map(person => person.name)

    names.includes(newName)
      ? updatePerson(persons.find(person => 
          person.name === newPerson.name).id, newPerson)
      : personService
          .create(newPerson)
          .then(returnedNumber => {
            console.log('returnedNumber: ', returnedNumber)
            setPersons(persons.concat(returnedNumber))
            setSuccessMessage(`Added ${returnedNumber.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 7000)
          })
      
    setNewName('')
    setNewNumber('')
    
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 7000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const updatePerson = (id, newObject) => {
    const originalObject = persons.find(x => x.id === id)
    
    if (window
      .confirm(`${originalObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, newObject)
          .then(returnedPerson => {
            console.log('returnedPerson: ', returnedPerson)
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setSuccessMessage(`Changed ${returnedPerson.name}'s phone number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 7000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${originalObject.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 7000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
   <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={successMessage} />
      <Filter handler={handleFilterChange} value={filter} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        adder={addPerson}
      />
      <h3>Numbers</h3>
        <Persons persons={personsToShow} removalMethod={deletePerson}/>
   </div>
  )
}

export default App