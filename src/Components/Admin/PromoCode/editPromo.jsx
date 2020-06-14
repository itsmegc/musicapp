import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import './AddPromoCode/promocode.css';
import Select from 'react-select';
import {MDBNavbar,MDBBtn,MDBNavItem,MDBNavbarNav,MDBIcon,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader,MDBInput} from 'mdbreact';
import Picky from 'react-picky';
import 'react-picky/dist/picky.css';
import swal from 'sweetalert'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import Fade from 'react-reveal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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


class editPromo extends Component {
    constructor(props){
        super(props);
        this.state={
            promo_id:null,
            selectedPromoCodeType:[],
            startDate1: new Date(),
            endDate1:new Date(),
            discountValue:``,
            maxOff:``,
            usageLimit:``,
            minOrder:``,
            promoThumbnail:null,
            promoThumbnailUrl:``,
            subjectList:[],
            selectedSubjects:[],
            selectedPromoTypeDetails:[],
            userList:[],
            selectedUsers:[],
            promoCodeName:'',
            promoCodeTypes:[
                { value:'0', label:'All Products'},
                { value:'1', label:'Selected Products'},
                { value:'2', label:'Quantity of Products'},
                { value:'3', label:'Free Test Series'},
                { value:'4', label:'User'},
            ],
            status:-1,
            editedThumbnail:null,
            filename:''
        }

   


    }
    commentdate(timestamp){ 
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
        var dt = new Date(timestamp);
        var dd = dt.getDate(); 
        var mm = (dt.getMonth()); 
        console.log(dt.getMonth()+1)
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
       return (  dd +"/"+monthNames[Number(dt.getMonth())]+ "/" +(dt.getFullYear()).toString());
      }
      commenttime(timestamp){
        
        var convertdLocalTime = new Date(timestamp);
        var hours = convertdLocalTime.getHours();
        var minutes = convertdLocalTime.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
         
      }


    componentWillMount(){
        console.log(JSON.parse(window.localStorage.getItem('promo_item')))
        this.getPromoDetails();
         this.getSubjects();
        }
    
        getPromoDetails = async () => {
            var promo_item = JSON.parse(window.localStorage.getItem('promo_item'));
               console.log(promo_item,'Promo123')
         
               if(promo_item.type==0)
               this.setState({
                promo_id:promo_item.promo_id,  
                promoCodeName:promo_item.promo_code,
                selectedPromoCodeType:this.state.promoCodeTypes[promo_item.type],
                startDate:promo_item.start_date,
                endDate:promo_item.end_date,
                usageLimit:promo_item.use_limit,
                discountValue:promo_item.discount,
               // selectedPromoTypeDetails:JSON.parse(promo_item.lower_limit),
                maxOff:promo_item.max_off,
                minOrder:promo_item.minimum_order,
                promoThumbnail:promo_item.image,
                promoThumbnailUrl:promo_item.image,
                status:promo_item.status,
                selectedSubjects:null,
                selectedUsers:null,
                filename: promo_item.image==null?'':(promo_item.image).substr(28,(promo_item.image).length),
                loading:false            
                })

                if(promo_item.type==1 || promo_item.type==3)
                this.setState({
                 promo_id:promo_item.promo_id,  
                 promoCodeName:promo_item.promo_code,
                 selectedPromoCodeType:this.state.promoCodeTypes[promo_item.type],
                 startDate:promo_item.start_date,
                 endDate:promo_item.end_date,
                 usageLimit:promo_item.use_limit,
                 discountValue:promo_item.discount,
                //selectedPromoTypeDetails:JSON.parse(promo_item.lower_limit),
                selectedSubjects:promo_item.products?JSON.parse(promo_item.products):null,
                 maxOff:promo_item.max_off,
                 minOrder:promo_item.minimum_order,
                 promoThumbnail:promo_item.image,
                 promoThumbnailUrl:promo_item.image,
                 selectedSubjects:promo_item.products?JSON.parse(promo_item.products):null,
                 selectedUsers:null,
                 status:promo_item.status,
                 filename: promo_item.image==null?'':(promo_item.image).substr(28,(promo_item.image).length),
                 loading:false            
                 })

                 if(promo_item.type==2)
                 this.setState({
                  promo_id:promo_item.promo_id,  
                  promoCodeName:promo_item.promo_code,
                  selectedPromoCodeType:this.state.promoCodeTypes[promo_item.type],
                  startDate:promo_item.start_date,
                  endDate:promo_item.end_date,
                  usageLimit:promo_item.use_limit,
                  discountValue:promo_item.discount,
                  selectedPromoTypeDetails:JSON.parse(promo_item.lower_limit),
                  maxOff:promo_item.max_off,
                  minOrder:promo_item.minimum_order,
                  promoThumbnail:promo_item.image,
                  selectedSubjects:null,
                  selectedusers:null,
                  status:promo_item.status,
                  promoThumbnailUrl:promo_item.image,
                  filename: promo_item.image==null?'':(promo_item.image).substr(28,(promo_item.image).length),
                  loading:false            
                  })

                  if(promo_item.type==4)
                  this.setState({
                   promo_id:promo_item.promo_id,  
                   promoCodeName:promo_item.promo_code,
                   selectedPromoCodeType:this.state.promoCodeTypes[promo_item.type],
                   startDate:promo_item.start_date,
                   endDate:promo_item.end_date,
                   usageLimit:promo_item.use_limit,
                   discountValue:promo_item.discount,
                  // selectedPromoTypeDetails:JSON.parse(promo_item.lower_limit),
                   maxOff:promo_item.max_off,
                   minOrder:promo_item.minimum_order,
                   promoThumbnail:promo_item.image,
                   promoThumbnailUrl:promo_item.image,
                   selectedSubjects:null,
                   status:promo_item.status,
                   selectedUsers:JSON.parse(promo_item.users),
                   filename: promo_item.image==null?'':(promo_item.image).substr(28,(promo_item.image).length),
                   loading:false            
                   })
        
                
}
   


    componentDidMount(){
        }


        getSubjects=async()=>{
            let subject_list = this.state.subjectList;
            this.setState({
               

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




//    Edit Promo

    editPromoCode(){


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
   

        else{
            if(this.state.editedThumbnail==null){
        
              let details = {
                promo_id:this.state.promo_id,
                type:this.state.selectedPromoCodeType.value,  
                promo_code:this.state.promoCodeName,
                start_date:this.state.startDate,
                end_date:this.state.endDate,
                max_off:this.state.maxOff,
                discount:this.state.discountValue,
               // selectedPromoTypeDetails:JSON.parse(promo_item.lower_limit),
                use_limit:this.state.usageLimit,
                minimum_order:this.state.minOrder,
                status:this.state.status,
                notification:1,
              };
              if(this.state.selectedPromoCodeType.value==1||this.state.selectedPromoCodeType.value==3){
                  details.products=JSON.stringify(this.state.selectedSubjects)
                  details.lower_limit=0
                  details.users=JSON.stringify("")
              }

              if(this.state.selectedPromoCodeType.value==2){
                   details.lower_limit=this.state.selectedPromoTypeDetails
                   details.users=JSON.stringify("")
                   details.products=JSON.stringify("")
                  
              }

              if(this.state.selectedPromoCodeType.value==4){
                 details.users=JSON.stringify(this.state.selectedUsers)
                 details.products=JSON.stringify("")
                 details.lower_limit=0
                
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
                response: fetch('http://18.221.47.207:3000/edit_promo_code', {
                method: 'POST',
                headers: {
                 
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cache-Control': 'max-age=31536000'
                },
                body:formBody
                
                
                }).then((response) => response.json())
                .then((responseJson)=>{
                console.log(responseJson);
             
                this.props.history.push('/admin/promocode');                        
                })
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
                    let value = this.state.selectedPromoCodeType.value;
                    let formData = new FormData()
                    formData.append('promo_id', this.state.promo_id)
                    formData.append('type',this.state.selectedPromoCodeType.value)
                    formData.append('promo_code',this.state.promoCodeName)
                    formData.append('start_date',this.state.startDate)
                    formData.append('end_date', this.state.endDate)
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
                    formData.append('file',this.state.editedThumbnail);
                    formData.append('filename', this.state.filename);
                    for (let key of formData.entries()) {
                      console.log(key[0] + ',with photo ' + key[1]);
                }

                this.setState({
                    response: fetch('http://18.221.47.207:3000/edit_promo_code', {
                    method: 'POST',
                    body: formData
                    
                    
                    }).then((response) => response.json())
                    .then(()=>{
              
                      this.props.history.push('/admin/promocode');
                    
                    
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
        selected={this.state.startDate1}
        onChange={(date)=>this.setState({startDate:date })}
        value={this.commentdate(this.state.startDate)}
      
      
      />
          {console.log(this.state.startDate1,'dqdq')}
         </div>
         <div className="col-6 my-2">
          <label htmlFor="defaultFormRegisterNameEx" className="date-to-label subject-labels mr-3">
             Vaild upto:
        </label>
        <DatePicker
        selected={this.state.endDate1}
        onChange={(date)=>this.setState({endDate:date})}
        value={this.commentdate(this.state.endDate)}
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

    
   
    renderEditImage(){

        let imageUrl=''
    
    
      if(this.state.promoThumbnail==null){
        if(this.state.editedThumbnail==null){
    
            return(
            <div className="col-12">
            <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels">
            Promo Thumbnail:
            </label>
            <div className="custom-file">
            <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={(event)=>this.setState({editedThumbnail:event.target.files[0],promoThumbnailUrl:(URL.createObjectURL(event.target.files[0]))})}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
            Choose file
            </label>
            </div>
            
        </div>)
        }
        else{
            return(
            <div  style={{cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'space-around',margin:'0 10px',width:'45%'}} className='col-3'>
                   <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels">
                 Promo Thumbnail:
                </label>
            <img src={this.state.promoThumbnailUrl} className="promo-pic"  style={{margin:'0', width:"25%"}} alt="news_image"/>
            <MDBIcon className='cross_icon' onClick={()=>this.setState({editedThumbnail:null})} icon="times-circle" style={{position: "absolute",
    top: "20px",left: "-5px"}}/>
            </div>
            )
        }
    }
    else{
        return(
            <div  style={{cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'space-around',margin:'0 10px',width:'45%'}} className='col-3'>
             <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels">
              Promo Thumbnail:
             </label>
            <img src={this.state.promoThumbnail
            } className="promo-pic" style={{margin:'0',width:"50%"}}alt="news_image"/>
            <MDBIcon className='cross_icon' onClick={()=>this.setState({promoThumbnail:null})} icon="times-circle" style={{position: "absolute",
            top: "20px",left: "-5px"}}/>
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
            <div className="col-12 my-2 d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="min-quantity-label subject-labels">
                 Enter Minimum quantity:
            </label>
            <input
                    value={this.state.lower_limit}
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

 








        render(){
            console.log(this.props.history)
            return(
                <div id="add-subject-page">
                <AdminNavbar {...this.props} />
    
                <div className="d-flex">
                  <SidebarPage {...this.props}  active={5}/>
    
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
                            <h3> Edit Promocode</h3> 
                            <button className="admin-button-style" onClick={()=>this.editPromoCode(this.state.selectedPromoCodeType.value)}> Save &amp; Publish</button>
                            </div>
                            </div>
                           <div className="row px-2 my-2 mx-0">
                            {this.renderPromoCodeTypeSection()}
                            <hr/>
                          
                            {this.renderConditionalInputPromo(this.state.selectedPromoCodeType.value)}
                            {this.renderPromoCodeInput()}
                            <hr />
                            {this.renderDatesSection()}
                            <hr />
                            {this.renderDiscountValueSection()}
                            {this.renderMaxOffSection()}
                            {this.renderUsageLimitSection()}
                            {this.renderMinimumOrderSection()}
                            <hr />
                            {this.renderEditImage()}
                            <hr />
                            <div className="col-12 mt-3">
                            <button className="add-subject float-right" onClick={()=>this.editPromoCode(this.state.selectedPromoCodeType.value)}>Save &amp; Publish</button>
                            </div>
                        </div>
                        </Fade>
                        </React.Fragment>
                       )
                    }
                  </div>
    
    
                {console.log(this.state,'This.State')}
                </div>
            </div>
            )
        }
}


export default editPromo;




            