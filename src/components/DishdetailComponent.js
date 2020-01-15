import React, { Component } from 'react';
import { 
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Row, Label, Input, Button
 } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

export default class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState ({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        console.log(`Current State is ${JSON.stringify(values)}`);
        alert(`Current State is ${JSON.stringify(values)}`);
    }

    render() {
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
                    <CommentForm isModalOpen={this.state.isModalOpen} />
                    <Button outline onClick={this.toggleModal} className="mt-5 mb-5">
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                </div>
            )
        }
        
        const CommentForm = ({isModalOpen}) => {
            return(
                <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)} className="container">
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your name</Label>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15),
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: "Required",
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }} />
                            </Row>
                            <Row className="form-group">
                                <Label for="message">Comment</Label>
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="6"
                                    className="form-control" />
                            </Row>
                            <Row>
                                <Button type="submit" value="submit" className="btn-primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            )
        }        

        if( this.state.dish != null ){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.dish.name}</BreadcrumbItem>    
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.state.dish.name}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={this.state.dish} />
                        <RenderComments comments={this.state.comments} />
                    </div>
                </div>
            )
        } else {
            return(
                <div></div>
            );
        }
    }
    
}

