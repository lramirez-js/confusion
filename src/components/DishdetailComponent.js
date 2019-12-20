import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const RenderDish = ({dish}) => {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>1{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const RenderComments = ({dish}) => {
    let comments = <div></div>
    
    if(dish.comments != null){
        comments = dish.comments.map((comment) => {
            return(
                <li key={comment.id} className="mt-4">
                    <p>{comment.comment}</p>
                    <span>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</span>
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

const DishDetail = (props) => {
    const selectedDish = props.dish;

    if( selectedDish != null ){
        return(
            <div className="row">
                <RenderDish dish={selectedDish} />
                <RenderComments dish={selectedDish} />
            </div>
        )
    } else {
        return(
            <div></div>
        );
    }
}

export default DishDetail;
