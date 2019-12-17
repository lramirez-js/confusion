import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish(dish) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderComments(dish) {
        let comments = <div></div>
        
        if(dish.comments != null){
            comments = dish.comments.map((comment) => {
                return(
                    <li key={comment.id} className="mt-4">
                        <p>{comment.comment}</p>
                        <span>-- {comment.author}, {comment.date}</span>
                    </li>
                )
            })
        }

        return (
            <div className="col-12 col-md-5 m-1 list-unstyled">
                <h4>Comments</h4>
                {comments}
            </div>
        )
    }

    render() {
        const selectedDish = this.props.selectedDish;

        if( selectedDish != null ){
            return(
                <div className="row">
                    {this.renderDish(selectedDish)}
                    {this.renderComments(selectedDish)}
                </div>
            )
        } else {
            return(
                <div></div>
            );
        }
    }
}

export default Dishdetail;