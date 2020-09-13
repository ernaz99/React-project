import React, { Component } from "react";

import {Card, CardImg, CardTitle, CardBody, CardText,BreadcrumbItem,Breadcrumb, Button, Modal, ModalHeader, Row, ModalBody,Col, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {Control,LocalForm} from "react-redux-form" ;




class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            isModalOpen:false
 
        }
        this.toggleModal=this.toggleModal.bind(this);

    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })

    }
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);

    }
    
  


    render(){
    return(
    <>
        <div>
            <Button onClick={this.toggleModal} color="secondary">
            <span class="fa fa-pencil"></span> Submit Comment
            </Button>
        </div>  

     <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
         <ModalHeader toggle={this.toggleModal}>
             <h1>Submit Comment</h1>
         </ModalHeader>
         <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
         <ModalBody>
             <Row className="form-group">
               
             <Label htmlFor="rating" md={12}>Rating</Label>
             <Col md={12}>
             <Control.select model=".rating" className="form-control" name="rating" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                 
             </Control.select>
             </Col>
             </Row>

             <Row className="form-group">
             <Label htmlFor="name" md={12}>Your Name</Label>        
                 <Col md={12}> 
                 <Control.text model=".name" className="form-control" name="name" placeholder="Your Name">
                 </Control.text>
                 </Col>
             </Row>

             <Row className="form-group">
                 <Label name="comment" md={12}>Comment</Label>
                 <Col md={12}>
                     <Control.textarea model=".comment" className="form-control" rows={12} name="comment" >
                     </Control.textarea>
                 </Col>
             </Row>

             <Row className="form-group">
                  <Col md={12}>
                      <Button type="submit" color="primary" >Submit</Button>
                  </Col>



             </Row>


         </ModalBody>
         </LocalForm>


     </Modal>
   
       
 
      </>    

         )
    }

}


    function RenderComments({comment,addComment,dishId}){
        if(comment==null){
            return(<div></div>)
        }
        const comm=comment.map(comment=>{

            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )

        })
        
        return(
            <div className="col-12 col-md-5 m-1"> 
            <ul className="list-unstyled">
                <h4>Contact</h4>
                {comm}
                <CommentForm dishId={dishId} addComment={addComment} />
            </ul>
            </div>
        )
    }
    
    
 
    function RenderDish({dish}){
        if(dish!=null)
        return(
           
            <div className="col-12 col-md-5 m-1"> 
          <Card>
                <CardImg src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
         
        )
        else
        return(<div></div>);

        

    }
    




    const DishDetail=(props)=>{
     
       if(props.dish==null){
           return(<div></div>)

       }
     
      
        return(
       
            <div className="container">
                  <div className="row">
       <Breadcrumb>
       <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
       <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem> 
       </Breadcrumb>
       <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
         </div>     
       </div>
            <div className="row">
                
                <RenderDish dish={props.dish} />
                <RenderComments comment={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
                />
            
 
                
             
                </div>

      </div>
       
        )
    
        }

export default DishDetail;