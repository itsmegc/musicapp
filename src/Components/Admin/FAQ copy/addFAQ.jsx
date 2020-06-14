import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../Sidebar/sidebarPage'
import './addFAQ.css';
import Select from 'react-select';
import {MDBNavbar,MDBBtn,MDBNavItem,MDBNavbarNav,MDBIcon,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader,MDBInput} from 'mdbreact';
import Picky from 'react-picky';
import './node_modules/react-picky/dist/picky.css';
import swal from 'sweetalert'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import Fade from 'react-reveal'


const topicsList=[];
for(var i=1;i<=100;i++){
    topicsList.push({id:i,name:`Topic ${i}`})
}

const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;


class AddFAQ extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
           
            taxName:"",
            faq_question:'',
            faq_answer:'',
            taxValue:"",
        }

    }



    componentWillMount(){
      
        }
    



    componentDidMount(){

    }


    //ADD FORM

    addTax(){



            if(this.state.faq_question.length==0){
                swal("Check Question!", "Please enter question", "error");
            }
            else if (this.state.faq_answer.length==0) {
                swal("Check answer field!", "Enter answer", "error");
                console.log(this.state.taxValue)
             }
       

            else{

                this.setState({
                    loading:true
              
                    })
            
                  let details = {
                    // product_id:this.state.selected_products.product_id,
                   
                    faq_question:this.state.faq_question,
                    faq_answer:this.state.faq_answer,
                  
                    
                  
                  
                  };
                  console.log(details,'add-without photo')
                  let formBody = [];
                  for (let property in details) {
                  let encodedKey = encodeURIComponent(property);
                  let encodedValue = encodeURIComponent(details[property]);
                  formBody.push(encodedKey + "=" + encodedValue);
                  }
                  formBody = formBody.join("&");
                  
                  this.setState({
                  response: fetch('http://18.221.47.207:3000/add_faqs', {
                  method: 'POST',
                  headers: {
                   
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'max-age=31536000'
                  },
                  body:formBody
                  
                  
                  }).then((response) => response.json())
                  .then((responseJson)=>{
            
                    console.log(responseJson,'123')
                  if(responseJson.status==200){
            
                          
                      this.setState({
                        loading:false
                        // add_modal:false
                        
                        })
                        this.props.history.push('/admin/all-faqs')
                      
                            }
                            else{
                              
                      this.setState({
                        loading:false
                        // add_modal:false
                        })
                    
                        swal("Warning!", responseJson.message, "warning");
                            }
                            
                            
                            
                            
                            }
                  
                  )
                  .catch((error) => {
                  this.setState({
                   loading:false
                  })
                  swal("Warning!", "Check your network!", "warning");
                  console.log(error)
                   })
                 })


                 }
        
                }









    //HANDLE CHANGE FUNCTIONS

    handletaxNameChange=(text)=> {
        console.log("Tax Name:",text.target.value,)
        this.setState({faq_question:text.target.value})
        }

  

    handletaxValueChange=(cost)=> {
        console.log("Tax value",cost.target.value)
        this.setState({faq_answer:cost.target.value})
        }





    //RENDER FUNCTIONS
    rendertaxNameSection(){
        return(
            <div className="col-12 my-2 subject-name-section">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      Question :
                 </label>
                 <input
                    autoFocus
                    value={this.state.faq_question}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-name-form custom-form"
                        onChange={(text)=>this.handletaxNameChange(text)}
                    />
            </div>
        )
    }



    rendertaxValueSection(){
        return(
                 <div className="col-12 my-2 cost-section">
                 <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
                 Answer :
                 </label>
                 <input
                    autoFocus
                    value={this.state.faq_answer}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form"
                        onChange={(cost)=>this.handletaxValueChange(cost)}
                    />
                  </div>
        )
    }

  


  












    render(){
     
        console.log(this.props.history)
        return(
            <div id="add-subject-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props}  active={6}/>

              <div className="add-subject-column">
               {this.state.loading?
                     (
                    <div className='sweet-loading'>
                        <GridLoader
                        css={override}
                        sizeUnit={"px"}
                        size={5}
                        color={'#c01825'}
                        loading={this.state.loading}
                        />
                        </div>
                    )
                    :
                    (
                    <React.Fragment>
                        <Fade>

                    <div className="row my-3 px-4">
                    <div className="col-12">
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/all-faqs')}>
                        All FAQs
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add FAQ</h3> 
                    <button className="admin-button-style"  onClick={()=>this.addTax()}> Save &amp; Publish</button>
                    </div>
                    </div>
                  
                    <div className="row px-2 my-2 mx-0">
                        
                    {this.rendertaxNameSection()}
                  
                    <hr />
                    {this.rendertaxValueSection()}
                   
                    <hr />
                    
                 
                    </div>
                    </Fade>
                    </React.Fragment>
                   )
                }
              </div>


            {console.log(this.state)}
            </div>
        </div>
        )
    }
}


export default AddFAQ;