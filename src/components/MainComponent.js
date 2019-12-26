import React, { Component } from 'react';
// import logo from './logo.svg';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes'
import { Switch, Route, redirect, Redirect } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES
        };
    }

    // onDishSelect(dishId) {
    //     this.setState({ selectedDish: dishId });
    // }

    render() {
        const HomePage = () => {
            return(
                <Home />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Redirect to="/home" />
                </Switch>
                <div></div>
                <Footer />
            </div>
        );
    }
}

export default Main;
