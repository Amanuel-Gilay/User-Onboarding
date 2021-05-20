import './App.css';
import Form from './Form';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from './schema';
import People from './People';
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}
const initialPeople = [];
const initialDisabled = true;
export default function App() {
  const [people, setPeople] = useState(initialPeople);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const postNewMember = (newMember) => {
    axios
      .post('https://reqres.in/api/users', newMember)
      .then(res => {
        setPeople([res.data, ...people]);
        setFormValues(initialFormValues);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({...formValues, [name]: value})
  }
  const formSubmit = () => {
    const newMember = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    postNewMember(newMember);
  };
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  return (
    <div >
        <h1>Members</h1>
      <Form
        values = {formValues}
        change = {inputChange}
        submit = {formSubmit}
        disabled = {disabled}
        errors = {formErrors}
      />
      {people.map((person, i) => {
        return <People key = {i} details={person} />;
      })}
    </div>
  );
}


