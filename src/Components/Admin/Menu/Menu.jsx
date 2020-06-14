import React,{Component} from 'react';
import SidebarPage from '../Sidebar/sidebarPage';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,
 } from "mdbreact";
import AdminNavbar from '../Navbar/adminNavbar'
import './menu.css'
import swal from 'sweetalert';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import {Picky} from "react-picky";
import "react-picky/dist/picky.css";
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

// const bigList = [];

// for (var i = 1; i <= 30; i++) {
//   bigList.push({ id: i, name: `Item ${i}` });
// }

class Menu extends Component {
  constructor( props ) {
      super( props );

      this.state = {header_data:[],child_data:[],modal_co:false,selected_menu:null,menu_id:false,delete_id:'',
      new_name:'',url:'',add_modal:false,parent_id:0,add_id:false ,
      menu_data:[], selected:0,solutionsList:[],productsList:[],categoryList:[],subCategoryList:[],
      arrayValue: [],arrayValue1:[], menu_page:[{name:'Pages'},{name:'Products'},{name:'Solutions'},{name:'Categories'},
      {name:'Sub-categories'}],id:null,select_show:false,edit_modal:false,
      sub_id:null,
      };
      this.selectMultipleOption = this.selectMultipleOption.bind(this);
      this.itemRenderer = this.itemRenderer.bind(this);
      this.handleRLDDChange = this.handleRLDDChange.bind(this);
      this.handleRLDDChange1 = this.handleRLDDChange1.bind(this);
  }



 add_to_menu= (item)=>{

    swal({

      title: "Are you sure?",
      text:'You want to add menu',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this.addMenu(item)} else return
    });


   }




  selectMultipleOption(value) {
    console.count('onChange')
  
    this.setState({ arrayValue: value });
    
    
  }

  handleChangeName=(text,index)=> {
 
    let {selected_menu} =this.state
  
    selected_menu.name=text.target.value
  this.setState({selected_menu})
  }

  handleChangeUrl=(text,index)=> {
  
      let {selected_menu} =this.state
    
      selected_menu.page_url=text.target.value
    this.setState({selected_menu})
    }


handleChangeName1=(text,index)=> {

    let {child_data} =this.state
  let selected_item = child_data[index]
  selected_item.name=text.target.value
  this.setState({child_data})
  }

  handleChangeUrl1=(text,index)=> {
  
      let {child_data} =this.state
    let selected_item = child_data[index]
    selected_item.page_url=text.target.value
    this.setState({child_data})
    }


componentWillMount(){
 this.getMenu()

 

}




updateMenu=async()=>{
 
    this.setState({
      loading:true,
      
    })
     let details = {
     menu_data:JSON.stringify(this.state.menu_data)
   };

   let formBody = [];
   for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   this.setState({
    response: fetch('http://18.221.47.207:3000/update_menu', {
      method: 'POST',
      headers: {
       
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'max-age=31536000'
    },
   body:formBody
     
      
    }).then((response) => response.json())
    .then((responseJson)=>{
      // window.location.reload();
      swal('Success',responseJson.message,'success')
    this.getMenu()
        }
    
    )
      .catch((error) => {
     this.setState({
       loading:false
     })
    //  swal("Warning!", "Check your network!", "warning");
   console.log(error)
       })
      })
  
 
 

}

updateMenuItem=(item)=>{

  this.setState({
    loading:true,
    
  })
   let details = {
   tab_id:this.state.selected_menu.tab_id,
   page_url:this.state.selected_menu.page_url,
   name:this.state.selected_menu.name
 };
 console.log(details,'details-edit')
 let formBody = [];
 for (let property in details) {
  let encodedKey = encodeURIComponent(property);
  let encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 this.setState({
  response: fetch('http://18.221.47.207:3000/update_menu_item', {
    method: 'POST',
    headers: {
     
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
 body:formBody
   
    
  }).then((response) => response.json())
  .then((responseJson)=>{
    console.log(responseJson)
      window.location.reload();
  
      }
  
  )
    .catch((error) => {
   this.setState({
     loading:false
   })
  //  swal("Warning!", "Check your network!", "warning");
 console.log(error)
     })
    })




}


deleteMenu=async()=>{
  
  this.setState({
    loading:true,
    
  })
   let details = {
   tab_id:this.state.delete_id
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
  response: fetch('http://18.221.47.207:3000/delete_menu_item', {
    method: 'POST',
    headers: {
     
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
 body:formBody
   
    
  }).then((response) => response.json())
  .then((responseJson)=>{
    swal('Success','Item Deleted','success')
     //window.location.reload();
  this.getMenu()
      }
  
  )
    .catch((error) => {
   this.setState({
     loading:false
   })
  //  swal("Warning!", "Check your network!", "warning");
 console.log(error)
     })
    })
 
 

}


add_to_menu1= (item)=>{

   swal({

     title: "Are you sure?",
     text:'You want to add menu',
     icon: "warning",
     buttons: true,
     dangerMode: true,
   })
   .then((willAdd) => {
     if (willAdd) {
       this.addMenu1(item)} else return
   });


  }

addMenu1=async(item)=>{
  // console.log(this.state.arrayValue,'asas')

  this.setState({
    loading:true,
    add_modal:false
  })
  
  for(var v=0;v<this.state.arrayValue.length;v++)
  {
  if(this.state.sub_id==1){
    var details = {
      name:this.state.arrayValue[v].name,
     page_url:this.state.arrayValue[v].page_url,
     parent_id:this.state.parent_id,
     sort_order:this.state.child_data.length,
   };
  }
  else{
    var details = {
      name:this.state.arrayValue[v].name,
     page_url:this.state.arrayValue[v].page_url,
     parent_id:this.state.parent_id,
     sort_order:this.state.menu_data.length,
   };
  }
 console.log(details,'add-details of add-item')
}
 let formBody = [];
 for (let property in details) {
  let encodedKey = encodeURIComponent(property);
  let encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 this.setState({
  response: fetch('http://18.221.47.207:3000/add_menu_item', {
    method: 'POST',
    headers: {
     
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
 body:formBody
   
    
  }).then((response) => response.json())
  .then((responseJson)=>{
   swal('Success','Menu Updated','success')
   window.location.reload()
        
  }
 
  )
    .catch((error) => {
   this.setState({
     loading:false
   })
  //  swal("Warning!", "Check your network!", "warning");
 console.log(error)
     })
    })
 
  } 



add_to_menu2= (item)=>{

    swal({

      title: "Are you sure?",
      text:'You want to add menu',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this.addMenu2(item)} else return
    });


  }

addMenu2=async(item)=>{
  // console.log(this.state.arrayValue,'asas')

  this.setState({
    loading:true,
    add_modal:false
  })
  
  for(var v=0;v<this.state.arrayValue.length;v++)
  {
    if(this.state.sub_id==1){
      var details = {
        name:this.state.arrayValue[v].name,
       page_url:this.state.arrayValue[v].page_url,
       parent_id:this.state.parent_id,
       sort_order:this.state.child_data.length,
     };
    }
    else{
      var details = {
        name:this.state.arrayValue[v].name,
       page_url:this.state.arrayValue[v].page_url,
       parent_id:this.state.parent_id,
       sort_order:this.state.menu_data.length,
     };
    }
  console.log(details,'add-details of add-item')
}
  let formBody = [];
  for (let property in details) {
  let encodedKey = encodeURIComponent(property);
  let encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  this.setState({
  response: fetch('http://18.221.47.207:3000/add_menu_item', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
  body:formBody
    
    
  }).then((response) => response.json())
  .then((responseJson)=>{
    swal('Success',responseJson.message,'success')
   this.getMenu()
        
  }
  
  )
    .catch((error) => {
    this.setState({
      loading:false
    })
    // swal("Warning!", "Check your network!", "warning");
  console.log(error)
      })
    })
  
  

  } 
 
  
add_to_menu3= (item)=>{
 
    swal({

      title: "Are you sure?",
      text:'You want to add menu',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this.addMenu3(item)} else return
    });


  }

addMenu3=async(item)=>{
  this.setState({
    loading:true,
    add_modal:false
  })
  
  for(var v=0;v<this.state.arrayValue.length;v++)
  {
    if(this.state.sub_id==1){
      var details = {
        name:this.state.arrayValue[v].name,
       page_url:this.state.arrayValue[v].page_url,
       parent_id:this.state.parent_id,
       sort_order:this.state.child_data.length,
     };
    }
    else{
      var details = {
        name:this.state.arrayValue[v].name,
       page_url:this.state.arrayValue[v].page_url,
       parent_id:this.state.parent_id,
       sort_order:this.state.menu_data.length,
     };
    }
  console.log(details,'add-details of add-item')
}
  let formBody = [];
  for (let property in details) {
  let encodedKey = encodeURIComponent(property);
  let encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  this.setState({
  response: fetch('http://18.221.47.207:3000/add_menu_item', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
  body:formBody
    
    
  }).then((response) => response.json())
  .then((responseJson)=>{
    swal('Success',responseJson.message,'success')
    window.location.reload()
        
  }
  
  )
    .catch((error) => {
    this.setState({
      loading:false
    })
    // swal("Warning!", "Check your network!", "warning");
  console.log(error)
      })
    })
  
  

  } 



add_to_menu4= (item)=>{
 
    swal({

      title: "Are you sure?",
      text:'You want to add menu',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this.addMenu4(item)} else return
    });


  }

addMenu4=async(item)=>{
  this.setState({
    loading:true,
    add_modal:false
  })
  
  for(var v=0;v<this.state.arrayValue.length;v++)
  {
  var details = {
    name:this.state.arrayValue[v].category_name,
    page_url:this.state.arrayValue[v].page_url,
    parent_id:this.state.parent_id,
    sort_order:this.state.menu_data.length,
  };
  console.log(details,'add-details of add-item')
}
  let formBody = [];
  for (let property in details) {
  let encodedKey = encodeURIComponent(property);
  let encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  this.setState({
  response: fetch('http://18.221.47.207:3000/add_menu_item', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
  body:formBody
    
    
  }).then((response) => response.json())
  .then((responseJson)=>{
    swal('Success',responseJson.message,'success')
    window.location.reload()
        
  }
  
  )
    .catch((error) => {
    this.setState({
      loading:false
    })
    // swal("Warning!", "Check your network!", "warning");
  console.log(error)
      })
    })
  
  

  } 


add_to_menu5= (item)=>{
  console.log(item,"xxx")
    swal({

      title: "Are you sure?",
      text:'You want to add menu',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willAdd) => {
      if (willAdd) {
        this.addMenu5(item)} else return
    });


  }

addMenu5=async(item)=>{
  this.setState({
    loading:true,
    add_modal:false
  })
  
  for(var v=0;v<this.state.arrayValue.length;v++)
  {
  var details = {
    name:this.state.arrayValue[v].sub_category_name,
    page_url:this.state.arrayValue[v].page_url,
    parent_id:this.state.parent_id,
    sort_order:this.state.menu_data.length,
  };
  console.log(details,'add-details of add-item')
}
  let formBody = [];
  for (let property in details) {
  let encodedKey = encodeURIComponent(property);
  let encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  this.setState({
  response: fetch('http://18.221.47.207:3000/add_menu_item', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'max-age=31536000'
  },
  body:formBody
    
    
  }).then((response) => response.json())
  .then((responseJson)=>{
    swal('Success',responseJson.message,'success')
    window.location.reload()
        
  }
  
  )
    .catch((error) => {
    this.setState({
      loading:false
    })
    // swal("Warning!", "Check your network!", "warning");
  console.log(error)
      })
    })
  
  

  }   



// --------------- function for selecting menu and sort that sub-menu item-----
gotoSelectMenu(item,index){
  let {menu_data} = this.state
  let selected_data=menu_data[index]
  let parent_id = this.setState({parent_id:menu_data[index].tab_id});
  let child_sort=  item.child.sort((a, b) => { return a.sort_order - b.sort_order;})
  console.log(child_sort,'child-sorting')
  for(var v=0;v<menu_data.length;v++){
this.setState({sub_id:null})
menu_data[v].selected=0
  }
  selected_data.selected=1
  this.setState({menu_data,sub_id:1})
  
}

// -------------- function for rendering sub menu items--------
renderSubMenu(item){  
console.log(item,'submenu-data')

  if(item.length!==0){
   
  
    return(
      <div className="menu_data_div">
        <RLDD
            items={item}
            itemRenderer={(data,index) => {
              if(data.status===1){
              data.sort_order=index
              return (
                <div className="sub-item" >
                {data.name}
                <div className="edit_btn_div">
          {/* <MDBIcon icon="edit" onClick={()=>this.edit_subMenu(data,index)} style={{cursor:'pointer'}}/>
          <MDBIcon far icon="trash-alt" style={{cursor:'pointer'}}  onClick={()=>this.setState({delete_id:item[index].tab_id},()=>this.deleteMenu(data,index))}/> */}
         </div>
              </div>
              
              );}}}
        onChange={this.handleRLDDChange1}
       /> 
      </div>
    )}
    
    
}

handleRLDDChange1(reorderedItems) {
  this.setState({ child_data: reorderedItems });
}


edit_subMenu(data){
  console.log(data,"submenu")
    this.setState({
     menu_data:data,
    })
    
    this.toggle_edit()
    
    }



// -------------function for rendering menu data---------
  itemRenderer(item, index) {
    item.sort_order=index
    console.log(this.state.header_data)
    if(item.status===1){
      if(item.selected===0){
        return (
          <div >
             <div className="menuDiv"  >
             <p style={{marginBottom:0}}>{item.name}</p>
             <div className="edit_btn_div" style={{justifyContent:'flex-end'}}>
            
             <MDBIcon far icon="trash-alt" style={{cursor:'pointer',padding:5}}  onClick={()=>this.setState({delete_id:this.state.menu_data[index].tab_id},()=>{swal({
    title: "Are you sure?",
    text:'You are deleting this product!!',
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.deleteMenu()} else return
  });})}/>
   {/* <MDBIcon icon="edit" onClick={()=>this.edit_menu(item,index)} style={{cursor:'pointer',marginLeft:10}}/>  */}
                {/* <div onClick={()=>this.setState({child_data:item.child},()=>this.gotoSelectMenu(item,index))}>  <MDBIcon icon="caret-right" /></div> */}
              {/* <MDBIcon far icon="plus-square" onClick={()=>this.toggle_add()}> Add Sub Menu</MDBIcon>
              
              
               */}
             </div>
             
           </div>
         
      
          </div>
         );
      }
     else{
     
        return (
          <div >
             <div className="selectedMenuDiv" onClick={()=>this.setState({child_data:item.child},()=>this.gotoSelectMenu(item,index))} >
             <p style={{marginBottom:0}}>{item.name}</p>
             <div className="edit_btn_div" style={{justifyContent:'flex-end'}}>
            
             <MDBIcon far icon="trash-alt" style={{cursor:'pointer',padding:'5px 10px'}}  onClick={()=>this.setState({delete_id:this.state.menu_data[index].tab_id},()=>{swal({
    title: "Are you sure?",
    text:'You are deleting this product!!',
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.deleteMenu()} else return
  });})}/>
             
                <div onClick={()=>this.setState({child_data:item.child},()=>this.gotoSelectMenu(item,index))}> | page <MDBIcon icon="caret-right" />
                </div>
              {/* <MDBIcon far icon="plus-square" onClick={()=>this.toggle_add()}> Add Sub Menu</MDBIcon>
              
               <MDBIcon icon="edit" onClick={()=>this.edit_menu(item,index)} style={{cursor:'pointer'}}/>
                */}
             </div>
             
           </div>
         
      
          </div>
         
       )
     } 
      
    }
     
  }
  
  handleRLDDChange(reorderedItems) {
    
    this.setState({ menu_data: reorderedItems });
  }

  edit_menu(data){

    console.log(data,"edit")
    this.setState({
        selected_menu:data,
       
        
       },this.toggle_edit)
    
    
    
    }


toggle_edit = () => {
    this.setState({
        edit_modal:!this.state.edit_modal
  
    })
 }
  

  renderEditMenu(item,index){
    console.log(this.state.menu_data,"subeditX")
   if(this.state.edit_modal){
   
        return(
          <MDBModal isOpen={this.state.edit_modal} toggle={this.toggle_edit}>
          <MDBModalHeader toggle={this.toggle_edit}>Edit Menu Details</MDBModalHeader>
          <MDBModalBody>
          <div style={{fontSize:15,padding:'20px 10px'}}>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Navigation label
        </label>
        <input
            autofocus
            value={this.state.selected_menu.name}
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              onChange={(text)=>this.handleChangeName(text,index)}
            />
          <label htmlFor="defaultFormRegisterNameEx" className="grey-text labelPadding">
            Page Url
       </label>
             <input
            autofocus
            value={this.state.selected_menu.page_url}
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              onChange={(text)=>this.handleChangeUrl(text,index)}
            />
        </div>
          </MDBModalBody>
          <MDBModalFooter>
            <button className="publish_button button_default2" onClick={this.toggle_edit}>Close</button>
            <button className="publish_button button_default2" style={{width:'auto'}} onClick={()=>this.updateMenuItem()}>Save changes</button>
          </MDBModalFooter>
        </MDBModal>
        )
      
    
   }
     

  }

  handleChangeAddName=(e)=> {
    this.setState({new_name: e.target.value});
  }

  handleChangeAddUrl=(e)=> {
    this.setState({url: e.target.value});
  }

  add_menuItem(){
    this.setState({
     add_id:!this.state.add_id
    })
    
    this.toggle_add()
    
    }


toggle_add = () => {

    this.setState({
    add_modal: !this.state.add_modal
    });
}
  
  renderAddMenuItem(){
   if(this.state.add_id===true){
    return(
      <MDBModal isOpen={this.state.add_modal} toggle={this.toggle_add}>
      <MDBModalHeader toggle={this.toggle_add}>Add Menu Details</MDBModalHeader>
      <MDBModalBody>
      <div style={{fontSize:20}}>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
            Add Navigation label
        </label>
        <input
            value={this.state.new_name}
            onChange={this.handleChangeAddName}
            placeholder=""
            type="text"
            id="new_name"
            className="form-control "
            required
            
        />
    
      <label htmlFor="defaultFormRegisterNameEx" className="grey-text labelPadding">
          Add Page Url
      </label>
         <input
        autofocus
        value={this.state.url}
          type="text"
          placeholder=""
          id="defaultFormRegisterNameEx"
          className="form-control"
          onChange={this.handleChangeAddUrl}
        />
    </div>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn className="admin_btn" onClick={this.toggle_add}>Close</MDBBtn>
        <MDBBtn className="admin_btn" onClick={()=>this.addMenu()}>Save</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
    )
   }
   else{
    return(
      <MDBModal isOpen={this.state.add_modal} toggle={this.toggle_add}>
      <MDBModalHeader toggle={this.toggle_add}>Add Sub-Menu Details</MDBModalHeader>
      <MDBModalBody>
      <div style={{fontSize:20}}>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
            Add Navigation label
        </label>
        <input
            value={this.state.new_name}
            onChange={this.handleChangeAddName}
            placeholder=""
            type="text"
            id="new_name"
            className="form-control"
            required
            
        />
    
      <label htmlFor="defaultFormRegisterNameEx" className="grey-text labelPadding">
          Add Page Url
      </label>
         <input
        autofocus
        value={this.state.url}
          type="text"
          placeholder=""
          id="defaultFormRegisterNameEx"
          className="form-control"
          onChange={this.handleChangeAddUrl}
        />
    </div>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn className="admin_btn" onClick={this.toggle_add}>Close</MDBBtn>
        <MDBBtn className="admin_btn" onClick={()=>this.addMenu()}>Save</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
    )
   }
  }



  getContent=async()=>{
   
  this.setState({
    response: fetch('http://18.221.47.207:3000/get_header-content', {

     method: 'GET',
     
     headers: {
      
       'Content-Type': 'application/x-www-form-urlencoded',
       
     
    },
    
    
     
    }).then((response) => response.json())
    .then((responseJson)=>{
    console.log(responseJson ,'get_content')
    // for(var v=0;v<responseJson.length;v++){
    //   responseJson[v].selected=0
    //   responseJson[this.state.selected_index].selected=1
    // }
      this.setState({menu_page:responseJson})
      
    }
    // , ()=>console.log(this.state.menu_page,'x-x')
    )
     .catch((error) => {
    this.setState({
      loading:false
    })
    
    console.log(error)
      })
     })
  }
  getMenu=async()=>{
    this.setState({
        loading:true
    })
  this.setState({
    response: fetch('http://18.221.47.207:3000/get_menu', {

     method: 'GET',
     
     headers: {
      
       'Content-Type': 'application/x-www-form-urlencoded',
       
     
    },
    
    
     
    }).then((response) => response.json())
    .then((responseJson)=>{
    console.log(responseJson ,'get_menu')
    for(var v=0;v<responseJson.length;v++){
        responseJson[v].selected=0
        responseJson[v].id=v
        if((responseJson[v].child).length!==0){
          for(var v1=0;v1<(responseJson[v].child).length;v1++){
          
            (responseJson[v].child)[v1].id=v1
          
          }
        }
      }
    let sort =  
    responseJson.sort((a, b) => {  return a.sort_order - b.sort_order;})
      this.setState({menu_data:responseJson, loading:false},()=>this.getContent())
      
    }
    
    )
     .catch((error) => {
    this.setState({
      loading:false
    })
    
    console.log(error)
      })
     })
  }
 


renderMenuPageItem(){
    if(this.state.menu_page[0].selected===1){
      return(
        <div style={{border:'1px solid #E5E5E5'}}>
          <div className="selectedMenuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[0],0)}>
               <p style={{marginBottom:0}}>Content Pages</p>
               <div className="menuPageItemArrow" style={{justifyContent:''}} >
                  <div ><MDBIcon icon="caret-down" /></div>
                  
                </div>
               
               </div>{this.renderPageMenu(this.state.menu_page[0])}
        </div>
      )
    }
  
    else{
      return(
        <div style={{border:'1px solid #E5E5E5'}}>
          <div className="menuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[0],0)}>
               <p style={{marginBottom:0}}>Content Pages</p>
               <div className="menuPageItemArrow" style={{justifyContent:''}}>
                  <div ><MDBIcon icon="caret-down"  /></div>
                  
                </div>
          </div>
           {this.renderPageMenu(this.state.menu_page[0])}
        </div>
      )
    }
   
}





renderMenuSolutionItem(){
  
     if(this.state.menu_page[2].selected===1){
       return(
         <div style={{border:'1px solid #E5E5E5'}}>
           <div className="selectedMenuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[2],2)}>
                <p style={{marginBottom:0}}>{this.state.menu_page[2].name}</p>
                <div className="menuPageItemArrow" style={{justifyContent:''}}>
                   <div ><MDBIcon icon="caret-down" /></div>
                   
                 </div>
                
                </div>{this.renderSolutionMenu(this.state.menu_page[2])}
         </div>
       )
     }
   
     else{
       return(
         <div style={{border:'1px solid #E5E5E5'}}>
           <div className="menuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[2],2)}>
                <p style={{marginBottom:0}}>{this.state.menu_page[2].name}</p>
                <div className="menuPageItemArrow" style={{justifyContent:''}}>
                   <div ><MDBIcon icon="caret-down"  /></div>
                   
                 </div>
           </div>
            {this.renderSolutionMenu(this.state.menu_page[2])}
         </div>
       )
     }
   
 }

 renderSolutionMenu(item){
  if(item.selected===1 && this.state.select_show===true){
   return(
    <div style={{padding:'10% 5% 25% 5%',backgroundColor:'#fff'}}>
    <div style={{border: '1.5px solid #E5E5E5'}}>
      

      <Picky
        className='asa'
        value={this.state.arrayValue}
        options={this.state.solutionsList}
        onChange={this.selectMultipleOption}
        open={true}
        valueKey="solution_id"
        labelKey="solution_name"
        multiple={true}
        includeSelectAll={true}
        includeFilter={true}
        dropdownHeight={600}
      />
      </div>
      <div >
      <button  className="btnam" style={{  width: '50%'}} onClick={()=>this.add_to_menu3(this.state.arrayValue)} >Add to Menu</button>

      </div>

    </div>
   )}
 } 



gotoSelectMenuPage(item,index){
  console.log(item,index,'kjkk')
  let {menu_page} = this.state
  let selected_page=menu_page[index]
  for(var v=0;v<menu_page.length;v++){

    menu_page[v].selected=0
  }
  selected_page.selected=1
  this.setState({menu_page})
  this.selectToggleMenu();
}


selectToggleMenu(){
  this.setState({
    select_show:!this.state.select_show
  })
}  



renderPageMenu(item){
  
      if(item.selected===1 && this.state.select_show===true){
          return(
            <div style={{padding:'10% 5% 25% 5%',backgroundColor:'#fff'}}>
            <div style={{border: '1.5px solid #E5E5E5'}}>
              

              <Picky
                className='asa'
                value={this.state.arrayValue}
                options={this.state.menu_page}
                onChange={this.selectMultipleOption}
                open={true}
                valueKey="id"
                labelKey="name"
                multiple={true}
                includeSelectAll={true}
                includeFilter={true}
                dropdownHeight={600}
              />
              </div>
              <div >
              <button  className="btnam" style={{  width: '50%'}} onClick={()=>this.add_to_menu1(this.state.arrayValue)} >Add to Menu</button>

              </div>

            </div>
          )
        
      }
   
}  





renderMenuProductItem(){
  
  if(this.state.menu_page[1].selected===1){
    return(
      <div style={{border:'1px solid #E5E5E5'}}>
        <div className="selectedMenuPageItems"onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[1],1)} >
             <p style={{marginBottom:0}}>{this.state.menu_page[1].name}</p>
             <div className="menuPageItemArrow" style={{justifyContent:''}}>
                <div ><MDBIcon icon="caret-down" /></div>
                
              </div>
             
             </div>{this.renderProductMenu(this.state.menu_page[1])}
      </div>
    )
  }

  else{
    return(
      <div style={{border:'1px solid #E5E5E5'}}>
        <div className="menuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[1],1)}>
             <p style={{marginBottom:0}}>{this.state.menu_page[1].name}</p>
             <div className="menuPageItemArrow" style={{justifyContent:''}}>
                <div ><MDBIcon icon="caret-down"  /></div>
                
              </div>
        </div>
         {this.renderProductMenu(this.state.menu_page[1])}
      </div>
    )
  }

}


renderProductMenu(item){
  console.log(item,this.state.productsList,"ppppp")
if(item.selected===1 && this.state.select_show===true){
  return(
    <div style={{padding:'10% 5% 25% 5%',backgroundColor:'#fff'}}>
    <div style={{border: '1.5px solid #E5E5E5'}}>
      

      <Picky
        className='asa'
        value={this.state.arrayValue}
        options={this.state.productsList}
        onChange={this.selectMultipleOption}
        open={true}
        valueKey="product_id"
        labelKey="product_name"
        multiple={true}
        includeSelectAll={true}
        includeFilter={true}
        dropdownHeight={600}
      />
      </div>
      <div >
      <button  className="btnam" style={{  width: '50%'}} onClick={()=>this.add_to_menu2(this.state.arrayValue)} >Add to Menu</button>

      </div>

    </div>
  )

}
}
  




renderMenuCategoryItem(){
  if(this.state.menu_page[3].selected===1){
    return(
      <div style={{border:'1px solid #E5E5E5'}}>
        <div className="selectedMenuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[3],3)}>
             <p style={{marginBottom:0}}>{this.state.menu_page[3].name}</p>
             <div className="menuPageItemArrow" style={{justifyContent:''}}>
                <div ><MDBIcon icon="caret-down" /></div>
                
              </div>
             
             </div>{this.renderCategoryMenu(this.state.menu_page[3])}
      </div>
    )
  }

  else{
    return(
      <div style={{border:'1px solid #E5E5E5'}}>
        <div className="menuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[3],3)}>
             <p style={{marginBottom:0}}>{this.state.menu_page[3].name}</p>
             <div className="menuPageItemArrow" style={{justifyContent:''}}>
                <div ><MDBIcon icon="caret-down"  /></div>
                
              </div>
        </div>
         {this.renderCategoryMenu(this.state.menu_page[3])}
      </div>
    )
  }
 
}


renderCategoryMenu(item){
  
  if(item.selected===1 && this.state.select_show===true){
      return(
        <div style={{padding:'10% 5% 25% 5%',backgroundColor:'#fff'}}>
        <div style={{border: '1.5px solid #E5E5E5'}}>
          

          <Picky
            className='asa'
            value={this.state.arrayValue}
            options={this.state.categoryList}
            onChange={this.selectMultipleOption}
            open={true}
            valueKey="category_id"
            labelKey="category_name"
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
            dropdownHeight={600}
          />
          </div>
          <div >
          <button  className="btnam" style={{  width: '50%'}} onClick={()=>this.add_to_menu4(this.state.arrayValue)} >Add to Menu</button>

          </div>

        </div>
      )
    
  }

}  






renderMenuSubCategoryItem(){
  if(this.state.menu_page[3].selected===1){
    return(
      <div style={{border:'1px solid #E5E5E5'}}>
        <div className="selectedMenuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[4],4)}>
             <p style={{marginBottom:0}}>{this.state.menu_page[4].name}</p>
             <div className="menuPageItemArrow" style={{justifyContent:''}}>
                <div ><MDBIcon icon="caret-down" /></div>
                
              </div>
             
             </div>{this.renderSubCategoryMenu(this.state.menu_page[4])}
      </div>
    )
  }

  else{
    return(
      <div style={{border:'1px solid #E5E5E5'}}>
        <div className="menuPageItems" onClick={()=>this.gotoSelectMenuPage(this.state.menu_page[4],4)}>
             <p style={{marginBottom:0}}>{this.state.menu_page[4].name}</p>
             <div className="menuPageItemArrow" style={{justifyContent:''}}>
                <div ><MDBIcon icon="caret-down"  /></div>
                
              </div>
        </div>
         {this.renderSubCategoryMenu(this.state.menu_page[4])}
      </div>
    )
  }
 
}


renderSubCategoryMenu(item){
  
  if(item.selected===1 && this.state.select_show===true){
      return(
        <div style={{padding:'10% 5% 25% 5%',backgroundColor:'#fff'}}>
        <div style={{border: '1.5px solid #E5E5E5'}}>
          

          <Picky
            className='asa'
            value={this.state.arrayValue}
            options={this.state.subCategoryList}
            onChange={this.selectMultipleOption}
            open={true}
            valueKey="sub_category_id"
            labelKey="sub_category_name"
            multiple={true}
            includeSelectAll={true}
            includeFilter={true}
            dropdownHeight={600}
          />
          </div>
          <div >
          <button  className="btnam" style={{  width: '50%'}} onClick={()=>this.add_to_menu5(this.state.arrayValue)} >Add to Menu</button>

          </div>

        </div>
      )
    
  }

}  

// componentDidMount(){
//   var admindata= window.localStorage.getItem('admindata')
//   if(admindata==null){
//       this.props.history.push('/login')
//   }
// }

  render() {
console.log(this.state.menu_data,'mmmm')
    return (
        <div className="font-family">
        <AdminNavbar {...this.props}/>
        <div style={{display:'flex',flexDirection:'row'}}>
        <SidebarPage {...this.props}/>
          <div style={{width:'100%',backgroundColor:'#F1F1F1'}}>
             <div style={{padding:15}}>
                <h3 className="">Menus</h3>
                {/* <hr/> */}
             </div>
          <div style={{display:'flex',justifyContent:""}}>
          <div style={{padding:'10px 10px 10px 20px'}}>
              <h3 className="headingFontSize">Add menu items</h3>
              

              <div style={{boxShadow:'#E5E5E5 0px 1px 3px 0px'}}>

            <div style={{border:'1px solid #E5E5E5'}}>
             {this.renderMenuPageItem()}
             {/* {this.renderMenuProductItem()}
             {this.renderMenuSolutionItem()}
             {this.renderMenuCategoryItem()}
             {this.renderMenuSubCategoryItem()} */}
             </div>
            
          </div>

          </div>

          <div style={{padding:'10px 20px 10px 10px',height:'auto',width:'100%'}}>
              <h3 className="headingFontSize">Menu</h3>

                        <div style={{boxShadow:'#E5E5E5 1px 1px 3px 0px',border:'1px solid #E5E5E5'}}>

              <div style={{border:'1px solid #E5E5E5'}}>
              <MDBNavbar  className="menuNavbar" dark expand="md">
           
           <MDBNavbarNav right style={{display:'flex'}}> 
          
             
           <MDBNavItem onClick={()=> this.updateMenu()}>
               <button style={{margin:'0px 3px'}} className="publish_button button_default2">Save & Publish</button>
               
             </MDBNavItem>
           </MDBNavbarNav>
         </MDBNavbar>
              </div>

            <div style={{backgroundColor:'white'}}>
            <p className="textFontSize" style={{padding:'30px 0 0 22px'}}>
          Drag each item into the order you prefer. Click the the item to reveal additional configuration options.</p>
          
          <div className='rowDefault' style={{height:'auto'}}>         
                <RLDD
                    items={this.state.menu_data}
                    itemRenderer={this.itemRenderer}
                    onChange={this.handleRLDDChange}
                  />
                
          {/* {this.renderSubMenu(this.state.child_data)} */}
          </div>
            </div>
          
          {/* <div style={{display:'flex',justifyContent:'flex-end',backgroundColor:'#F5F5F5',border:'1px solid #E5E5E5'}}>
          <MDBBtn className="add_btn " style={{margin:'1%',borderRadius:'5px',height:'4.5vh'}} onClick={()=>this.add_menuItem()}>Add Item</MDBBtn>
          </div> */}
          
          </div>

          </div>
        


        </div>
          
          {/* <ReactDragList
          dataSource={this.state.header_data}
          rowKey="sn"
          row={(record, index) => 
           
            <div onClick={()=>this.gotoSelectMenu(record,index)} style={{borderColor:'grey',display:'flex',borderWidth:0,borderStyle:'solid',padding:10,width:'40vw',boxShadow:'grey 1px 1px 2px 1px',backgroundColor:'#f1f1f1'}}>
               {index+record.name}
      {this.renderSubMenu(record,index)}
            </div> 
          }
          handles={true}
          className="simple-drag"
          rowClassName="simple-drag-row"
          onUpdate={this._handleUpdate}
        />     */}
         
        </div>
        
        </div>
        {this.renderAddMenuItem(this.state.menu_data,this.state.menu_data.index)}
        {this.renderEditMenu()}
        </div>
    );
}
}

export default Menu;
