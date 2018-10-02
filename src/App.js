import React, { Component } from 'react';
import './App.css';
import List from './List';
import {Input, Button, Row, Container, Col, Form } from 'reactstrap';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDtrLufvwFbd_C69ALwHfYrrSKMKaDNHfo",
  authDomain: "to-do-list-22a45.firebaseapp.com",
  databaseURL: "https://to-do-list-22a45.firebaseio.com",
  projectId: "to-do-list-22a45",
  storageBucket: "to-do-list-22a45.appspot.com",
  messagingSenderId: "478219269097"
};
firebase.initializeApp(config);

class App extends Component {

  constructor() {
    super();
    this.state = {
      ingredient: '',
      ingredients: []
    } 
  }

  /* handleSubmit(e) {
    e.preventDefault();
    this.setState({ ingredient: e.target.value });
  } */

  handleIngredientChange(e) {
    this.setState({ ingredient: e.target.value });
  }

  addIngredient() {
    let ingredient = this.state.ingredient;
    let uid = firebase.database().ref().child('ingredients').push().key;
    firebase.database().ref('ingredients').set({
      uid: uid,
      name: ingredient,
      check : 0
    });
  }

  componentDidMount() {
    firebase.database().ref('ingredients').on('value', (snapshot) => {
      let data = snapshot.val();
      let ingredients = Object.values(data);
      this.setState({ingredients});
    });
  }
 
  render() {
    console.log(this.state.ingredients)

    return (
      <Container className="App">
        <header>
          <h1>To-Do List</h1>
        </header>
        <p>
          Ingredientes para hacer un keke.
        </p>
        <Row onSubmit="handleSubmit">
          <Form>
            <Col sm={10}>
              <Input className="input-ingredient" value={this.state.ingredient}/>
            </Col>
            <Col sm={2}>
              <Button type="button" color="default" onClick={this.addIngredient()}><i className="fas fa-plus"></i></Button>{' '}
              <Button type="button" color="default"><i className="far fa-trash-alt"></i></Button>
            </Col>
          </Form>
        </Row>
        <List ingredientes = {['harina','huevos']}/>
      </Container>
    );
  }
}

export default App;
