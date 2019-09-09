import React, { Component } from 'react';

class Form extends Component {

  render() {
    return (
      <section className="formSection">
        <h2>This form has absolutely no meaning, but fill it out anyways</h2>
        <form action="" className="flex">
          <div className="half flex">
            <div className="formNameField flex">
              <label for="name">* Name</label>
              <input type="text" 
                name="formEntryName" 
                id="name" 
                placeholder="Name" 
                required="true"
                onKeyUp={this.props.formTyping}/>
            </div>
            <div className="formPhoneField flex">
              <label for="phone">* Phone Number</label>
              <input 
                type="text" 
                name="formEntryPhone" 
                id="phone" 
                placeholder="Phone Number" 
                required="true"
                onKeyUp={this.props.formTyping}/>
  					</div>
          </div>
          <div className="email flex">
            <label for="email">* Email</label>
            <input 
              type="email" 
              name="formEntryEmail" 
              id="email" 
              placeholder="Email" 
              required="true"
              onKeyUp={this.props.formTyping}/>
          </div>
          <button type="submit" value="Submit" className="submit">Submit</button>
        </form>
      </section>
    )
  };
}

export default Form;