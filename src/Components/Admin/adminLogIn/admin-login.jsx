
import React, { Component } from "react";
import {MDBBtn,MDBIcon,MDBModal, MDBModalBody, MDBInput, MDBModalFooter,MDBCardHeader } from "mdbreact";
import './admin-login.css'
import swal from 'sweetalert'; 
// import Logo10x10 from '../../../Assets/images/Logo.png';
// import adminBG from '../../../Assets/images/admin-background.jpg';
import ReCAPTCHA from "react-google-recaptcha";

import GridLoader from 'react-spinners/GridLoader';



  class adminLogin extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
      
        loading:false,
       email:'',
       password:'',
       data:'',
       super:'',
       edit_pass:false,new_pass:'',otp:'',forgot_pass:false,captcha_value:''
      }
  
    }
     onChange=(value)=> {
      console.log("Captcha value:", value);
      this.setState({
        captcha_value:value
      })
    }
    handleChangeEmail=(e)=> {
      this.setState({email: e.target.value});
    }
    handleChangepass=(e)=> {
      this.setState({password: e.target.value});
    }
    handleChangeOtp=(e)=> {
        this.setState({otp: e.target.value});
      }
    handleChangeNewPassword=(e)=> {
        this.setState({new_pass: e.target.value});
      }



 



    
    editPassword=async()=>{
        if(this.state.email.length===0){
            
          swal("Warning!", "email can't be empty!", "warning");

          
        }
       else{
        this.setState({
          loading:true,
          forgot_pass:false
        })
         let details = {
         email:this.state.email
       };
       console.log(details,'details')
 
       
       }
     
     }


     resetPassword=async()=>{
        if(this.state.new_pass.length===0 || this.state.otp.length===0){
          swal("Warning!", "password & otp can't be empty!", "warning");
        }
       else{
        this.setState({
          loading:true,
          edit_pass:false
        })
         let details = {
         email:'ms@digitalhive.in',
         otp:this.state.otp,
         password:this.state.new_pass,
       };
       console.log(details,'details')
    
       
       }
     
        }  
          

    onLogin(){
      if(this.state.password==='' || this.state.email===''){
        swal("Warning!", "Please fill all fields!", "warning");
      }
      else if(this.state.captcha_value==''){
        swal("Warning!", "Invalid Captcha Code!", "warning");

      }
      else if(this.state.password==='admin123' && this.state.email==='admin'){
  return(

    this.props.history.push('/admin/addArtist')
  )
        }
      else{
        swal("Warning!", "Invalid Username or Password", "warning");

      }
    }










    toggleEdit = () => {
   
      this.setState({
        forgot_pass: !this.state.forgot_pass,
       });
    }

      renderEditModal(){
  
        if(this.state.forgot_pass===true){
      
      
        return(
          <MDBModal isOpen={this.state.forgot_pass} toggle={this.toggleEdit} >
       
              <MDBCardHeader style={{backgroundColor:'#0093D9',display:'flex',justifyContent:'center'}}>
                          <h3 className="my-3" style={{color:'white'}}>
                            <MDBIcon icon="edit-square" /> 
                            
                            Reset Admin Password
                          </h3>
                          
                        </MDBCardHeader>
                  <MDBModalBody>
              
          
                           <div style={{display:"flex",alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                      <text style={{margin:10,width:"20%"}}>Email</text>
              <input
                value={this.state.email}
                onChange={this.handleChangeEmail}
                placeholder=""
                icon="envelope"
                type="email"
                id="new_name"
                className="form-control"
                required
                
              /></div>
      
      
   
     </MDBModalBody>
                  <MDBModalFooter style={{padding:5}}>
                  
                  <text className='loginB' onClick={()=>this.editPassword()}>Confirm</text>
                   
                  </MDBModalFooter>
            </MDBModal>
        )
      }
      }


      handleKeyDown = (e) => {
        if(e.key==="Enter"){
            this.onLogin()
        }
      }
   
    render() {
      if(this.state.loading){
        return(  <div className='sweet-loading'>
        <GridLoader
      
        sizeUnit={"px"}
        size={5}
        color={'#c01825'}
        loading={this.state.loading}
        />
        </div>)
      }
  
      else{
        
        return (
            
            <div className="loginMain">
          <div className='loginDiv' style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
         
      <div className="card" style={{padding:20,borderWidth:8,borderColor:'#000',backgroundColor:'rgba(255,255,255)'}}>
     
         
             <div style={{display:'flex',justifyContent:'center',marginBottom:5}}>
             
             <img  alt="logo" height="50px" />
             
             
             </div>
            
              <MDBInput
          
                className="admin-email-input"
                type="email"
                name="email"
                id="email"
                label="Enter your email"
                style={{width:400,marginTop:10,marginBottom:10,padding:5}}
                value={this.state.email}
                onChange={this.handleChangeEmail}
                onKeyDown={this.handleKeyDown}
              />
           
           <form onSubmit={()=>this.userLogin()}>
              <MDBInput
              className="admin-email-input"
                value={this.state.password}
                onChange={this.handleChangepass}
                type="password"
                placeholder="Password"
                name="password"
                email="password"
                label="Enter your password"
                style={{width:400,marginTop:10,marginBottom:10,padding:5}}
                onKeyDown={this.handleKeyDown}
              /> </form>
          <p className="font-small black-text d-flex justify-content-end pb-3">
                  
                  {/* <text style={{cursor:'pointer'}} onClick={this.toggleEdit} className="blue-text ml-1" >
  
                    Forgot Password?
                  </text> */}
                </p>
                <div className='recaptcha'>
                <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={this.onChange}
  />
                </div>
                <div className="text-center mb-3">
                  <MDBBtn
                    type="button"
                    className=""
                    rounded
                    className="btn-block z-depth-1a light-blue-gradient"
                    onClick={()=>this.onLogin()}
                  >
                    Login
                  </MDBBtn>
                </div>
               
      </div>
       
        </div>
        {this.renderEditModal()}
        </div>
        );
  
      }
    }
  }
  
  export default adminLogin;