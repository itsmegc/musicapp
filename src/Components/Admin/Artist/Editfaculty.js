import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import '../tax/editTax.css'
import MediaComponent from "../MediaComponent/chooseMediaFile";
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


class editFaculty extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
             facultyId:"",
             facultyName:"",
            facultyDescription:"",
            facultyProfession:'',
            facultyPicUrl:''
           
        }

   


    }



    componentWillMount(){
        console.log(JSON.parse(window.localStorage.getItem('faculty')))
         this.setState({loading:true},()=>this.getFacultyDetails());
        }
    
        getFacultyDetails = async () => {
            var faculty = JSON.parse(window.localStorage.getItem('faculty'));
   
               this.setState({
   
                facultyId:faculty.faculty_id,  
                facultyName:faculty.faculty_name,
                facultyDescription:faculty.faculty_description,
                facultyProfession:faculty.faculty_profession,
                facultyPicUrl:faculty.faculty_picurl,
                 loading:false             
                })
        }
   


    componentDidMount(){
        }







    //Edit FORM

    editFaculty=()=>{


        if(this.state.facultyName.length==0){
            swal("Check Faculty name!", "Please enter valid name", "error");
        }
        else if (this.state.facultyDescription.length==0) {
            swal("Check Description field!", "Enter valid description ", "error");
            console.log(this.state.taxValue)
         }
         else if (this.state.facultyProfession.length==0) {
            swal("Check Profession field!", "Enter Profession", "error");
            console.log(this.state.taxValue)
         }
         else if (this.state.facultyPicUrl.length==0) {
            swal("Check Thumbnail field!", "Enter valid Thumbnail", "error");
            console.log(this.state.taxValue)
         }
   

        else{

            this.setState({
                loading:true
          
                })
        
              let details = {
                // product_id:this.state.selected_products.product_id,
               faculty_id:this.state.facultyId,
                faculty_name:this.state.facultyName,
                faculty_description:this.state.facultyDescription,
                faculty_profession:this.state.facultyProfession,
                faculty_picurl:this.state.facultyPicUrl
              
                
              
              
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
              response: fetch('http://18.221.47.207:3000/edit_our_faculty', {
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
                    this.props.history.push('/admin/faculties')
                  
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

    handleFacultyNameChange=(text)=> { //taxname
        this.setState({facultyName:text.target.value})
        }

  

    handleFacultyDescriptionChange=(cost)=> { //taxvalue
        this.setState({facultyDescription:cost.target.value})
        }



    
        renderFacultyNameSection=()=>{
            return(
                <div className="col-12  subject-name-section d-flex">
                     <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                          Faculty Name:
                     </label>
                     <input
                        
                        value={this.state.facultyName}
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control subject-name-form custom-form"
                            onChange={(text)=>this.handleFacultyNameChange(text)}
                        />
                </div>
            )
        }
    
        renderFacultyProfessionSection=()=>{
            return(
                <div className="col-12  subtitle-section d-flex">
                     <label htmlFor="defaultFormRegisterNameEx" className="subject-subtitle-label subject-labels">
                          Profession:
                     </label>
                     <input
                        
                        value={this.state.facultyProfession}
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control subject-subtitle-form custom-form"
                            onChange={(text)=>this.handleProfessionChange(text)}
                        />
                </div>
            )
        }
    
      
        
    
    
    
        renderFacultyThumbSection=()=>{
    
               if(!this.state.subjectThumbnail){
                    return(
                    <div className="col-12 d-flex align-items-center subject-thumbnail-container">
                    <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels">
                     Faculty Thumbnail Url: <br /> <span className="text-right text-muted ml-auto"> <i>(280 x 200 pixels)</i></span>
                    </label>
                    <input
                        type="text"
                        className="thumbnail-file-input d-block"
                        accept="image/*"
                        value={this.state.facultyPicUrl}
                        aria-describedby="inputGroupFileAddon01"
                        onChange={(text)=>this.setState({facultyPicUrl:text.target.value})}
    
                    />
    
                    </div>)
                }
                
    
    
              else{
                  return(
                    <div className='col-12 d-flex align-items-center subject-thumbnail-container'>
                        <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels h-100">
                            Faculty Thumbnail:
                        </label>
                        <div className="position-relative">
                           <img src={this.state.facultyThumbnailUrl} style={{margin:'10px 0px',width:"300px"}}/>
                         <MDBIcon style={{position: "absolute",
        top: "20px",right: "-5px", cursor:"pointer"}} className='cross_icon' onClick={()=>this.setState({facultyThumbnail:null, facultyThumbnailUrl:null})} icon="times-circle" / >
                         </div>
                      </div>
                      )
              }
        }
        
    
      
           renderFacultyDescriptionContainer=()=>{
            return(
                <React.Fragment>
           <div className="col-12 subject-description-container  d-flex align-items-center">
           <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                            Faculty Description:
              </label>
              <div className="descriptions-container">
              {this.renderFacultyDescriptions()}
              </div>
            </div>
            </React.Fragment>)
        }
  handleFacultyNameChange=(text)=> {
        this.setState({facultyName:text.target.value})
        }

    handleProfessionChange=(text)=> {
        this.setState({facultyProfession:text.target.value})
        }
        handleFacultyDescription=(text)=>{
        this.setState({facultyDescription:text.target.value})
        }
renderFacultyDescriptions=()=>{
          return ( <React.Fragment>
                      <div className="d-flex align-items-start mt-3">
                   <div className="position-relative w-100 ml-3 mr-4">
                   <textarea style={{marginLeft:'5px',marginRight:'5px'}}
                   value={this.state.facultyDescription}
                   label="subject-description"
                   className="subject-description-textarea w-100"
                   type="text"
                   onChange={(text)=>this.handleFacultyDescription(text)}
                     />
                    </div>
                    </div>
                    <div className="w-100" />
                    </React.Fragment>
                )
        
    }

 









        render(){
            return(
                <div id="add-subject-page">
                <AdminNavbar {...this.props} />
    
                <div className="d-flex">
                  <SidebarPage {...this.props} active={1}/>
    
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
    
                        <div className="row my-3 px-4">
                          <div className="col-12 top_button_bar d-flex">
                        <button className="admin-button-style admin-button-style-margin" onClick={()=>this.props.history.push('/admin/faculties')}>
                            All Faculties
                        </button>
                        <MediaComponent onSelectMediaItem={this.handleMediaChooseImage} buttonName={<MDBIcon icon="camera" /> } restriction= 'image/*' /> 
                        <button className="admin-button-style ml-auto" onClick={this.editFaculty} > Save &amp; Publish</button>
    
                        </div>
                        <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                        <h3> Edit Faculty</h3> 
                        </div>
                        </div>
                    <div className="d-flex">
                    <div className="subject-content-container ml-4">
                    <div className="row px-0 mx-0 ">
                        {this.renderFacultyNameSection()}
                        {this.renderFacultyProfessionSection()}
                        {this.renderFacultyDescriptionContainer()}
                        {this.renderFacultyThumbSection()}
                    </div>
                    </div>
                  
                    </div>
    
                    
    
                    <hr />
    
                        
                        
                        </React.Fragment>
                       )
                    }
                  </div>
    
    
                </div>
            </div>
            )
        }
}


export default editFaculty;




            