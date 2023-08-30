// Write your JS code here
import './index.css'

import {Component} from 'react'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    firstNameError: false,
    lastNameError: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    this.state({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({firstNameError: !isValidFirstName})
  }

  validateFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({lastNameError: !isValidLastName})
  }

  validateLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  onSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="img"
      />
      <p className="text">Submitted Successfully</p>
      <button
        className="success-btn"
        type="button"
        onClick={this.onSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  renderRegistrationView = () => {
    const {firstNameError, lastNameError} = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderFirstNameField()}
        {firstNameError && <p className="error-msg">Required</p>}
        {this.renderLastNameField()}
        {lastNameError && <p className="error-msg">Required</p>}
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidLastName && isValidFirstName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        firstNameError: !isValidFirstName,
        lastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderFirstNameField = () => {
    const {firstNameError, firstName} = this.state
    const className = firstNameError ? 'input-box error-field' : 'input-box'
    return (
      <div className="input-container">
        <label htmlFor="firstName" className="label">
          FIRST NAME
        </label>
        <input
          value={firstName}
          type="text"
          placeholder="First Name"
          id="firstName"
          onBlur={this.onBlurFirstName}
          className={className}
          onChange={this.onChangeFirstName}
        />
      </div>
    )
  }

  renderLastNameField = () => {
    const {lastNameError, lastName} = this.state
    const className = lastNameError ? 'input-box error-field' : 'input-box'
    return (
      <div className="input-container">
        <label htmlFor="lastName" className="label">
          FIRST NAME
        </label>
        <input
          value={lastName}
          type="text"
          placeholder="Last Name"
          id="lastName"
          onBlur={this.onChangeFirstName}
          className={className}
          onChange={this.onChangeLastName}
        />
      </div>
    )
  }

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Registration</h1>
        <div className="card-container">
          {isFormSubmitted
            ? this.renderSuccessView()
            : this.renderRegistrationView()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
