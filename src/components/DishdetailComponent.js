import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderDish = ({dish}) => {
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

const RenderComments = ({comments}) => {
    let commentsDiv = <div></div>
    
    if(comments != null){
        commentsDiv = comments.map((comment) => {
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
            {commentsDiv}
        </div>
    )
}

const DishDetail = (props) => {
    if( props.dish != null ){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>    
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        )
    } else {
        return(
            <div></div>
        );
    }
}

export default DishDetail;
