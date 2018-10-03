import React from 'react';
import firebase from 'firebase';
import './App.css';
import {Button, ListGroup, ListGroupItem } from 'reactstrap';

class List extends React.Component {

  constructor() {
    super();
    this.state = {
      ingredients: []
    } 
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
      if(data !== null){
        let ingredients = Object.values(data);
        this.setState({ingredients});
      }
    });
  }

  render() { 
    return (
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
              <Button type="button" color="default" className="delete-item" onClick={() => this.deleteIngredient(ingredient.uid)}><i className="far fa-trash-alt"></i></Button>
            </ListGroupItem>
          )
        })}          
      </ListGroup>
    );
  }
}

export default List;