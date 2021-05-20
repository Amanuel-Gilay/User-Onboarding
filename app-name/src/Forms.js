import React from 'react';
export default function Form(props){
    const { values, change, submit, errors, disabled } = props;
    const onChange = (ev => {
        const { name, value, type, checked } = ev.target;
        const valueToUse = (type === "checkbox") ? checked : value;
        change(name, valueToUse);
    })
    const onSubmit = (ev => {
        ev.preventDefault();
        submit();
    })
    return (
        <form className = "form container" onSubmit = {onSubmit}>
            <div >
                <h2>Add</h2>
                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
                <div >
                    <label>
                        Name&nbsp;
                        <input
                            value= {values.name}
                            onChange = {onChange}
                            name= "name"
                            type = "text"
                        />
                    </label>
                    <br/> <br/>
                    <label>
                        Email
                        <input
                            value = {values.email}
                            onChange = {onChange}
                            name= "email"
                            type = "text"
                        />
                    </label>
                    <br/> <br/>
                    <label>
                        Password
                        <input
                            value = {values.password}
                            onChange = {onChange}
                            name= "password"
                            type = "text"
                        />
                    </label>
                    <br/> <br/>
                    <div>
                        <label>
                        I Agree to the Terms of Service
                        <input
                            type="checkbox"
                            name="terms"
                            checked={values.terms}
                            onChange={onChange}
                        />
                        </label>
                        <br/><br/>
                        <button disabled = {disabled}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}