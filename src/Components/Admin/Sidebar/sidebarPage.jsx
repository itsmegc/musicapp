import React from 'react'

import './sidebar.css';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBTabPane, MDBTabContent, MDBNav,  MDBNavLink, MDBIcon, MDBNavItem, MDBBtn,MDBRow,MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from "mdbreact";
import Artist from './../../artist/artist';


class SidebarPage extends React.Component{
  constructor( props ) {
    super( props );

    
//   
}

  render(){
  
return (
 <div style={{backgroundColor:'rgb(48,51,54)',minHeight:"100vh",width:'15%'}}>

   <h4 style={{fontSize:'15px' ,backgroundColor:'rgb(74, 62, 36)', textAlign:'center',padding:'5% 0% 5% 0%'}}> <a  style={{ color: '#fff'}} href='https://itsmegc.github.io/justMusic/#/' target='_blank'>Open Website</a></h4>
   
 
  



 
    <MDBDropdown dropright   className='sidebar_dropdown' style={{width:'100%'}}  >
      <MDBDropdownToggle  color="gray" className='sidebar_dropdown_btn' style={{ color: '#fff' }}  >
      
      <div className='sidebar_dropdown_name_icon_main'> <div  className='sidebar_dropdown_icon'><MDBIcon icon="anchor" /></div>
        <div className='sidebar_dropdown_name' >Artist</div></div>
 
      
      </MDBDropdownToggle>
      <MDBDropdownMenu  className='sidebar_dropdown_Menu_Item'>
 

      <MDBDropdownItem className='sidebar_dropdown_Item'  onClick={()=>this.props.history.push('/admin/lecture')} >All Artist</MDBDropdownItem>
      <MDBDropdownItem className='sidebar_dropdown_Item'  onClick={()=>this.props.history.push('admin/addArtist')} >Add Artist</MDBDropdownItem>
     
     
     </MDBDropdownMenu>
    </MDBDropdown>


   

 </div>
  
  )
  
  }
}

export default SidebarPage;
