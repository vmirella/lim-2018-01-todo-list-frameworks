import React, { Component } from 'react';
import './App.css';
import {Input, Button, Row, Container, Col, Form } from 'reactstrap';
import * as firebase from 'firebase';
import List from './List';

class App extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.state = {
      ingredient: ''
    } 
  }

  handleIngredientChange(e) {
    this.setState({ ingredient: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let ingredient = this.state.ingredient;
    if(ingredient !== ''){
      let uid = firebase.database().ref().child('ingredients').push().key;
      firebase.database().ref('ingredients/'+uid).set({
        uid: uid,
        name: ingredient,
        check : 0
      });
      this.setState({ ingredient: ''});
      this.inputIngredient.focus();
    }
  }

  deleteAll() {
    firebase.database().ref('ingredients').remove();
    this.setState({ingredients: []});
  }
 
  render() {
    return (
      <Container className="App">
        <header>
          <h1>To-Do List</h1>
        </header>
        <p>
          Ingredientes para hacer un keke.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={12}>
              <Input autoFocus className="input-ingredient" value={this.state.ingredient} onChange={this.handleIngredientChange.bind(this)} ref={(Input) => { this.inputIngredient = Input }} />
              <Button type="submit" color="default" className="add"><i className="fas fa-plus"></i></Button>
              <Button type="button" color="default" className="delete" onClick={this.deleteAll}><i className="far fa-trash-alt"></i></Button>
            </Col>
          </Row>
        </Form>  
        <List/>
      </Container>
    );
  }
}

export default App;
