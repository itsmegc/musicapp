import React,{Component} from 'react';
import './test.css';
import SidebarPage from '../Sidebar/sidebarPage';
import AdminNavbar from '../Navbar/adminNavbar';
import swal from 'sweetalert';
import { css } from '@emotion/core';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
// import { HalfCircleSpinner } from 'react-epic-spinners';
import GridLoader from 'react-spinners/GridLoader'; 
import ActivePNG from '../../../Assets/images/activestatus.png';
import InactivePNG from '../../../Assets/images/inactivestatus.png';


const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:20% 45%;
`;


class  getTest extends Component {
  constructor( props ) {
      super( props );

      this.state = {
        loading:false,
        test_data:[],
        showAction:false,
        draft_count:0,
        published_count:0,
        all_selected:true,draft_selected:false,
        published_selected:false,trash_selected:false,selected_data:[]
      };

  }
componentWillMount(){
      this.setState({loading:true}, ()=>this.getTests())

}

componentDidMount(){
      window.localStorage.removeItem('subject_item');
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
    
    
    
    getTests=()=>{

    
            this.setState({
            response: fetch('http://18.221.47.207:3000/get_tests', {
            method: 'GET',
            }).then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson,'xxx')
                var draft_count=0,published_count=0,trash_count=0
                for(var v=0;v<responseJson.length;v++){
                   
                    responseJson[v].selected = 0
                    if(responseJson[v].status==0){
                      draft_count=draft_count+1
                    }
                    else if(responseJson[v].status==1){
                      published_count=published_count+1
                                        }
                   
                    }
             
              this.setState({
                  test_data:responseJson,
                  draft_count:draft_count,
                  published_count:published_count,
               
                  },()=> this.getSubjects())
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




    
  getSubjects = () => {

    fetch("http://18.221.47.207:3000/get_subjects")
    .then((response)=>response.json())
    .then((responseJson)=>{
      
       responseJson.forEach(element => {
            element.value = element.subject_id;
            element.label = element.subject_name;
       });

       console.log(responseJson, "JSON Respo")
       window.localStorage.setItem("subject_list", JSON.stringify(responseJson))
    })
    this.setState({loading:false})
}
  
    handleEditTest(item){
        window.localStorage.setItem('test_item', JSON.stringify(item))
    //    window.localStorage.setItem('test_list',JSON.stringify(this.state.test_data))

        this.props.history.push('/admin/edit-test');
     }

     handleAddNewExam(){
   //   window.localStorage.setItem('test_list',JSON.stringify(this.state.test_data))
      this.props.history.push('/admin/add-test');
   }

      renderActions(item,index){
          if(item.selected==1){
              if(this.state.trash_selected){
                return( <div style={{width:'15%'}} className='actions_div'> <span onClick={()=>this.restoreAlert(item)} className='actionstext'>Restore</span>
                 <span onClick={()=>this.deleteAlert(item)} className='actionstext' style={{color:'#a00'}}>Delete</span>
                </div>)
              }
              else{
                return( <div  className='actions_div'><span onClick={()=>this.handleEditTest(item,index)} 
                className='actionstext'>Edit</span> 
                </div>)
              }
          }
          else{
            return( <div className='actions_div' style={{visibility:'hidden'}}><span className='actionstext'>Edit</span> </div>)    
          }
      }
      showactionbutton(item,index){
          let {test_data} = this.state
          let selected_page = test_data[index]
          for(var v=0;v<test_data.length;v++){
            test_data[v].selected=0
          }
          selected_page.selected=1 
          this.setState({
            test_data
          })
      }
      hideactionbutton(){
        let {test_data} = this.state
       
        for(var v=0;v<test_data.length;v++){
            test_data[v].selected=0
        }
      
        this.setState({
            test_data
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
               test_id:item.test_id,
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
              response: fetch('http://18.221.47.207:3000/edit_test', {
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

        
  
  

  renderActiveStatus(item){
    if(item.status==1){
      return <img src={ActivePNG} alt="Course is active" className="course-status-icon" 
      onClick={()=>this.changeStatus(item,0)}/>
    }
    else{
      return <img src={InactivePNG} alt="Course is INactive" className="course-status-icon" 
      onClick={()=>this.changeStatus(item,1)} />
    }
  }
    
  renderTableData(item,index){
      
  if(this.state.all_selected==true ){
      if( item.status!=2){
      // console.log(this.state.all_selected,item.status,'bigE')
      return (     
        <tr key={item.test_id}>
        {/* <td><input  onChange={()=>this.onToggle(index)} checked={item.checked==1 ? true : false} type='checkbox' /></td> */}
        <td style={{width:'65%'}} className="tdName textFontSize" >
        <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
        className='name_div_table'>
        <span style={{fontFamily:'Ubuntu-B',color:'#0073aa'}}>{item.test_name}</span>
        {/* {this.renderActions(item,index)} */}
        </div></td>
        <td className="datefontsize">{this.renderStatus(item)} <br /> <span className='tabledate'>{this.commentdate(item.creation_time)}</span>
        </td>
        {/* <td>{this.renderActiveStatus(item)}</td> */}
        </tr>
         )
      }

  
  }
  else if(this.state.published_selected==true ){
  if(item.status==1){
  return (  
      <tr key={item.test_id}>
      {/* <td><input className='checkbox_content' type='checkbox' /></td> */}
      <td style={{width:'25%'}} className="tdName textFontSize" >
      <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
      className='name_div_table'>
   <span style={{fontFamily:'Ubuntu-B',color:'#0073aa'}}>{item.test_name}</span>
      {/* {this.renderActions(item,index)} */}
      
      </div></td>
      

                          <td>{this.renderActiveStatus(item)}</td>
      
                              </tr>)
  }
  

}
else if(this.state.draft_selected==true){
  if( item.status==0){
  return (      
    <tr key={item.test_id}>
      {/* <td><input className='checkbox_content' type='checkbox' /></td> */}
      <td style={{width:'25%'}} className="tdName textFontSize" >
      <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
      className='name_div_table'>
     <span style={{fontFamily:'Ubuntu-B',color:'#0073aa'}}>{item.test_name}</span>
      {/* {this.renderActions(item,index)} */}
      </div></td>
    
                 <td>{this.renderActiveStatus(item)}</td>
                           </tr>)
  }


}

    }


  onToggle(index, e){
    console.log(index,'kjkk')
  let {test_data,selected_data} = this.state
  let selected_item=test_data[index]
  if(selected_item.checked==1){
   selected_item.checked=0
   selected_data.splice(index,1)
  }
  else{
    selected_item.checked=1
  selected_data.push(selected_item)
  }
  
  this.setState({selected_data})
  this.setState({test_data})
  
  }
  
  
handleAllChecked = (event) => {
  let {test_data} = this.state
if(this.state.item_selected){
  for(var v=0;v<test_data.length;v++){
    test_data[v].checked=1
  }
  this.setState({selected_data:test_data})
}
else{
  for(var v=0;v<test_data.length;v++){
    test_data[v].checked=0
  }
  this.setState({selected_data:[]})
}
  this.setState({test_data})
  
}

  render() {
    if(this.state.loading){
      return( <div className='sweet-loading'>
      <GridLoader
      css={override}
      sizeUnit={"px"}
      size={5}
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
          <SidebarPage {...this.props} active={9}/>
      
        <div className='test-list-page colDefault' style={{width:'100%',backgroundColor:'#F9F9F9'}}>
        <div className="page_heading"><h3 style={{marginBottom:0,marginRight:'5px'}}>All Test</h3>
        <span onClick={()=>this.handleAddNewExam()} className='add_new_button'>Add New</span>
        </div> 
        <div>
        <ul className="subsubsub">
	<li className="all">
    <span onClick={()=>this.setState({all_selected:true,published_selected:false,trash_selected:false,draft_selected:false})}  className={this.state.all_selected?"text_Pub current":"text_Pub"} 
    aria-current="page">All <span className="count">
      ({this.state.draft_count+this.state.published_count})</span></span> |</li>
	<li className="publish">
    <span onClick={()=>this.setState({all_selected:false,published_selected:true,trash_selected:false,draft_selected:false})} className={this.state.published_selected ?"text_Pub current":"text_Pub"}  >Active <span className="count">({this.state.published_count})</span></span> |</li>
	<li className="draft">
    <span onClick={()=>this.setState({all_selected:false,published_selected:false,trash_selected:false,draft_selected:true})} className={this.state.draft_selected ?"text_Pub current":"text_Pub"}  >In-Active <span className="count">({this.state.draft_count})</span></span> |</li>
  
</ul>
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
                       <th className="" >Test Name</th>
                       <th className="textFontSize">Date</th>
                      {/* <th>Status</th> */}
                  </tr>
                 
                  <MDBTableBody>
                  { this.state.test_data.map((item,index) => {
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

export default getTest;


