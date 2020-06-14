import React,{Component} from 'react';
import SidebarPage from '../Sidebar/sidebarPage';
import AdminNavbar from '../Navbar/adminNavbar';
import swal from 'sweetalert';
import { css } from '@emotion/core';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
// import { HalfCircleSpinner } from 'react-epic-spinners';
import GridLoader from 'react-spinners/GridLoader'; 
import ActivePNG from '../../../Assets/images/activestatus.png';
import InactivePNG from '../../../Assets/images/inactivestatus.png';
import '../tax/addTax.css'
import Select from "react-select";
const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:20% 45%;
`;


class allKeyDates extends Component {
  constructor( props ) {
      super( props );

      this.state = {
        loading:false,
        Keydates:[],
        showAction:false,
        draft_count:0,
        published_count:0,
        trash_count:0,all_selected:true,draft_selected:false,
        published_selected:false,trash_selected:false,selected_data:[],
        options: [
          {value:"-1", label:"All"},
          { value: "1", label: "English" },
          { value: "0", label: "Hindi" }
  
        ],
        selectedLanguage:[ {value:"-1", label:"All"}]
      };

  }
componentWillMount(){
      this.setState({loading:true}, ()=>this.getKeydates())

}

componentDidMount(){
      window.localStorage.removeItem('Keydates_item');
    }




  getKeydates=async()=>{

    this.setState({
        loading:true
      })         
          this.setState({
          response: fetch('http://18.221.47.207:3000/get_key_dates', {
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
                  else if(responseJson[v].status==2){
                    trash_count=trash_count+1
                       }
                  }
            this.setState({
                Keydates:responseJson,
                draft_count:draft_count,
                published_count:published_count,
                trash_count:trash_count,
                loading:false
                })
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

  

    handleEditKeydates(item){
        window.localStorage.setItem('Keydates_item', JSON.stringify(item))
        window.localStorage.setItem('Keydates_list',JSON.stringify(this.state.Keydates))
        this.props.history.push('/admin/edit-key-dates');
     }

     handleAddKeydates(){
      window.localStorage.setItem('Keydates_list',JSON.stringify(this.state.Keydates))
      this.props.history.push('/admin/add-key-dates');
   }

      renderActions(item,index){
          if(item.selected==1){
              if(this.state.trash_selected){
                return( <div style={{width:'15%'}} className='actions_div'> <span onClick={()=>this.restoreAlert(item)} className='actionstext'>Restore</span>
                 <span onClick={()=>this.deleteAlert(item)} className='actionstext' style={{color:'#a00'}}>Delete</span>
                </div>)
              }
              else{
                return( <div  className='actions_div'><span onClick={()=>this.handleEditKeydates(item,index)} 
                className='actionstext'>Edit</span> 
                </div>)
              }
          }
          else{
            return( <div className='actions_div' style={{visibility:'hidden'}}><span className='actionstext'>Edit</span> </div>)    
          }
      }
      showactionbutton(item,index){
          let {Keydates} = this.state
          let selected_page = Keydates[index]
          for(var v=0;v<Keydates.length;v++){
            Keydates[v].selected=0
          }
          selected_page.selected=1 
          this.setState({
            Keydates
          })
      }
      hideactionbutton(){
        let {Keydates} = this.state
       
        for(var v=0;v<Keydates.length;v++){
            Keydates[v].selected=0
        }
      
        this.setState({
            Keydates
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
              id:item.id,
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
              response: fetch('http://18.221.47.207:3000/key_dates_status', {
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
      return <img src={ActivePNG} alt="Course is active" className="course-status-icon" onClick={()=>this.changeStatus(item,0)} />
    }
    else{
      return <img src={InactivePNG} alt="Course is INactive" className="course-status-icon" onClick={()=>this.changeStatus(item,1)} />
    }
  }
    
  renderTableData(item,index){
    if (item.language_id !=this.state.selectedLanguage.value){   
  if(this.state.all_selected==true ){
      if( item.status!=2){
      // console.log(this.state.all_selected,item.status,'bigE')
      return (     
        <tr key={item.id}>
        {/* <td><input  onChange={()=>this.onToggle(index)} checked={item.checked==1 ? true : false} type='checkbox' /></td> */}
        <td style={{width:'25%'}} className="tdName textFontSize" >
        <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
        className='name_div_table'>
        <span style={{fontFamily:'OpenSans-Semibold',color:'#0073aa'}}>{item.key_dates_title}</span>
        {this.renderActions(item,index)}
        </div></td>
        <td >   <span dangerouslySetInnerHTML={{__html:item.key_dates_description}} style={{fontFamily:'OpenSans-Semibold',color:'#0073aa'}}></span> 
        </td>
        <td>{this.renderActiveStatus(item)}</td>
        </tr>
         )
      }

  
  }
  else if(this.state.published_selected==true ){
  if(item.status==1){
  return (  
    <tr key={item.id}>
    {/* <td><input  onChange={()=>this.onToggle(index)} checked={item.checked==1 ? true : false} type='checkbox' /></td> */}
    <td style={{width:'25%'}} className="tdName textFontSize" >
    <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
    className='name_div_table'>
    <span style={{fontFamily:'OpenSans-Semibold',color:'#0073aa'}}>{item.key_dates_title}</span>
    {this.renderActions(item,index)}
    </div></td>
    <td >   <span dangerouslySetInnerHTML={{__html:item.key_dates_description}} style={{fontFamily:'OpenSans-Semibold',color:'#0073aa'}}></span> 
    </td>
    <td>{this.renderActiveStatus(item)}</td>
    </tr>)
  }
  

}
else if(this.state.draft_selected==true){
  if( item.status==0){
  return (      
    <tr key={item.id}>
        {/* <td><input  onChange={()=>this.onToggle(index)} checked={item.checked==1 ? true : false} type='checkbox' /></td> */}
        <td style={{width:'25%'}} className="tdName textFontSize" >
        <div onMouseEnter={()=>this.showactionbutton(item,index)} onMouseLeave={()=>this.hideactionbutton()} 
        className='name_div_table'>
        <span style={{fontFamily:'OpenSans-Semibold',color:'#0073aa'}}>{item.key_dates_title}</span>
        {this.renderActions(item,index)}
        </div></td>
        <td >   <span dangerouslySetInnerHTML={{__html:item.key_dates_description}} style={{fontFamily:'OpenSans-Semibold',color:'#0073aa'}}></span> 
        </td>
        <td>{this.renderActiveStatus(item)}</td>
        </tr>)
  }
}

}

    }


  onToggle(index, e){
    console.log(index,'kjkk')
  let {Keydates,selected_data} = this.state
  let selected_item=Keydates[index]
  if(selected_item.checked==1){
   selected_item.checked=0
   selected_data.splice(index,1)
  }
  else{
    selected_item.checked=1
  selected_data.push(selected_item)
  }
  
  this.setState({selected_data})
  this.setState({Keydates})
  
  }
  
  
handleAllChecked = (event) => {
  let {Keydates} = this.state
if(this.state.item_selected){
  for(var v=0;v<Keydates.length;v++){
    Keydates[v].checked=1
  }
  this.setState({selected_data:Keydates})
}
else{
  for(var v=0;v<Keydates.length;v++){
    Keydates[v].checked=0
  }
  this.setState({selected_data:[]})
}
  this.setState({Keydates})
  
}

handleChange = selectedLanguage => {
  this.setState({ selectedLanguage });
  console.log(`Option selected:`, selectedLanguage.value);


};


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
onChange={this.handleChange}
value={this.state.selectedLanguage}
className="language-select "
options={this.state.options}
/>
      {/* {console.log(y)} */}
    </div>
  );
}


  render() {
    if(this.state.loading){
      return( <div className='sweet-loading'>
      <GridLoader
            css={override}
            sizeUnit={"px"}
            size={5}
            color={"#c01825"}
            loading={this.state.loading}
          />
  </div>)
    } 
   else{
    return (
      <div id="subject-page-list">
           <AdminNavbar {...this.props}/>
      <div style={{display:'flex',flexDirection:'row'}}>
      <SidebarPage {...this.props}  active={13} />
      
        <div className='colDefault' style={{width:'100%',backgroundColor:'#F9F9F9'}}>
        <div className="page_heading"><h3 style={{marginBottom:0,marginRight:'5px'}}>All Key dates</h3>
        <span onClick={()=>this.handleAddKeydates()} className='add_new_button'>Add New</span>
        {this.renderSelect()}
        </div> 
        <div>
        <ul className="subsubsub">
	<li className="all">
    <span onClick={()=>this.setState({all_selected:true,published_selected:false,trash_selected:false,draft_selected:false})}  
    className={this.state.all_selected?"text_Pub current":"text_Pub"} 
    aria-current="page">All <span className="count">({this.state.draft_count+this.state.published_count})</span></span> </li>
	<li className="publish">
    <span onClick={()=>this.setState({all_selected:false,published_selected:true,trash_selected:false,draft_selected:false})} 
    className={this.state.published_selected ?"text_Pub current":"text_Pub"}  >Active
     <span className="count">({this.state.published_count})</span></span> </li>
	<li className="draft">
    <span onClick={()=>this.setState({all_selected:false,published_selected:false,trash_selected:false,draft_selected:true})} 
    className={this.state.draft_selected ?"text_Pub current":"text_Pub"}  >In-Active
     <span className="count">({this.state.draft_count})</span></span> </li>
  
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
                       <th className="" >Name</th>
                      <th className="textFontSize"> Description</th>
                      <th>Status</th>
                  </tr>
                 
                  <MDBTableBody>
                  { this.state.Keydates.map((item,index) => {
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

export default allKeyDates;


