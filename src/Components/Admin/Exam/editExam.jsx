import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../Sidebar/sidebarPage'
import './editExam.css';
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


class editExam extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
             exam_id:"",
             Exam_name:'',
       
             description:'',
            
             edit_data:false,
             
            verticals:[],
            selectedVerticals:[],

            options: [
                { value: "0", label: "English" },
                { value: "1", label: "Hindi" }
              ],
              selectedLanguage:''
        }

   


    }



    componentWillMount(){
        
         this.setState({loading:true},()=>this.getExamDetails());
        }



    
        getExamDetails = async () => {
            var exam_item = JSON.parse(window.localStorage.getItem('exam_item'));
               console.log(exam_item,'exam123')
            // let selectedVerticals = [];
            // let verticals = JSON.parse(exam_item.verticals);
            // for(var i = 0; i<verticals.length;i++){
            //     var object = new Object();
            //     object.label = verticals[i].vertical_name;
            //     object.value = verticals[i].vertical_id;
                
            //     selectedVerticals.push(object);

            // }
               this.setState({
   
                exam_id:exam_item.exam_id,  
                Exam_name:exam_item.exam_name,
                description:exam_item.description,
                selectedVerticals:JSON.parse(exam_item.verticals),
                selectedLanguage:this.state.options.find(item=>item.value==exam_item.language_id),
                 loading:false             
                },()=> this.getVerticals())
        }
   




        
    componentDidMount(){
        console.log(JSON.parse(window.localStorage.getItem('exam_item')),"exam_item")
        }







    //Edit FORM

    editExam(){


        if(this.state.Exam_name.length==0){
            swal("Check exam name!", "Please enter valid name", "error");
        }
        else if (this.state.description.length==0) {
            swal("Check description field!", "Enter valid tax value", "error");
            console.log(this.state.taxValue)
         }
   

        else{

            this.setState({
                loading:true
          
                })
        
              let details = {
                // product_id:this.state.selected_products.product_id,
               exam_id:this.state.exam_id,
               exam_name:this.state.Exam_name,
               description:this.state.description,
               verticals:JSON.stringify(this.state.selectedVerticals),
              'language_id':this.state.selectedLanguage.value
              
              
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
              response: fetch('http://18.221.47.207:3000/edit_exam', {
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
                    this.props.history.push('/admin/all-exams')
                  
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
      




         getVerticals = async() => {
            console.log("fetching Verticals")
            this.setState({
                response: fetch('http://18.221.47.207:3000/get_verticals', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
    
    
            }).then((response) => response.json())
            .then((responseJson)=>{
            console.log(responseJson,'XAxax');
            for(var v=0;v<responseJson.length;v++){
                responseJson[v].label = responseJson[v].vertical_name 
                responseJson[v].value = responseJson[v].vertical_id
                
            }
            this.setState({
                verticals:responseJson,
                loading:false
            });
    
    
          console.log(this.state) })
             .catch((error) => {
             this.setState({
               loading:false
             })
             alert("Warning!", "Check your network!", "warning");
             console.log(error)
            console.log(error);
                })
            })
        }
        
         




 

  
    //HANDLE CHANGE FUNCTIONS




    //RENDER FUNCTIONS
    renderExamNameSection(){
        return(
            <div className="col-12  subtitle-section d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-subtitle-label subject-labels">
                       Name:
                 </label>
                 <input
                    
                    value={this.state.Exam_name}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-subtitle-form custom-form"
                        onChange={(text)=>this.setState({Exam_name:text.target.value})}
                    />
            </div>
        )
    }


    renderDescriptionSection(){
        return(
            <div className="col-12  subtitle-section d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-subtitle-label subject-labels">
                      Description:
                 </label>
                 <input
                    
                    value={this.state.description}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-subtitle-form custom-form"
                        onChange={(text)=>this.setState({description:text.target.value})}
                    />
            </div>
        )
    }
  


  
    renderVerticalSection(){
        return(
            <div className="col-12 exam-section h-25 min-height-unset">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels pl-0">
                 Verticals:
            </label>
            <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={e=>this.setState({selectedVerticals:e})}
                    value={this.state.selectedVerticals}
                    className='select-exam select'
                    options={this.state.verticals}

                />
             </div>
     )
    }





    renderSelect() {

   

        return (
          <div className="col-5  d-flex align-items-baseline justify-content-end">
            <span
       
              style={{fontWeight:'bold',fontSize:'18px',paddingRight:'5px'}}
            >
              Language :
            </span>
            <Select
                      closeMenuOnSelect={true}
                      onChange={e => this.setState({ selectedLanguage: e },)}
                      value={this.state.selectedLanguage}
                      className="language-select "
                      options={this.state.options}
                    />
            {/* {console.log(y)} */}
          </div>
        );
      }
      







          
        
    render(){
             
        console.log(this.props.history)
        return(
            <div id="add-subject-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props}  active={7}/>

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
                        <div className="col-12 d-flex align-items-center justify-content-between mb-4">
                            <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/all-exams')}>
                                All Exams
                            </button>
                            {/* {this.renderSelect()} */}
                            <button className="admin-button-style" onClick={()=>this.editExam()}> Save &amp; Publish</button>

                            </div>
                            <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                              <h3> Add Exam</h3> 
                            </div>
                        </div>

                        <div className="d-flex">
                        <div className="subject-content-container ml-4">
                        <div className="row px-0 mx-0">
                           {this.renderExamNameSection()}  
                           {this.renderDescriptionSection()}     
                        </div>
                        </div>
                        <div className="subject-select-fields-container ml-2 row align-self-start flex-column mr-4">
                             {this.renderVerticalSection()}
                         </div>
                        </div>                  
                    
                       
              
           
              
               
                     {/* <button className='add-subject my-5 float-right mr-4' onClick={()=>this.addExam()}>Save &amp; Publish</button> */}
                
                 
                    
                    
                
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


export default editExam;




            