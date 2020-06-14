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


class editDown extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
             tax_id:"",
            taxName:"",
            faq_question:'',
            faq_answer:'',
            taxValue:"",
            download_id:'',
            download_name:'',
            download_link:'',
            file:null
           
        }

   


    }



    componentWillMount(){
        console.log(JSON.parse(window.localStorage.getItem('saved_download')))
         this.setState({loading:true},()=>this.getTaxDetails());
        }
    
        getTaxDetails = async () => {
            var subject_item = JSON.parse(window.localStorage.getItem('saved_download'));
               console.log(subject_item,'tax123')
   
               this.setState({
   
                download_id:subject_item.download_id,  
                download_name:subject_item.download_name,
                download_link:subject_item.download_link,

          
                 loading:false             
                })
        }
   


    componentDidMount(){
        }







    //Edit FORM

    editTax(){


        if(this.state.download_name.length==0){
            swal("Check Question!", "Please enter question", "error");
        }
       
   

        else{
if(this.state.file==null){
    this.setState({
        loading:true
  
        })

      let details = {
        // product_id:this.state.selected_products.product_id,
       download_id:this.state.download_id,
        download_name:this.state.download_name,
      
        
      
      
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
      response: fetch('http://18.221.47.207:3000/edit_download', {
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
            this.props.history.push('/admin/all-downloads')
          
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
else{

    this.setState({
        loading:true
        // add_modal:false
        })




          let formData = new FormData()
          formData.append('download_name',this.state.download_name)
          formData.append('download_id',this.state.download_id)
          formData.append('file',this.state.file)
// console.log(this.state.facultyName,this.state.facultyThumbnail,this.state.profession,this.state.description)
            this.setState({
            response: fetch('http://18.221.47.207:3000/edit_download', {
            method: 'POST',
            body: formData
            }).then((response) => response.json())
            .then((responseJson)=>{
            console.log(responseJson,'QWERTy')
            swal("Success", "File succesfullly updated", "success").then((value)=>{
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
    
       
      
         }
      



    //HANDLE CHANGE FUNCTIONS

    handletaxNameChange=(text)=> {
        console.log("Tax Name:",text.target.value,)
        this.setState({download_name:text.target.value})
        }

  

    handletaxValueChange=(cost)=> {
        console.log("Tax value",cost.target.value)
        this.setState({faq_answer:cost.target.value})
        }



    //RENDER FUNCTIONS
  

    // renderTestIdSection(){
    //     return(
    //         <div className="col-4 my-2 test-id-section">
    //         <label htmlFor="defaultFormRegisterNameEx" className="test-id-label subject-labels">
    //              Test ID:
    //         </label>
    //         <Select
    //                 closeMenuOnSelect={false}
    //                 isMulti
    //                 onChange={e=>this.setState({selectedTestIDs:e})}
    //                 value={this.state.selectedTestIDs}
    //                 className='select-testid select'
    //                 options={this.state.testIDs}

    //             />
    //          </div>
    //  )
    // }

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
                               Change File:
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
              <SidebarPage {...this.props } active={6}/>

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
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/all-downloads')}>
                        All Files
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Edit Downloable File</h3> 
                    <button className="admin-button-style"  onClick={()=>this.editTax()}> Save &amp; Publish</button>
                    </div>
                    </div>
                               
                    <div className="row px-2 my-2 mx-0">
                    {this.rendertaxNameSection()}
                  
                  <hr />
                  {this.rendertaxValueSection()}
                 
                 
                    
                    
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


export default editDown;




            