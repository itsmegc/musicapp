import React,{Component,Fragment} from 'react'; 
import './editUser.css';
import SidebarPage from '../../Sidebar/sidebarPage';
import AdminNavbar from '../../Navbar/adminNavbar';
import swal from 'sweetalert';
import { FormGroup, Label, Input } from 'reactstrap';
import {MDBNavbar,MDBNavItem,MDBNavbarNav} from 'mdbreact';

import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";



const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: calc(100vh / 2) auto;
`;

class EditUserPage extends Component {
  constructor( props ) {
      super( props );

      this.state = {
          address:'',name:'',gender:'',company:'',designation:'',city:'',dob:'',email:'',phone:'',qualification:[],
          delete_item:'',clientData:'',selected_user:null,profession_qualification:[],academic_qualification:[],
          startDate: new Date(),gender_list:[{name:'Male'},{name:'Female'},{name:'Others'}],user_id:'',
          selected_tab:[],selected_tab1:'',selected_tab2:'', tabs:[{name:'Graduate'},{name:'Postgraduate'},{name:'Others'}],tabs2:[{name:'Licentiate'},{name:'Associate'},{name:'Fellowship'},,{name:'Other'}],
    userDetails:'' };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
   let user_details = this.state.selected_user;
   user_details.date_of_birth = date.target.value;
   this.setState({selected_user:user_details})
}

  componentWillMount(){
    this.getDetails()
  }
  getDetails=async()=>{
   var saved_data = window.localStorage.getItem('10x10_userdata')
    if(saved_data!=null){
        this.setState({
          loading:true,
          user_id:JSON.parse(saved_data).user_id
            // name:JSON.parse(saved_data).name,
            // address:JSON.parse(saved_data).billing_address,
            // city:JSON.parse(saved_data).city,
            // designation:JSON.parse(saved_data).designation,
            // gender:JSON.parse(saved_data).gender,
            // company:JSON.parse(saved_data).company,
            // dob:JSON.parse(saved_data).date_of_birth,
            // email:JSON.parse(saved_data).email,
            // phone:JSON.parse(saved_data).mobile,
            // selected_tab1:(JSON.parse(saved_data).qualification[0].academic_qualification),
            // selected_tab2:(JSON.parse(saved_data).qualification[1].profession_qualification),
            // selected_user:JSON.parse(saved_data)
          },()=>this.getClients())
     

    }
  }

  componentDidMount(){
     
  }
  
  getClients=async()=>{
    this.setState({
        loading:true
    })
    let details = {
      user_id:this.state.user_id,
      
     };
     console.log(details,'updated-detail')
      let formBody = [];
      for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      this.setState({
      response: fetch('http://18.221.47.207:3000/get_user_details', {
      method: 'POST',
      headers: {
      
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
      
      
      }).then((response) => response.json())
      .then((responseJson)=>{
        console.log(responseJson)
   var data = responseJson[0]
   console.log(data,'Katy')
   this.setState({
    name:data.name,
    address:data.address,
    city:data.city,
    userDetails:data,
    gender:data.gender,

    dob:data.date_of_birth,
    email:data.email,
    phone:data.phone,
    qualifications: responseJson.qualifications,
   selected_user:data, 
   loading:false})
    
      
      
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

  editUser=async() =>{
   
if(this.state.name.length===0  ){
      swal("Warning!", "enter name", "warning");
  }
  
   else{
    this.setState({
      loading:true,
      
      })
      
        let details = {
          user_id: this.state.user_id,
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          password: this.state.userDetails.password,
          gender: this.state.gender,
          city: this.state.city,
          address: this.state.address,
        
       
          qualifications: this.state.qualifications,
          date_of_birth: this.state.userDetails.date_of_birth
        };
         console.log(details,'updated-detail')
        let formBody = [];
        for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        this.setState({
        response: fetch('http://18.221.47.207:3000/edit_user_details', {
        method: 'POST',
        headers: {
        
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
        
        
        }).then((response) => response.json())
        .then((responseJson)=>{
          this.props.history.push('/admin/user-details')
        
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
  

  handleChangeAddName=(e)=> {
    this.setState({name: e.target.value});
  }
  handleChangeGender=(e)=> {
    this.setState({gender: e.target.value});
  }
  handleChangeAddress=(e)=> {
    this.setState({address: e.target.value});
  }
  onChange = date => this.setState({ date })

  handleChangeCity=(e)=> {
    this.setState({city: e.target.value});
  }
  handleChangeCompany=(e)=> {
    this.setState({company: e.target.value});
  }
  handleChangeDesignation=(e)=> {
    this.setState({designation: e.target.value});
  }
  handleChangeEmail=(e)=> {
    this.setState({email: e.target.value});
  }
  handleChangePhone=(e)=> {
    this.setState({phone: e.target.value});
  }

  handlechangequalidate = e => {
    //   console.log(this.state.userDetails)
    let userdetails = { ...this.state.userDetails };
    userdetails.qualifications = e.target.value;

    this.setState({ userDetails: userdetails ,qualifications:e.target.value});
  };
  editqualidate() {
    let data = this.state.userDetails;
    console.log(this.state.userDetails)
   

      return (
 
          <select
            value={data.qualifications}
            onChange={this.handlechangequalidate}
            className="p-1"
          >
              <option value="B.Tech" >B.Tech</option>
                    <option value="B.Sc" >B.Sc</option>
                    <option value="B.E." >B.E.</option>
                    <option value="MCA" >M.C.A</option>
                    <option value="B.A" >B.A.</option>
                    <option value="10th" >10th</option>
                    <option value="12th" >12th</option>
          </select>
   
      );
    
     
    //    else{
    //     return <Fragment>{data.qualifications}</Fragment>;
       
     
    // }
    
    
  }

 
 handleChangeTab1=(e)=>{
 
     console.log(e.target.value)
     this.setState({selected_tab1:e.target.value});
     }
 handleChangeTab2=(e)=>{
 
     console.log(e.target.value)
     this.setState({selected_tab2:e.target.value});
     }  
 
  render() {
    
      if(this.state.loading){
        return(<div className="loadingSpin">  <GridLoader
        css={override}
        sizeUnit={"px"}
        size={5}
        color={"#c01825"}
        loading={this.state.loading}
      /></div>)
      } 
      else{
        // console.log(this.state.selected_user.date_of_birth)
        
        // var date = this.state.selected_user.date_of_birth
      //  console.log(date)
      return (
          <div>
               <AdminNavbar {...this.props}/>
         
          <div style={{display:'flex',flexDirection:'row'}}>
          <SidebarPage {...this.props} active={0}/>
            <div style={{width:'100%',padding:15}}>
            <div>
            
            
              <MDBNavbar  className="menuNavbar" dark expand="md">
             <MDBNavItem style={{listStyle:'none'}}><h3 style={{marginBottom:0,color:'black'}}>Edit User Detail</h3></MDBNavItem>
              <MDBNavbarNav right style={{display:'flex'}}> 
             
                
                <MDBNavItem onClick={()=> this.editUser()}>
                  <button style={{margin:'0px 3px'}} className="publish_button button_default2">Save & Publish</button>
                  
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBNavbar>
             
            </div>
            {/* <div className="page_heading"><h3 style={{marginBottom:0}}>Edit location</h3></div> */}
            <div className="textFontSize" style={{width:'100%',padding:10}}>
               <div style={{display:'flex'}}>
               <FormGroup className="locationForm">
                <Label for="Location" className="grey-text"> Name</Label>
                <Input type="text" name="location" id="exampleLocation" placeholder="enter name" value={this.state.name}
                  onChange={this.handleChangeAddName} className="textFontSize"/>
              </FormGroup>
              <FormGroup className="locationForm">
                <Label for="exampleAddress" className="grey-text">Address</Label>
                <Input type="text" name="address" id="exampleAddress" placeholder="enter address" value={this.state.address}
                  onChange={this.handleChangeAddress} className="textFontSize"/>
              </FormGroup>
              <FormGroup className="locationForm">
    <label htmlFor="defaultFormRegisterNameEx" className="grey-text labelPadding">
             Select Date:
        </label>
          
        <div>
        {this.state.dob==null?'':<input
          value={this.state.dob}
          onChange={this.handleChange}
          maxDate={new Date()}
          
        />}
        {/* <Calendar format='DD/MM/YYYY' date='4-12-2016' maxDate={this.state.date} minView={2} placeholder='select date'/> */}
        {/* <Calendar
            onChange={this.onChange}
            value={this.state.date}
          /> */}
        </div>
          </FormGroup>
               </div>
      
              <div style={{display:'flex'}}>
              <FormGroup className="locationForm">
                <Label for="City" className="grey-text">City</Label>
                <Input type="text" name="city" id="exampleCity" placeholder="enter city" value={this.state.city}
                  onChange={this.handleChangeCity} className="textFontSize"/>
              </FormGroup>
              <FormGroup className="locationForm">
                 <div  className='RegistrationInputLable RegistrationInputLable1'>
               <label className='lableText'  for="qualifications">Qualifications*</label>
               </div>
               {this.editqualidate()}
          </FormGroup>
          <FormGroup className="locationForm">
                <Label for="exampleEmail" className="grey-text">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="enter email id" value={this.state.email}
                  onChange={this.handleChangeEmail} className="textFontSize"/>
              </FormGroup>
             
              </div>
      
              <div style={{display:'flex'}}>
              <FormGroup className="locationForm">
                <Label for="exampleLink" className="grey-text">Gender</Label>
                <div className="RegistrationInputTypeDiv">
                <select className="tabPadding"
                   value={this.state.gender} 
                   onChange={this.handleChangeGender} 
               >
               {this.state.gender_list.map((data,index)=>{
                       return(
                           <option value={data.name} id={index}>{data.name}</option>
                       )
                   })}
               </select>
          {/* <input  placeholder="Gender" type="text1" 
          list="gender" className="RegistrationInputType placeholder-fix" 
          value={this.state.gender} onChange={this.handleChangeGender} />
           
          <datalist id="gender">
      <option value="Male"/>
      <option value="Female"/>
      <option value="Others"/>
  </datalist> */}
  
          
          </div>
                {/* <Input type="text" name="map-link" id="exampleLink" placeholder="enter map-link" value={this.state.gender}
                  onChange={this.handleChangeGender} className="textFontSize"/> */}
              </FormGroup>
            
              <FormGroup className="locationForm">
                <Label for="examplePhone" className="grey-text">Phone</Label>
                <Input type="phone" name="phone" id="examplePhone" placeholder="enter contact number" value={this.state.phone}
                  onChange={this.handleChangePhone} className="textFontSize"/>
              </FormGroup>
              </div>
           
           </div>
       
                 
               </div>
              
            </div>
          </div>
  
      );
      }
    }

}

export default EditUserPage;


