import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import './addTax.css';
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


class AddTax extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
           
            taxName:"",
            taxValue:"",
            cess:[]
        }

    }



    componentWillMount(){
      
        }
    



    componentDidMount(){

    }


    //ADD FORM

    addTax(){

var cess_count = 0
for(var v=0;v<this.state.cess.length;v++){
    
    if((this.state.cess[v].name).length==0 || (this.state.cess[v].value).length==0 || this.state.cess[v].value=='' || this.state.cess[v].name=='' ){
        console.log((this.state.cess[v].name).length,(this.state.cess[v].value).length,this.state.cess[v].value,this.state.cess[v].name)
        cess_count = cess_count + 1
    }
}

            if(this.state.taxName.length==0){
                swal("Check Tax name!", "Please enter valid name", "error");
            }
            else if (this.state.taxValue.length==0) {
                swal("Check tax value field!", "Enter valid tax value", "error");
                console.log(this.state.taxValue)
             }
       
             else if (cess_count!=0) {
                swal("Check fields in cess!", "", "error");
             }

            else{

                this.setState({
                    loading:true
              
                    })
            
                    let details={}
                   
                  if(this.state.cess.length==0){
                     details = {
                        // product_id:this.state.selected_products.product_id,
                       
                        tax_name:this.state.taxName,
                        tax_value:this.state.taxValue,
                      
                        
                      
                      
                      }
                    }
                      else{
                        details = {
                            // product_id:this.state.selected_products.product_id,
                           
                            tax_name:this.state.taxName,
                            tax_value:this.state.taxValue,
                            cess:JSON.stringify(this.state.cess)
                          
                            
                          
                          
                          };
                      }
                  
                  console.log(details,'add-without photo')
                  let formBody = [];
                  for (let property in details) {
                  let encodedKey = encodeURIComponent(property);
                  let encodedValue = encodeURIComponent(details[property]);
                  formBody.push(encodedKey + "=" + encodedValue);
                  }
                  formBody = formBody.join("&");
                  
                  this.setState({
                  response: fetch('https://www.webquickfix.com/add_tax', {
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
                        this.props.history.push('/admin/all-tax')
                      
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
        this.setState({taxName:text.target.value})
        }

  

    handletaxValueChange=(cost)=> {
        console.log("Tax value",cost.target.value)
        this.setState({taxValue:cost.target.value})
        }



        handleCessName(e,i) {

            let {cess}=this.state
            let targetApp = cess[i]
            console.log(targetApp)  
            targetApp.name = e.target.value
            this.setState({cess})
          }
          
        handleCessValue(e,i) {

            let {cess}=this.state
            let targetApp = cess[i]
            console.log(targetApp)  
            targetApp.value = e.target.value
            this.setState({cess})
          }
          add_cess(){
            let {cess}=this.state
            cess.push({name:'',value:''})
            this.setState({cess})
          
          }
          remove_cess(data,key){
            let {cess}=this.state
           if(cess.length>1){
            cess.splice(key,1)
            this.setState({cess})
           }
           else{
               this.setState({
                   cess:[]
               })
           }
          }
    //RENDER FUNCTIONS
    rendertaxNameSection(){
        return(
            <div className="col-12 my-2 subject-name-section">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      Tax Name :
                 </label>
                 <input
                    autoFocus
                    value={this.state.taxName}
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
                 Tax Value :
                 </label>
                 <input
                    autoFocus
                    value={this.state.taxValue}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form"
                        onChange={(cost)=>this.handletaxValueChange(cost)}
                    />
                  </div>
        )
    }

  


  











    renderAddCess(){
        if(this.state.cess.length==0){
            return( <button className="admin-button-style" style={{marginLeft:15}}  onClick={()=>this.add_cess()}> Add Cess</button>)
        } 
       
    }
    renderCess(){
        console.log(this.state.cess.length,'ccccccc')
    if(this.state.cess.length!=0){
        return (
            <>
            {
             this.state.cess.map((item,index)=>{
       return(
         <>
         <div style={{display:'flex',justifyContent:'flex-end',margin:5,fontSize:18,width:'60%'}}>
      
        <MDBIcon style={{cursor:'pointer'}} onClick={()=>this.remove_cess(item,index)}className="red-text pr-3" icon="times" />
   </div>  
         <div className="col-12 my-2 cost-section">
         <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
         Cess Name :
         </label>
         <input
            autoFocus
            value={item.name}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control cost-form custom-form"
                onChange={(cost)=>this.handleCessName(cost,index)}
            />
          </div>
          <div className="col-12 my-2 cost-section">
         <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
         Cess Value :
         </label>
         <input
            autoFocus
            value={item.value}
                type="number"
                id="defaultFormRegisterNameEx"
                className="form-control cost-form custom-form"
                onChange={(cost)=>this.handleCessValue(cost,index)}
            />
          </div>
          <hr/>
         </>
       )
        })
            }
               <div style={{display:'flex',justifyContent:'flex-end',margin:5,fontSize:18,width:'60%'}}>
        <text className="addButton" style={{width:80}} onClick={()=>this.add_cess()}>+ Add</text>
 
   </div>   
            </>
 
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
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/all-tax')}>
                        All Taxes
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Tax</h3> 
                    <button className="admin-button-style"  onClick={()=>this.addTax()}> Save &amp; Publish</button>
                    </div>
                    </div>
                  
                    <div className="row px-2 my-2 mx-0">
                        
                    {this.rendertaxNameSection()}
                  
                    <hr />
                    {this.rendertaxValueSection()}
                   
                    <hr />
                    {this.renderAddCess()}
                    {this.renderCess()}
           
                 
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


export default AddTax;