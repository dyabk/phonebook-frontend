import React from 'react'
import Person from './Person'

const Persons = ( {persons, removalMethod} ) => {
    return (
        <ul>
        {persons.map(person =>
            <Person key={person.name}
            name={person.name}
            number={person.number}
            remove={() => removalMethod(person.id)} />)
        }
        </ul>
    )
}

export default Persons