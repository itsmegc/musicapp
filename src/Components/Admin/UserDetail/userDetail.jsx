import React,{Component} from 'react';
import SidebarPage from '../Sidebar/sidebarPage';
import {MDBTable,MDBTableBody,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter } from "mdbreact";
import AdminNavbar from '../Navbar/adminNavbar'
import './userDetail.css'
import swal from 'sweetalert';
import {FormGroup,Input,Label} from 'reactstrap';

import ActivePNG from "../../../Assets/images/activestatus.png";
import InactivePNG from "../../../Assets/images/inactivestatus.png";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";



const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: calc(100vh / 2) auto;
`;


class AllUserDetails extends Component {
  constructor( props ) {
      super( props );

      this.state = {
        user_data:[{name:'Raman',status:1,mobile:'9813586213',email:'xyz@gmail.com',gender:'Male',city:'Gurgaon',date_of_birth:'Fri Mar 20 2017 18:18:55 GMT+0530 (India Standard Time)',qualification:[{academic_qualification:'B.Tech'},{profession_qualification:'M.Tech'}],company:'xyz',designation:'Manager',billing_address:'abc street near xyz mall, guragaon,122001'}],
        modal_edit:false,logo:null,name:'',link:'',delete_item:'',clientData:'',selected_client:'',
        selected_data:[],updated_status:'',id:'',
        tabs:['B.Tect, Bsc, Msc, M.Tech, BCA'],
      };

    
  }



componentWillMount(){
  this.getUsers()
}

getUsers=async()=>{
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
    this.setState({user_data:responseJson, loading:false})
    
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

updateStatus=async() =>{
   
      
  this.setState({
    loading:true,
    
    })
    
      let details = {
       user_id:this.state.id,
       status:this.state.updated_status
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
        window.location.reload();
      
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


// -------------function for rendering  data---------


confirmDelete= (item)=>{
  swal({
    title: "Are you sure?",
    text:'You are deleting this client!!',
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.deleteClient(item)} else return
  });


 }



commentdate(timestamp){ 
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"
];
  var dt = new Date(timestamp);
  var dd = dt.getDate(); 
  var mm = (dt.getMonth()+1); 
  if (dd < 10) { 
      dd = '0' + dd; 
  } 
  if (mm < 10) { 
      mm = '0' + mm; 
  } 
 return (  dd +"/"+mm+ "/" +(dt.getFullYear()).toString());
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

edit_user(data){
  console.log(data,"edit")
  window.localStorage.removeItem('10x10_userdata')
  window.localStorage.setItem('10x10_userdata',JSON.stringify(data))
  this.props.history.push('/edit-user')
  
    
}

renderActions(item,index){
    if(item.selected==1){
        return( <div className='actions_div'><text onClick={()=>this.edit_user(item,index)} className='actionstext'>Details</text></div>)
    }
    else{
      return( <div className='actions_div' style={{visibility:'hidden'}}><text className='actionstext'>Details</text></div>)    
    }
}
showactionbutton(item,index){
    let {user_data} = this.state
    let selected_page = user_data[index]
    for(var v=0;v<user_data.length;v++){
        user_data[v].selected=0
    }
    selected_page.selected=1 
    this.setState({
        user_data
    })
}
hideactionbutton(){
  let {user_data} = this.state
 
  for(var v=0;v<user_data.length;v++){
    user_data[v].selected=0
  }

  this.setState({
    user_data
  })
}
renderStatus(item){
    if(item.status==0){
        return 'Last Modified'
    }
    else{
        return 'Published'
    }
}

onToggle(index, e){
  console.log(index,'kjkk')
let {user_data,selected_data} = this.state
let selected_item=user_data[index]
if(selected_item.checked==1){
 selected_item.checked=0
 selected_data.splice(index,1)
}
else{
  selected_item.checked=1
selected_data.push(selected_item)
}

this.setState({selected_data})
this.setState({user_data})

}


  handleAllChecked = (event) => {
    let {user_data} = this.state
  if(this.state.all_selected){
    for(var v=0;v<user_data.length;v++){
        user_data[v].checked=1
    }
    this.setState({selected_data:user_data})
  }
  else{
    for(var v=0;v<user_data.length;v++){
        user_data[v].checked=0
    }
    this.setState({selected_data:user_data})
  }
    this.setState({user_data})
   
  }

  changeStatus(item, status) {
    this.setState({
      loading: true
    });
    let details = {
     user_id: item.user_id,
      status: status
    };
    console.log(details, "details");
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/edit_user_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=31536000"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          window.location.reload();
        })
        .catch(error => {
          this.setState({
            loading: false
          });
          swal("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  }

  renderActiveStatus(item) {
    if (item.status == 1) {
      return (
        <img
          src={ActivePNG}
          alt="Course is active"
          className="course-status-icon"
          onClick={() => this.changeStatus(item, 0)}
        />
      );
    } else {
      return (
        <img
          src={InactivePNG}
          alt="Course is INactive"
          className="course-status-icon"
          onClick={() => this.changeStatus(item, 1)}
        />
      );
    }
  } 
handleOptionChange = (data,head_key) => {

let {user_data}=this.state

var target_task=(user_data[head_key])
if(user_data[head_key].status==1){
    target_task.status=0
}
else{
    target_task.status=1
}
this.setState({
  user_data,updated_status: target_task.status,id:user_data[head_key].user_id
},()=>this.updateStatus());
    }



   render() 
   {
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
    return (
      <div>
           <AdminNavbar {...this.props}/>
      <div style={{display:'flex',flexDirection:'row'}}>
      <SidebarPage {...this.props} active={0} />
      
        <div className='colDefault' style={{width:'100%',backgroundColor:'#F9F9F9'}}>
        <div className="page_heading"><h3 style={{marginBottom:0}}>User Details</h3>
        {/* <text onClick={()=>this.props.history.push('/add-client')} className='add_new_button'>Add New</text> */}
        </div> 
        <div>
        {/* <div className='tablenav'>
          <div class="alignleft actions bulkactions">
        <select name="action" id="bulk-action-selector-top">
  <option value="-1">Bulk Actions</option>
  
    <option value="trash">Move to Trash</option>
  </select>
  <text onClick={()=>console.log(this.state.selected_data)} className='apply'>Apply</text>
      </div>
          </div> */}
  
              <MDBTable  striped className="pages_table" style={{backgroundColor:'#F9F9F9'}}>
              
              <tr style={{backgroundColor:'white'}}>
              <th><input type="checkbox" onClick={(event)=> this.setState({all_selected:!this.state.all_selected},()=>this.handleAllChecked(event))}  checked={this.state.all_selected}  value="checkedall" /></th>
                    <th className="" >Name</th>
                      <th className="" >Email</th>
                      <th className="">Phone</th>
                      <th className="">Status</th>
                     
  
                  </tr>
                 
                  <MDBTableBody>
                  { this.state.user_data.map((item,index) => (
                   
      <tr key={item.id}>
      <td> <input type="checkbox" onChange={()=>this.onToggle(index)} checked={item.checked==1 ? true : false}/></td>
      <td style={{width:'25%'}} className="tdName textFontSize" >
      <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
      className='name_div_table'>
      <text style={{fontFamily:'Ubuntu-B',color:'#0073aa'}}>{item.name}</text>
     {this.renderActions(item,index)}
      </div></td>
      <td style={{fontFamily:'Ubuntu-B',color:'#0073aa'}} className="tdName textFontSize" >
     
      {item.email}
    
    </td>
                    <td className="tdName textFontSize" style={{color:'#0073aa'}}>{item.phone}</td>
                    <td className="tdName textFontSize" style={{color:'#0073aa'}}> {this.renderActiveStatus(item)}</td>  
      
                              </tr>
                              ))}
                  </MDBTableBody>
              </MDBTable>
         
        </div>
       
      
             
           </div>
        </div>
      </div>
  
  );
   }
  }

}

export default AllUserDetails;
