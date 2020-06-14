import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../Sidebar/sidebarPage'

import Select from 'react-select';
import {MDBNavbar,MDBBtn,MDBNavItem,MDBNavbarNav,MDBIcon,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader,MDBInput} from 'mdbreact';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
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


class AddDown extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
           
            taxName:"",
            faq_question:'',
            faq_answer:'',
            taxValue:"",
            download_name:'',
            file:null
        }

    }



    componentWillMount(){
      
        }
    



    componentDidMount(){

    }


    //ADD FORM

    addTax(){



            if(this.state.download_name.length==0){
                swal("Check Name field!", "Please enter display name of file", "error");
            }
            else if (this.state.file==null) {
                swal("", "Choose file", "error");
                console.log(this.state.taxValue)
             }
       

            else{


                this.setState({
                    loading:true
                    // add_modal:false
                    })
    
    
    
    
                      let formData = new FormData()
                      formData.append('download_name',this.state.download_name)
                      formData.append('file',this.state.file)
        // console.log(this.state.facultyName,this.state.facultyThumbnail,this.state.profession,this.state.description)
                        this.setState({
                        response: fetch('http://18.221.47.207:3000/add_download', {
                        method: 'POST',
                        body: formData
                        }).then((response) => response.json())
                        .then((responseJson)=>{
                        console.log(responseJson,'QWERTy')
                        swal("Success", "File succesfullly added", "success").then((value)=>{
                        this.props.history.push('/admin/all-downloads')
                        });
    
                        })
                        .catch((error) => {
                        this.setState({
                        loading:false
                        })
                        swal("Warning!", "Check your network!", "warning")
                         console.log(error)
                            })
                        })


                 }
        
                }









    //HANDLE CHANGE FUNCTIONS

    handletaxNameChange=(text)=> {
        console.log("Tax Name:",text.target.value,)
        this.setState({download_name:text.target.value})
        }

  

    handletaxValueChange=(cost)=> {
        console.log("Tax value",cost.target.value)
        this.setState({file:cost.target.value})
        }





    //RENDER FUNCTIONS
    rendertaxNameSection(){
        return(
            <div className="col-12 my-2 subject-name-section">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      Display Name :
                 </label>
                 <input
                    autoFocus
                    value={this.state.download_name}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-name-form custom-form"
                        onChange={(text)=>this.handletaxNameChange(text)}
                    />
            </div>
        )
    }



    rendertaxValueSection(){
        if(this.state.file==null){
            return(
                <div className="col-9 pl-2">
                              <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="subject-name-label subject-labels"
                              >
                                File:
                              </label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="inputGroupFile01"
                                  aria-describedby="inputGroupFileAddon01"
                                  onChange={event =>
                                    this.setState({
                                      file: event.target.files[0]
                                    },()=>console.log(this.state.file))
                                  }
                                />
                                <label style={{width:'81%'}} className="custom-file-label" htmlFor="inputGroupFile01">
                                  Choose file
                                </label>
                              </div>
                            </div>
                )
        }
        else{
          return(
            <p className='col-12 my-2 subject-name-section'>{this.state.file.name} <MDBIcon style={{cursor:'pointer'}} onClick={()=>this.setState({file:null})} icon='times-circle' /></p>
          )
             }

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
                        All Files
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Downloable File</h3> 
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


export default AddDown;