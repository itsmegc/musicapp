
import React from 'react';
import './chooseMediaFile.css';
import swal from "sweetalert";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {  
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,MDBCardHeader,MDBIcon,MDBInput,MDBTable,MDBTableBody,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBNavbar,MDBBtn,MDBNavItem,MDBNavbarNav  } from "mdbreact";
    import Select from "react-select";
    import DocX from '../../../Assets/images/docxType.png';
import PPTX from '../../../Assets/images/pptxType.png';
import PPT from '../../../Assets/images/pptType.png';
import Video from '../../../Assets/images/play-button-type.png';
import PDF from '../../../Assets/images/pdfType.png';
import ScrollAnimation from "react-animate-on-scroll";

import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";




class MediaComponent extends React.Component {

  constructor(props){
    super(props);
    this.state={ 
    media_Module:false,
    uploadedFile:null,
    buttonName:props.buttonName,
    restrictiontype:props.restriction?props.restriction:"",img_value:[],
    modal_add:false,modal_image:false,selectedType: "",name:'',
    //cloading:true
    // file:'',


    }
      }



      deleteAlert(item){

        swal({
     
               title: "Are you sure?",
               text:'You want to delete this page',
               buttons: true,
               icon: "warning",
               dangerMode: true,
             })
             .then((willAdd) => {
               if (willAdd) {
                 this.deleteFile(item)} else {
                  swal("delete!");
       }
             });


      }

   deleteFile(item){
     


    this.setState({
      loading:true
      // add_modal:false
      })


        let formData = new FormData()
      
        formData.append('id',item.id);
     
        for (let key of formData.entries()) {
          console.log(key[0] + ',with photo ' + key[1]);
      }



          // this.setState({
          // response: fetch('http://18.221.47.207:3000/delete_file', {
          // method: 'POST',
          // body: formData
          // }).then((response) => response.json())
          // .then((responseJson)=>{
          // console.log(responseJson,'QWERTy')
          // swal("Success", "File succesfullly deleted", "success").then((value)=>{
          // // this.props.history.push('/admin/subject-list')
          //       window.location.reload();
          //       this.setState({
          //         media_Module:true,
          //       })
         

          // });

          // })
          // .catch((error) => {
          // this.setState({
          // loading:false
          // })
          // swal("Warning!", "Check your network!", "warning")
          //  console.log(error)
          //     })
          // })
  }









         //ADD FORM

    addFile(){
console.log(this.state.selectedType)
      if(!this.state.file){
        swal("Checkfile!", "Please Choose File", "error");
    }
    if(this.state.selectedType.length==0){
      swal("Checkfile!", "Please Select File Type", "error");
  }

    else{



          this.setState({
          loading:true,
         
          })


            let formData = new FormData()
          
            formData.append('file',this.state.file);
            formData.append('type',this.state.selectedType.label);
            for (let key of formData.entries()) {
              console.log(key[0] + ',with photo ' + key[1]);
             }
              // this.setState({
              // response: fetch('http://18.221.47.207:3000/add_file', {
              // method: 'POST',
              // body: formData
              // }).then((response) => response.json())
              // .then((responseJson)=>{
              //   this.setState({
              //     modal_add:false,
              //     loading:false
              //    })
              // console.log(responseJson,'QWERTy')
              // swal("Success", "file succesfullly added", "success").then((value)=>{
              //          this.get_files()
                      
              // });

              // })
              // .catch((error) => {
              // this.setState({
              // loading:false
              // })
              // swal("Warning!", "Check your network!", "warning")
              //  console.log(error)
              //     })
              // })
      
  
          }
        }







      //Get Files

      get_files = async () => {
       
        // this.setState({
        //   response: fetch("http://18.221.47.207:3000/get_files", {
        //     method: "GET"
        //   })
         
        //     .then(response => response.json())

            
        //     .then(responseJson => {
        //     console.log(responseJson,'Media_com')
        //       this.setState({
        //        media_files: responseJson,
        //        img_value:responseJson,
        //        name:responseJson.file,
             
        //         loading: false
        //       });
        //     })

            
        //     .catch(error => {
        //       this.setState({
        //         loading: false
        //       });
        //       swal("Warning!", "Check your network!", "warning");
        //       console.log(error);
        //     })
        // });
      };

      componentDidMount(){
          this.get_files();
          this.setState({loading:true})
      }


      FileType(){
    
        if(this.state.name.split('.').pop()=='pdf'){
          return(
 
            <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
            className='show_image'>
             {console.log(this.state.file.name.split('.').pop())}
             {/* {console.log(this.state.file.split('.').pop())}  */}



            <img className='imgSize' img src={PDF} className="slider_div_image"  />
            <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
      
            


            </div>
          )
        }
       else if(this.state.name.split('.').pop()=='ppt'){
        return(

          <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
          className='show_image'>
           {/* {console.log(this.state.file.name.split('.').pop())} */}
           {/* {console.log(this.state.file.split('.').pop())}  */}



          <img className='imgSize'img src={PPT} className="slider_div_image"  />
          <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
    
          


          </div>
        )
       }
        else if(this.state.name.split('.').pop()=='mp4'){
          return(
 
            <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
            className='show_image'>
             {/* {console.log(this.state.file.name.split('.').pop())} */}
             {/* {console.log(this.state.file.split('.').pop())}  */}



             <img className='imgSize' img src={Video} className="slider_div_image"  />
            <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
      
            


            </div>
          )
        }
        else if(this.state.name.split('.').pop()=='mkv'){
          return(
 
            <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
            className='show_image'>
             {/* {console.log(this.state.file.name.split('.').pop())} */}
             {/* {console.log(this.state.file.split('.').pop())}  */}



             <img className='imgSize' img src={Video} className="slider_div_image"  />
            <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
      
            


            </div>
          )
        }
        else if(this.state.name.split('.').pop()=='avi'){
          return(
 
            <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
            className='show_image'>
             {/* {console.log(this.state.file.name.split('.').pop())} */}
             {/* {console.log(this.state.file.split('.').pop())}  */}



             <img className='imgSize' img src={Video} className="slider_div_image"  />
            <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
      
            


            </div>
          )
        }
        else if(this.state.name.split('.').pop()=='3gp'){
          return(
 
            <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
            className='show_image'>
             {/* {console.log(this.state.file.name.split('.').pop())} */}
             {/* {console.log(this.state.file.split('.').pop())}  */}



             <img className='imgSize' img src={Video} className="slider_div_image"  />
            <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
      
            


            </div>
          )
        }
      
          else if(this.state.name.split('.').pop()=='docx'){
            return(
   
              <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
              className='show_image'>
               {/* {console.log(this.state.file.name.split('.').pop())} */}
               {/* {console.log(this.state.file.split('.').pop())}  */}
  
  
  
              <img className='imgSize' img src={DocX} className="slider_div_image"  />
              <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
        
              
  
  
              </div>
            )
          }
          else if(this.state.name.split('.').pop()=='pptx'){
            return(
   
              <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
              className='show_image'>
               {/* {console.log(this.state.file.name.split('.').pop())} */}
               {/* {console.log(this.state.file.split('.').pop())}  */}
  
  
  
              <img className='imgSize' img src={PPTX} className="slider_div_image"  />
              <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
        
              
  
  
              </div>
            )
          }

          else if(this.state.name.split('.').pop()=='png') {
            return(
   
              <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
              className='show_image'>
               {console.log(this.state.name.split('.').pop())}
               {/* {console.log(this.state.file.split('.').pop())}  */}
  
  
  
              <img className='imgSize' src={this.state.Url} className="slider_div_image"  />
              <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
        
              
  
  
              </div>
            )
          }


          else if(this.state.name.split('.').pop()=='jpg') {
            return(
   
              <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
              className='show_image'>
               {console.log(this.state.name.split('.').pop())}
               {/* {console.log(this.state.file.split('.').pop())}  */}
  
  
  
              <img className='imgSize' src={this.state.Url} className="slider_div_image"  />
              <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
        
              
  
  
              </div>
            )
          }

          else if(this.state.name.split('.').pop()=='jpge') {
            return(
   
              <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
              className='show_image'>
               {console.log(this.state.name.split('.').pop())}
               {/* {console.log(this.state.file.split('.').pop())}  */}
  
  
  
              <img className='imgSize' src={this.state.Url} className="slider_div_image"  />
              <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
        
              
  
  
              </div>
            )
          }



        }
 
  
 



      renderMediaItem(){

        let imageUrl=''
  
  
        if(this.state.file==null){
    
      
              return(<div className="input-group" style={{width:'100%'}}  >
              <div  className="custom-file">
              <input
             
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  accept={this.state.restrictiontype}
                  aria-describedby="inputGroupFileAddon01"
                  onChange={(event)=>this.setState({file:event.target.files[0],Url:(URL.createObjectURL(event.target.files[0]))})}
              />
              <label className="custom-file-upload" htmlFor="inputGroupFile01"
               style={{width:'200px'}}
              >
              Choose file

              </label>
              </div>
              
          </div>)
          }
         
      
      else{

        
          return(
              // <div  style={{cursor:'pointer',display:'flex',justifyContent:'space-around',}} 
              // className='show_image'>
              //  {/* {console.log(this.state.file.name.split('.').pop())} */}
              //  {/* {console.log(this.state.file.split('.').pop())}  */}



              // <img className='imgSize' src={this.state.Url} className="slider_div_image"  />
              // <MDBIcon className='cross_icon' onClick={()=>this.setState({file:null})} icon="times-circle" />
        
              


              // </div>
              <div>
              {this.FileType()}

              </div>
              
              ) 
      }
      
      
    }


      toggle_edit = () => {
     
        this.setState({
            media_Module: !this.state.media_Module
        });
       }

    handleMediaItemClick(item){
      this.props.onSelectMediaItem(item, item.type);
      this.setState({media_Module:false})
    }
  
    handleUploadClick = (e) =>{
      this.inputElement.click();
    }

      renderModal(){
        if(this.state.media_Module){
          return(
  
           
         
           <MDBModal isOpen={this.state.media_Module} toggle={this.toggle_edit} size="lg">
             <MDBModalHeader  toggle={this.toggle_edit}><span style={{fontFamily:'Ubuntu-r',fontSize:'18px',color:'#4A4A4A'}}>
              Choose Media File</span> </MDBModalHeader>
             <MDBModalBody  >
               <div style={{width:'100%',display:'flex',flexDirection:'row'}} >

            


                 <div  style={{width:'35%'}}>
               {this.renderMediaItem()}

               <MDBBtn style={{marginTop:'50px',color:'#fff'}} color="cyan" onClick={()=>this.addFile()} >Add Media</MDBBtn>
               

               </div>

               <div style={{width:'70%'}}>
             { this.state.media_files.map((item,index) => {
                    return (
                   
                        <div className="media-item" style={{display:"flex", flexDirection:"row",alignItems:"center",marginBottom: '5px'}} >

<tr key={item.id}> </tr> 
                         <div style={{marginLeft:'65px'}}> 

                        <MDBIcon icon="book"  onClick={()=>this.handleMediaItemClick(item)}/>

                        </div>

                        <div style={{marginLeft:'10px'}}>
                         <a className="text-center text-justify" onClick={()=>this.handleMediaItemClick(item)} style={{textOverflow:"hidden"}}>{item.file}</a>
                         </div>
                         <div style={{marginLeft:'10px'}}>
                         <MDBIcon className='cross_icon'onClick={()=>this.deleteAlert(item)}icon="times-circle" />
                         </div>
                        </div>
                        
                      
                        
                    )
                 })}
                    </div>
                    </div>
               
             </MDBModalBody>
            
           </MDBModal>
       
          )
        }
  
      
  
      }
  
    
  
      renderShowImage(){
        return(
          <MDBModal isOpen={this.state.modal_image} toggle={this.toggleImage} size="xl">
          <MDBModalHeader toggle={this.toggleImage} style={{padding:'1% 2%'}}>All Images</MDBModalHeader>
          <MDBModalBody className='modal_top_padding'>
          {this.renderData()}
        
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn className="admin_btn" onClick={this.toggleImage} style={{height:'4.5vh',width:100}}>Cancel</MDBBtn>
          </MDBModalFooter>
          {this.showUpdateBar()}
        </MDBModal>
        )
    
    }
    trigger(item) {
 window.localStorage.removeItem('selected_media_type')
 window.localStorage.setItem('selected_media_type',JSON.stringify({type:item.type}))
      setTimeout(() => {
        this.setState({
          showCopied: false
        });
      }, 2000);
    }
    showUpdateBar() {
      if (this.state.showCopied) {
       return(
        <ScrollAnimation
        animateOnce={false}
        animateIn="slideInLeft"
        className="slideInLeft toast2"
        animationOut="slideOutLeft"
        isVisible={true}
      >
        <div id="snackbar">Link Copied to Clipboard</div>
      </ScrollAnimation>
       )
      }
    }
    renderImageView(item,index){
      
     if(item.type=='image' || item.type=='Image'){
      return(
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>
                 
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{position:'relative',left:'75px'}}>
 <MDBIcon onClick={()=>this.deleteAlert(item)}className="red-text" icon="times" /> </div>
 <img className="media_image_modal" src={`http://18.221.47.207:3000/${this.state.img_value[index].file}`} alt="" />
 <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
       
        </div> 
      <CopyToClipboard
        onCopy={this.onCopy}
        options={{message: 'Whoa!'}}
        text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
        <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
      </CopyToClipboard>
      </div>
     
      )
     }

     else if(item.type=='pdf' || item.type=='PDF'){
      return(
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>             
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{position:'relative',left:'75px'}}>
 <MDBIcon onClick={()=>this.deleteAlert(item)} className="red-text" icon="times" /> </div>
 <img className="media_image_modal" src={PDF} alt="" />
 <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
        </div> 
      <CopyToClipboard
        onCopy={this.onCopy}
        options={{message: 'Whoa!'}}
        text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
        <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
      </CopyToClipboard>
      </div>
     
      )
     }

     else if(item.type=='ppt' || item.type=='PPT'){
      return(
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>              
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{position:'relative',left:'75px'}}>
 <MDBIcon onClick={()=>this.deleteAlert(item)} className="red-text" icon="times" /> </div>
 <img className="media_image_modal" src={PPT} alt="" />
 <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
        </div> 
      <CopyToClipboard
        onCopy={this.onCopy}
        options={{message: 'Whoa!'}}
        text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
        <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
      </CopyToClipboard>
      </div>
     
      )
     }


     else if(item.type=='pptx' || item.type=='PPTX'){
      return(
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>              
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{position:'relative',left:'75px'}}>
 <MDBIcon onClick={()=>this.deleteAlert(item)} className="red-text" icon="times" /> </div>
 <img className="media_image_modal" src={PPTX} alt="" />
 <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
        </div> 
      <CopyToClipboard
        onCopy={this.onCopy}
        options={{message: 'Whoa!'}}
        text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
        <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
      </CopyToClipboard>
      </div>
     
      )
     }


     else if(item.type=='video' || item.type=='VIDEO'){
      return(
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>              
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{position:'relative',left:'75px'}}>
 <MDBIcon onClick={()=>this.deleteAlert(item)} className="red-text" icon="times" /> </div>
 <img className="media_image_modal" src={Video} alt="" />
 <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
        </div> 
      <CopyToClipboard
        onCopy={this.onCopy}
        options={{message: 'Whoa!'}}
        text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
        <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
      </CopyToClipboard>
      </div>
     
      )
     }

     else if(item.type=='docx' || item.type=='DOCX'||item.type=='doc'|| item.type=='DOC'){
      return(
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>               
        <div style={{display:'flex',alignItems:'center',justifyContent:'center' ,flexDirection:'column'}}>
        <div style={{position:'relative',left:'75px'}}>
 <MDBIcon onClick={()=>this.deleteAlert(item)} className="red-text" icon="times" /> </div>
 <img className="media_image_modal" src={DocX} alt="" />
 <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
        </div> 
      <CopyToClipboard
        onCopy={this.onCopy}
        options={{message: 'Whoa!'}}
        text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
        <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
      </CopyToClipboard>
      </div>
     
      )
     }


     else{
      console.log('type is not an image')
      return(
      
        <div className="" style={{display:'flex',height:'200px',flex:'', flexDirection:'column',width:'200px',alignItems:'center',justifyContent:'space-around',margin:'20px 5px'}}>         
          <div style={{position:'relative',left:'75px'}}>
          <MDBIcon onClick={()=>this.deleteAlert(item)} className="red-text" icon="times" /> </div>
          <p  style={{fontSize:12,marginBottom:0,textAlign:'center'}}>{this.state.img_value[index].file}</p>
               <CopyToClipboard
                 onCopy={this.onCopy}
                 options={{message: 'Whoa!'}}
                 text={`http://18.221.47.207:3000/${this.state.img_value[index].file}`}>
                 <button onClick={()=>this.setState({showCopied:true},()=>this.trigger(item))} style={{height:'20px',lineHeight:1}} ><p style={{fontSize:12,marginBottom:0}}>Copy Link </p></button>
               </CopyToClipboard>
               </div>
      )
     }
    }
    renderChooseFileType(){
      return (
        <div className='media_input_div_modal'>
            <label
            htmlFor="defaultFormRegisterNameEx"
            className="subject-labels"
            >Enter file type : 
          </label>
  
          <Select
            closeMenuOnSelect={true}
            onChange={e=>this.setState({selectedType:e})}
            value={this.state.selectedType}
            className='select-exam select'
            options={[{value:1,label:"PDF"},
                      {value:2,label:"PPT"},
                      {vaue:3, label:"Video"},
                      {value:4,label:"Image"},
                      {value:5,label:"Text"},
                      {value:6,label:"Zip"}]}
            />
        </div>
      );
    }
    renderData(){
        let columns=[];
      
            this.state.img_value.forEach((item,index)=>{
       
                columns.push(
                  this.renderImageView(item,index)
                )
                if ((index+1)%10==0) {columns.push(<div  className="w-40"></div>)}
            })
    
            return (
    
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:0,}} className="row"  >
                {columns}
                </div>
              )
      
      
    }
    toggleAdd = () => {

      this.setState({
        modal_add: !this.state.modal_add
      });
      }
      renderAddImage(){
        return(
          <MDBModal style={{zIndex:100000}} isOpen={this.state.modal_add} toggle={this.toggleAdd}>
          <MDBModalHeader toggle={this.toggleAdd} className='textFontSize' style={{marginLeft:'1%'}}>Add Media</MDBModalHeader>
          <MDBModalBody>
          <div className='media_input_div_modal'>
        <label htmlFor="defaultFormRegisterNameEx" className="textFontSize">
              File: 
        </label>
        <input
            autofocus
              type="file"
              id="defaultFormRegisterNameEx"
              className="thumbnail-file-input d-block"
              onChange={(event)=>this.setState({file:event.target.files[0],Url:(URL.createObjectURL(event.target.files[0]))})}
            />
        </div>
        {this.renderChooseFileType()}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn className="admin_btn" onClick={this.toggleAdd} style={{height:'4.5vh',width:100}}>Cancel</MDBBtn>
            <MDBBtn className="admin_btn" onClick={()=>this.addFile()} style={{height:'4.5vh',width:100}}>Save</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        )
    
    }
    toggleImage = () => {

      this.setState({
        modal_image: !this.state.modal_image
      });
      }
      render(){
        const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;
     if(this.state.loading==false){
  return( 
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
     }
     else{
      return (
        <>
           {/* <MDBBtn color="blue-grey" style={{color:'#fff', textTransform:'capitalize'}} onClick={()=>this.setState({media_Module:true})} >{this.state.buttonName}</MDBBtn> */}
           <MDBNavbar className="menuNavbar" dark expand="md" style={{backgroundColor:'rgb(237, 237, 237)',padding:'2rem 0 3rem 0'}}>
         <button style={{margin:'0px 3px'}} className="button_default2 button_default" onClick={()=>this.toggleAdd()}>
         <span className='textFontSize'> Add Media</span></button>
                    <MDBNavItem onClick={()=> this.toggleImage()} className='page_nav_margin' style={{listStyle:'none'}}>
                        <button style={{margin:'0px 3px'}} className="button_default2 button_default"> Choose Image from Gallery</button>
                       
                      </MDBNavItem>
                   
                  </MDBNavbar>

     {this.renderShowImage()}
     {this.renderAddImage()}
    
        </>
      )
     }
      }
}

export default MediaComponent ;
