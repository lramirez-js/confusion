import React, { Component } from 'react';
import { 
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Row, Label, Button
 } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

const RenderDish = ({dish}) => {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top width="100%" src={`${baseUrl}/${dish.image}`} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const RenderComments = ({comments, addComment, dishId}) => {
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
            <CommentForm dishId={dishId} addComment={addComment} />
            
        </div>
    )
}

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

        this.state = {
            isModalOpen: false
        };

    }

    toggleModal() {
        this.setState ({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
           <React.Fragment>
               <Button outline onClick={this.toggleModal} className="mt-5 mb-5">
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
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
           </React.Fragment>
        )
    }    
}        

const DishDetail = (props) => {

    if( props.isLoading ) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if( props.dish != null ){
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
                    <RenderComments 
                        comments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id}/>
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
