import React,{Component} from 'react';
import SidebarPage from '../Sidebar/sidebarPage';
import AdminNavbar from '../Navbar/adminNavbar';
import swal from 'sweetalert';
import { css } from '@emotion/core';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import GridLoader from 'react-spinners/GridLoader'; 
import ActivePNG from '../../../Assets/images/activestatus.png';
import InactivePNG from '../../../Assets/images/inactivestatus.png';
import { CSVLink, CSVDownload } from "react-csv";

const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:20% 45%;
`;


class Subscribers extends Component {
  constructor( props ) {
      super( props );

      this.state = {
        loading:false,
        subjects:[],
        showAction:false,
        subscribers:[],
        
      };

  }
componentWillMount(){
      this.setState({loading:true}, ()=>this.getSubs())

}

componentDidMount(){
      window.localStorage.removeItem('subject_item');
    }




  getSubs=async()=>{

    this.setState({
        loading:true
      })         
          this.setState({
          response: fetch('http://18.221.47.207:3000/get_subscribers', {
          method: 'GET',
          }).then((response) => response.json())
          .then((responseJson)=>{
            
           for(var v=0;v<responseJson;v++){
             responseJson[v].Subscription_Date = this.commentdate(responseJson[v].Date_of_Subscription) 
            
             responseJson[v].S_No = v+1

           }
            this.setState({
              
                subscribers:responseJson,
                loading:false
                },()=>console.log(responseJson,'subss'))
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

  

    handleEditSubject(item){
        window.localStorage.setItem('subject_item', JSON.stringify(item))
        window.localStorage.setItem('subject_list',JSON.stringify(this.state.subjects))
        this.props.history.push('/admin/edit-tax');
     }

     handleAddNewSubject(){
      window.localStorage.setItem('subject_list',JSON.stringify(this.state.subjects))
      this.props.history.push('/admin/add-tax');
   }

      renderActions(item,index){
          if(item.selected==1){
              if(this.state.trash_selected){
                return( <div style={{width:'15%'}} className='actions_div'> <span onClick={()=>this.restoreAlert(item)} className='actionstext'>Restore</span>
                 <span onClick={()=>this.deleteAlert(item)} className='actionstext' style={{color:'#a00'}}>Delete</span>
                </div>)
              }
              else{
                return( <div  className='actions_div'><span onClick={()=>this.handleEditSubject(item,index)} 
                className='actionstext'>Edit</span> 
                </div>)
              }
          }
          else{
            return( <div className='actions_div' style={{visibility:'hidden'}}><span className='actionstext'>Edit</span> </div>)    
          }
      }
      showactionbutton(item,index){
          let {subjects} = this.state
          let selected_page = subjects[index]
          for(var v=0;v<subjects.length;v++){
            subjects[v].selected=0
          }
          selected_page.selected=1 
          this.setState({
            subjects
          })
      }
      hideactionbutton(){
        let {subjects} = this.state
       
        for(var v=0;v<subjects.length;v++){
            subjects[v].selected=0
        }
      
        this.setState({
            subjects
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


        changeStatus(item,status){
            this.setState({
                loading:true
              })
               let details = {
               tax_id:item.tax_id,
               status:status
             };
             console.log(details,'details')
             let formBody = [];
             for (let property in details) {
              let encodedKey = encodeURIComponent(property);
              let encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
             }
             formBody = formBody.join("&");
             
             this.setState({
              response: fetch('http://18.221.47.207:3000/tax_status', {
                method: 'POST',
                headers: {
                 
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cache-Control': 'max-age=31536000'
              },
             body:formBody
               
                
              }).then((response) => response.json())
              .then((responseJson)=>{
                   window.location.reload()
                
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

        
        // restorePage(item){
        //     // this.setState({
        //     //     loading:true
        //     //   })
        //     //    let details = {
        //     //    id:item.id,
              
        //     //  };
        //     //  console.log(details,'details')
        //     //  let formBody = [];
        //     //  for (let property in details) {
        //     //   let encodedKey = encodeURIComponent(property);
        //     //   let encodedValue = encodeURIComponent(details[property]);
        //     //   formBody.push(encodedKey + "=" + encodedValue);
        //     //  }
        //     //  formBody = formBody.join("&");
             
        //     //  this.setState({
        //     //   response: fetch('http://18.221.183.249:3000/restore_content', {
        //     //     method: 'POST',
        //     //     headers: {
                 
        //     //       'Content-Type': 'application/x-www-form-urlencoded',
        //     //       'Cache-Control': 'max-age=31536000'
        //     //   },
        //     //  body:formBody
               
                
        //     //   }).then((response) => response.json())
        //     //   .then((responseJson)=>{
        //     //        window.location.reload()
                
        //     //   }
             
        //     //   )
        //     //     .catch((error) => {
        //     //    this.setState({
        //     //      loading:false
        //     //    })
        //     //    swal("Warning!", "Check your network!", "warning");
        //     //  console.log(error)
        //     //      })
        //     //     })
        // }
  

  renderActiveStatus(item){
    if(item.status==1){
      return <img src={ActivePNG} alt="Course is active" className="course-status-icon" onClick={()=>this.changeStatus(item,0)}/>
    }
    else{
      return <img src={InactivePNG} alt="Course is INactive" className="course-status-icon" onClick={()=>this.changeStatus(item,1)} />
    }
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
  renderTableData(item,index){
      
    return (     
      <tr key={item.tax_id}>
      {/* <td><input  onChange={()=>this.onToggle(index)} checked={item.checked==1 ? true : false} type='checkbox' /></td> */}
     
      <td >   <span style={{fontFamily:'Ubuntu-B',color:'#0073aa'}}>{item.Email}</span> 
      </td>
      <td>{item.Date_of_Subscription}</td>
      </tr>
       )
    }


  onToggle(index, e){
    console.log(index,'kjkk')
  let {subjects,selected_data} = this.state
  let selected_item=subjects[index]
  if(selected_item.checked==1){
   selected_item.checked=0
   selected_data.splice(index,1)
  }
  else{
    selected_item.checked=1
  selected_data.push(selected_item)
  }
  
  this.setState({selected_data})
  this.setState({subjects})
  
  }
  
  
handleAllChecked = (event) => {
  let {subjects} = this.state
if(this.state.item_selected){
  for(var v=0;v<subjects.length;v++){
    subjects[v].checked=1
  }
  this.setState({selected_data:subjects})
}
else{
  for(var v=0;v<subjects.length;v++){
    subjects[v].checked=0
  }
  this.setState({selected_data:[]})
}
  this.setState({subjects})
  
}

  render() {
    if(this.state.loading){
      return( <div className='sweet-loading'>
      <GridLoader
      css={override}
      sizeUnit={"px"}
      size={25}
      color={'#c01825'}
      loading={this.state.loading}
      />
  </div>)
    } 
   else{
    return (
      <div id="subject-page-list">
           <AdminNavbar {...this.props}/>
      <div style={{display:'flex',flexDirection:'row'}}>
      <SidebarPage {...this.props}  active={6} />
      
        <div className='colDefault' style={{width:'100%',backgroundColor:'#F9F9F9'}}>
        <div className="page_heading"><h3 style={{marginBottom:0,marginRight:'5px'}}>Subscribers</h3>
        <CSVLink filename={"subscribers.csv"}
  className="add_new_button span" data={this.state.subscribers} target="_blank">Download CSV</CSVLink>
       
        </div> 
        <div>
     
        {/* <div className='tablenav'>
        <div className="alignleft actions bulkactions">
			<select name="action" id="bulk-action-selector-top">
<option value="-1">Bulk Actions</option>

	<option value="trash">Move to Trash</option>
</select>
<span onClick={()=>console.log(this.state.selected_data)} className='apply'>Apply</span>
		</div>
        </div> */}


              <MDBTable  striped className="pages_table" style={{backgroundColor:'#F9F9F9'}}>
              
                  <tr style={{backgroundColor:'white'}}>
                  {/* <th><input type="checkbox" onClick={(event)=> this.setState({item_selected:!this.state.item_selected},()=>this.handleAllChecked(event))}  checked={this.state.item_selected}  value="checkedall" /></th> */}
                       <th className="" >Email</th>
                      <th className="textFontSize">Date of Subscription</th>
                      
                  </tr>
                 
                  <MDBTableBody>
                  { this.state.subscribers.map((item,index) => {
                    return this.renderTableData(item,index)
                              })}
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

export default Subscribers;


