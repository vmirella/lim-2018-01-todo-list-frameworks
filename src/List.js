import React from 'react';
import firebase from 'firebase';
import './App.css';
import {Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class List extends React.Component {

  constructor() {
    super();
    this.state = {
      ingredients: [],
      modal: false,
      ingredient: '',
      uid: ''
    } 
    this.toggle = this.toggle.bind(this);
    this.edit = this.edit.bind(this);
  }

  handleIngredientChange(e) {
    this.setState({ ingredient: e.target.value });
  }

  toggle(uid) {
    if(uid !== '') {
      firebase.database().ref('ingredients/'+uid).once('value').then((snapshot) => {
        let name = snapshot.val().name;
        this.setState({uid: uid});
        this.setState({ingredient: name});
      });
    }   

    this.setState({
      modal: !this.state.modal
    });
  }

  edit() {
    let uid = this.state.uid;
    let name = this.state.ingredient;
    firebase.database().ref('ingredients/'+uid).update({
      name : name
    });
    this.setState({modal: !this.state.modal});
  }

  deleteIngredient(uid) {
    firebase.database().ref('ingredients/'+uid).remove();
  }

  checkIngredient(uid) {
    firebase.database().ref('ingredients/'+uid).update({
      check : 1
    });
  }

  componentDidMount() {
    firebase.database().ref('ingredients').on('value', (snapshot) => {
      let data = snapshot.val();
      if(data !== null) {
        let ingredients = Object.values(data);
        this.setState({ingredients});
      }
      else {
        this.setState({ingredients: []});
      }
    });
  }

  render() { 
    return (
      <div>
        <ListGroup className="list-group">
          {this.state.ingredients.map((ingredient, i) => {
            let name;
            if(ingredient.check === 1) {
              name = <span className="checked">{ingredient.name}</span>
            }
            else {
              name = <span>{ingredient.name}</span>
            }  
            return (
              <ListGroupItem key={i}>  
                {name}            
                <Button type="button" color="default" className="check" onClick={() => this.checkIngredient(ingredient.uid)}><i className="fas fa-check"></i></Button>
                <Button type="button" color="default" className="edit" onClick={() => this.toggle(ingredient.uid)}><i className="fas fa-pencil-alt"></i></Button>
                <Button type="button" color="default" className="delete-item" onClick={() => this.deleteIngredient(ingredient.uid)}><i className="far fa-trash-alt"></i></Button>
              </ListGroupItem>
            )
          })}          
        </ListGroup>
      
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={() => this.toggle('')}>Editar</ModalHeader>
          <ModalBody>            
            <Form>
              <FormGroup>
                <Label>Ingrediente:</Label>
                <Input type="text" value={this.state.ingredient} onChange={this.handleIngredientChange.bind(this)}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.edit}>Editar</Button>{' '}
            <Button color="secondary" onClick={() => this.toggle('')}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default List;