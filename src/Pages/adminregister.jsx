import React, { Component } from 'react'

export default class adminregister extends Component {
  render() {
    return (
      <div>
        <div className="login-page">
       
       <div className="form">
       <h1>Admin Register</h1>
       <br></br>
         <form className="register-form">
           <input type="text" placeholder="name" name="username" onChange={this.handleInputChange} />
           <input type="password" placeholder="password" name="password" onChange={this.handleInputChange} />
           <input type="text" placeholder="email address" name="email" onChange={this.handleInputChange} />
           <button>create</button>
           <p className="message">Already registered? <a href="#" onClick={this.toggleForm}>Sign In</a></p>
         </form>
         <form className="login-form">
           <input type="text" placeholder="Name" name="username" onChange={this.handleInputChange}/>
           <input type="text" placeholder="Email Address" name="email" onChange={this.handleInputChange} />
           <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange}/>
           <input type="password" placeholder="Confirm Password" name="password" onChange={this.handleInputChange}/>
         
           <button>Register</button>
           <p className="message">Already registered? <a href="#" onClick={this.toggleForm}>Create an account</a></p>
         </form>
       </div>
     </div>

      </div>
    )
  }
}
