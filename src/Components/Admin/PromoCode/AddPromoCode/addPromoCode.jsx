import React from 'react'
import AdminNavbar from '../../Navbar/adminNavbar'
import SidebarPage from '../../Sidebar/sidebarPage'
import '../../AddSubject/addSubject.css';
import './promocode.css'
import Select from 'react-select';
import swal from 'sweetalert'
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import Fade from 'react-reveal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {MDBIcon} from 'mdbreact'



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

class AddPromoCode extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading:false,
            promoCode:[{
                
            }],
            promoCodeTypes:[
                { value:'0', label:'All Products'},
                { value:'1', label:'Selected Products'},
                { value:'2', label:'Quantity of Products'},
                { value:'3', label:'Free Test Series'},
                { value:'4', label:'User'},
            ],
            selectedPromoCodeType:[],
            startDate: new Date(),
            endDate:new Date(),
            discountValue:``,
            maxOff:``,
            usageLimit:1,
            minOrder:1,
            promoThumbnail:null,
            promoThumbnailUrl:``,
            subjectList:[],
            selectedSubjects:[],
            selectedPromoTypeDetails:[],
            userList:[],
            selectedUsers:[],
            promoCodeName:'',
            promoDescription:''


        }
    }


    componentWillMount(){
        this.getSubjects();
    }


    getSubjects=async()=>{
        let subject_list = this.state.subjectList;
        this.setState({
            loading:true
          })         
              this.setState({
              response: fetch('http://18.221.47.207:3000/get_subjects', {
              method: 'GET',
              }).then((response) => response.json())
              .then((responseJson)=>{
                for(var i = 0; i < responseJson.length;i++){
                    var object = new Object;
                    object.value = responseJson[i].subject_id;
                    object.label = responseJson[i].subject_name;
                    subject_list.push(object)
                }
                this.setState({subjectList:subject_list},()=>this.getUsers())           
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
    

        getUsers=async()=>{
            let user_list = this.state.userList
            this.setState({
                loading:true
            })
          this.setState({
            response: fetch('http://18.221.47.207:3000/get_users', {
             method: 'GET',
             headers: {
              
               'Content-Type': 'application/x-www-form-urlencoded',
             
            },
            
            
             
            }).then((response) => response.json())
            .then((responseJson)=>{
            console.log(responseJson,'clients')   
            for(var i = 0; i < responseJson.length;i++){
                var object = new Object;
                object.value = responseJson[i].user_id;
                object.label = responseJson[i].name;
                user_list.push(object)
            } 
            this.setState({userList:user_list,loading:false})         
            }
            
            )
             .catch((error) => {
            this.setState({
              loading:false
            })
            alert("Warning!", "Check your network!", "warning");
            console.log(error)
              })
             })
          }
          
    
    
    
          addPromoCode(value){

            // loading:false,
            // promoCode:[{
                
            // }],
            // promoCodeTypes:[
            //     { value:'0', label:'All Products'},
            //     { value:'1', label:'Selected Products'},
            //     { value:'2', label:'Quantity of Products'},
            //     { value:'3', label:'Free Test Series'},
            //     { value:'4', label:'User'},
            // ],
            // selectedPromoCodeType:[],
            // startDate: new Date(),
            // endDate:new Date(),
            // discountValue:``,
            // maxOff:``,
            // usageLimit:1,
            // minOrder:1,
            // promoThumbnail:null,
            // promoThumbnailUrl:``,
            // subjectList:[],
            // selectedSubjects:[],
            // selectedPromoTypeDetails:[],
            // userList:[],
            // selectedUsers:[],
            // promoCodeName:'',
            // promoDescription:''
            if(!this.state.selectedPromoCodeType || this.state.selectedPromoCodeType.length==0){
              return  swal("Check Test ID field","Please select a test for your course!","error");
            }
        else if (this.state.promoCodeName.length === 0)
      return swal("Check Promocode name!", "Please enter name", "error");
      else if (!this.state.promoDescription)
      return swal("Check Description!", "Please enter description", "error");
      else if (!this.state.discountValue)
      return swal("Check Discount value!", "Please enter discount value", "error");
      else if (!this.state.maxOff)
      return swal("Check Maximum discount amount!", "Please enter Maximum discount amount", "error");
    else if (!this.state.promoThumbnail)
      return swal("Check Thumbnail!", "Please enter Thumbnail", "error");



      






              let formData = new FormData()
              formData.append('type',this.state.selectedPromoCodeType.value)
              formData.append('promo_code',this.state.promoCodeName)
              formData.append('start_date',this.state.startDate)
              formData.append('end_date', this.state.endDate)
              formData.append('description', this.state.promoDescription)
              if(value==1|| value==3){
                formData.append('products',JSON.stringify(this.state.selectedSubjects))
              }
              if(value==2){
                  formData.append('lower_limit',this.state.selectedPromoTypeDetails)
              }
              if(value==4){
                formData.append('users',JSON.stringify(this.state.selectedUsers))
              }
              formData.append('max_off',this.state.maxOff)
              formData.append('discount',this.state.discountValue)
              formData.append('use_limit',this.state.usageLimit)
              formData.append('minimum_order',this.state.minOrder)
              formData.append('status',1);
              formData.append('notification',1);
              formData.append('file',this.state.promoThumbnail);
              for (let key of formData.entries()) {
                console.log(key[0] + ',with photo ' + key[1]);
            }



                this.setState({
                response: fetch('http://18.221.47.207:3000/add_promo_code', {
                method: 'POST',
                body: formData
                }).then((response) => response.json())
                .then((responseJson)=>{
                console.log(responseJson,'QWERTy')
                swal("Success", "Promocode succesfully added", "success").then((value)=>{
                this.props.history.push('/admin/promocode')
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
    

    renderPromoCodeTypeSection(){
        return(
            <div className="col-12 my-2">
            <label htmlFor="defaultFormRegisterNameEx" className="promocode-type-label subject-labels">
                 Promo Code type:
            </label>
            <Select
               closeMenuOnSelect={true}
               onChange={e=>this.setState({selectedPromoCodeType:e})}
               value={this.state.selectedPromoCodeType}
               
               className='promocode-type select'
               options={this.state.promoCodeTypes}

           /> 
           </div>
        )
    }

    renderDatesSection(){
        return(
            <React.Fragment>
        <div className="col-6 my-2">
        <label htmlFor="defaultFormRegisterNameEx" className="date-from-label subject-labels mr-3">
             Valid from:
        </label>
        <DatePicker
        selected={this.state.startDate}
        onChange={(date)=>this.setState({startDate:date })}
      />
         </div>
         <div className="col-6 my-2">
          <label htmlFor="defaultFormRegisterNameEx" className="date-to-label subject-labels mr-3">
             Vaild upto:
        </label>
        <DatePicker
        selected={this.state.endDate}
        onChange={(date)=>this.setState({endDate:date})}
      />
      </div>
      </React.Fragment>

        )
    }


    renderDiscountValueSection(){
        return(
        <React.Fragment>
        <div className="col-3 my-2">
        <label htmlFor="defaultFormRegisterNameEx" className="discount-label subject-labels">
             Discount Value (%):
        </label>
        <input
            value={this.state.discountValue}
                type="number"
                id="defaultFormRegisterNameEx"
                className="form-control promocode-discount-form custom-form"
                onChange={(event)=>this.setState({discountValue:event.target.value})}
            />
      </div>
      </React.Fragment>
      )
    }


    renderMaxOffSection(){
        return(
            <React.Fragment>
            <div className="col-3 my-2">
            <label htmlFor="defaultFormRegisterNameEx" className="max-off-label subject-labels">
                 Maximum discount amount:
            </label>
            <input
                value={this.state.maxOff}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-max-off-form custom-form"
                    onChange={(event)=>this.setState({maxOff:event.target.value})}
                />
          </div>
          </React.Fragment>
          )
    }

    renderUsageLimitSection(){
        return(
            <React.Fragment>
            <div className="col-3 my-2">
            <label htmlFor="defaultFormRegisterNameEx" className="usage-limit-label subject-labels">
                 Promo usage limit:
            </label>
            <input
                value={this.state.usageLimit}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-usage-limit-form custom-form"
                    onChange={(event)=>this.setState({usageLimit:event.target.value})}
                />
          </div>
          </React.Fragment>
        )
    }


    renderMinimumOrderSection(){
        return(
            <React.Fragment>
            <div className="col-3 my-2">
            <label htmlFor="defaultFormRegisterNameEx" className="min-order-label subject-labels">
                Minimum order:
            </label>
            <input
                value={this.state.minOrder}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-min-order-form custom-form"
                    onChange={(event)=>this.setState({minOrder:event.target.value})}
                />
          </div>
          </React.Fragment>
        )
    }

    
    renderPromoCodeImageSection(){
  
        if(!this.state.promoThumbnail){
            return(
            <div className="col-6 promo-thumbnail-section my-2">
            <label htmlFor="defaultFormRegisterNameEx" className="thumbnail-label subject-labels">
             Promo Thumbnail:
            </label>
            <input
                type="file"
                className="thumbnail-file-input"
                accept="image/*"
                aria-describedby="inputGroupFileAddon01"
                onChange={(event)=>this.setState({promoThumbnail:event.target.files[0],promoThumbnailUrl:(URL.createObjectURL(event.target.files[0]))})}
                style={{display:'block'}}

            />

            </div>)
        }
        


      else{
          return(
              <div className='col-4 promo-thumbnail-section my-2'>
                <label htmlFor="defaultFormRegisterNameEx" className="thumbnail-label subject-labels">
                    Promo Thumbnail:
                </label>
                <div className="thumbnail-container">
                   <img className='promo-thumbnail-img' src={this.state.promoThumbnailUrl}/>
                 <MDBIcon className='cross_icon' onClick={()=>this.setState({promoThumbnail:null, promoThumbnailUrl:null})} icon="times-circle" />
                 </div>
              </div>
              )
      }
    }


    renderSubjectSelect(){
        return(
            <div className="col-12 my-2 d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="subject-list-label subject-labels">
                 Subjects Applicable:
            </label>
            <Select
               closeMenuOnSelect={false}
               onChange={e=>this.setState({selectedSubjects:e})}
               value={this.state.selectedSubjects}
               className='promocode-type select'
               options={this.state.subjectList}
               isMulti

           /> 
           </div>
        )
    }

    renderMinQuantityInput(){
        return(
            <React.Fragment>
            <div className="col-4 my-2 d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="min-quantity-label subject-labels">
                 Enter Minimum quantity:
            </label>
            <input
                    value={this.state.selectedPromoTypeDetails}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-min-amount-form custom-form"
                    onChange={(event)=>this.setState({selectedPromoTypeDetails:event.target.value})}
                />
          </div>
          </React.Fragment>
        )
    }


 

    renderCartAmountInput(){
        return(
            <React.Fragment>
            <div className="col-4 my-2">
            <label htmlFor="defaultFormRegisterNameEx" className="min-cart-label subject-labels">
                 Enter Minimum Cart Amount:
            </label>
            <input
                value={this.state.selectedPromoTypeDetails}
                    type="number"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-min-cart-form custom-form"
                    onChange={(event)=>this.setState({selectedPromoTypeDetails:event.target.value})}
                />
          </div>
          </React.Fragment>
        )
    }


    renderUserSelect(){
        return(
            <div className="col-12 my-2 d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="user-list-label subject-labels">
                 Users Applicable:
            </label>
            <Select
               closeMenuOnSelect={false}
               onChange={e=>this.setState({selectedUsers:e})}
               value={this.state.selectedUsers}
               className='promocode-type select'
               options={this.state.userList}
               isMulti

           /> 
           </div>
        )
    }

    renderConditionalInputPromo(value){
        console.log(value,"conditional value")
  
            if(value==0){
                return <p className="text-muted  text-center w-100">Applicable to all Products</p>
            }
            if(value==1){
                return this.renderSubjectSelect();
            }
            if(value==2){
                return this.renderMinQuantityInput();
            }

            if(value==3){
                return this.renderSubjectSelect();
            }
            if(value==4){
                return this.renderUserSelect();
            }
            else{
                return <p className="text-muted  text-center w-100">Please select a promo type!</p>
            }

        }


        renderPromoCodeInput(){
            return (
            <React.Fragment>
            <div className="col-12 my-2 d-flex justify-content start align-items-center">
            <label htmlFor="defaultFormRegisterNameEx" className="promocode-label subject-labels">
                 Enter Promocode:
            </label>
            <input
                value={this.state.promoCodeName}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-form custom-form"
                    onChange={(event)=>this.setState({promoCodeName:event.target.value})}
                />
          </div>
          </React.Fragment>
            )
        }



        
        renderDescriptionInput(){
            return (
            <React.Fragment>
            <div className="col-12 my-2 d-flex justify-content start align-items-center">
            <label htmlFor="defaultFormRegisterNameEx" className="promocode-label subject-labels">
                 Enter Description:
            </label>
            <input
                value={this.state.promoDescription}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control promocode-form custom-form"
                    onChange={(event)=>this.setState({promoDescription:event.target.value})}
                />
          </div>
          </React.Fragment>
            )
        }

    render(){
        console.log(this.props.history)
        return(
            <div id="add-subject-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props} active={5}/>

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
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/promocode')}>
                        All Promocodes
                    </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Promocode</h3> 
                    <button className="admin-button-style" onClick={()=>this.addPromoCode(this.state.selectedPromoCodeType.value)}> Save &amp; Publish</button>
                    </div>
                    </div>


                    <div className="row px-2 my-2 mx-0">
                        {this.renderPromoCodeTypeSection()}
                        <hr/>
                      
                        {this.renderConditionalInputPromo(this.state.selectedPromoCodeType.value)}
                        {this.renderPromoCodeInput()}
                        {this.renderDescriptionInput()}
                        <hr />
                        {this.renderDatesSection()}
                        <hr />
                        {this.renderDiscountValueSection()}
                        {this.renderMaxOffSection()}
                        {this.renderUsageLimitSection()}
                        {this.renderMinimumOrderSection()}
                        <hr />
                        {this.renderPromoCodeImageSection()}
                        <hr />
                        <div className="col-12 mt-3">
                        <button className="add-subject float-right" onClick={()=>this.addPromoCode(this.state.selectedPromoCodeType.value)}>Save &amp; Publish</button>
                        </div>
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


export default AddPromoCode;