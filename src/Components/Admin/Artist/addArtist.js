import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import "./addArtist.css";

import MediaComponent from "../MediaComponent/chooseMediaFile";
import { MDBIcon, MDBInput } from "mdbreact";
import swal from "sweetalert";
 import axios from 'axios'
import File1 from '../file'

class addArtist extends Component {

  constructor(props) {
    super(props)

    // this.onChangeUserName = this.onChangeUserName.bind(this);
    // this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        artistName: '',
        artistDescription: '',
        selectedFile: null,
        image:null,
    }
}

onFileChange = event => { 
     
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
   
  }; 


onChangeArtistName = (e)=>{
    this.setState({ artistName: e.target.value })
}

onChangeArtistDescription= (e)=>{
    this.setState({ artistDescription: e.target.value })
}

// onSubmit= (e)=>{
//     e.preventDefault()

//     const userObject = {
//         title: this.state.artistName,
//         description: this.state.artistDescription,
//        // image:
//     };

//     console.log(userObject,this.props)
   

//     axios.post('https://nodeapi-455919744.us-east-2.elb.amazonaws.com/posts', userObject)
//         .then((res) => {
//             console.log(res.data)
//         }).catch((error) => {
//             console.log(error)
//         });

//     this.setState({ artistName: '',artistDescription: '' })
// }
// On file upload (click the upload button) 


onFileUpload1 = () => { 
     
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
   
    formData.append( 
        "title", 
        this.state.artistName,
      ); 
      formData.append( 
        "content", 
        this.state.artistDescription,
      ); 
      formData.append( 
        "image", 
        this.state.selectedFile,
      ); 
    // Details of the uploaded file 
    console.log(formData,'xxxx'); 
   
    // Request made to the backend api 
    // Send formData object 
    axios.post("https://nxt-1956111601.us-east-2.elb.amazonaws.com/feed/post", formData); 
  }; 

  
  onFileUpload=async()=>{

    if(this.state.artistName.length===0 ){
      swal("Warning!", "all fields are mandatory", "warning");
    }
   else{
    this.setState({
      loading:true
    })
        let formData = new FormData()

        formData.append('title',this.state.artistName)
        formData.append('content',this.state.artistDescription)
       formData.append('image',this.state.image)
      
        for (let key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
      }
      
       
        this.setState({
        response: fetch('https://nxt-1956111601.us-east-2.elb.amazonaws.com/feed/post', {
        method: 'POST',
        body: formData
        
        
        }).then((response) => response.json())
        .then((responseJson)=>{
          window.location.reload();
        console.log(responseJson)
        
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
  
    } 



// onSubmit= (e)=> {
//     if (this.state.artistName.length == 0) {
//       swal("Check Artist name!", "Please enter valid name", "error");
//     } else if (this.state.artistDescription.length == 0) {
//       swal("Check Artist Description field!", "Enter valid tax value", "error");
//     } else {
//       this.setState({
//         loading: true
//       });

//       let details = {
//         // product_id:this.state.selected_products.product_id,

//         title: this.state.artistName,
//         description: this.state.artistDescription,
       
//       };
//         console.log(details, "add-without photo");
//       let formBody = [];
//       for (let property in details) {
//         let encodedKey = encodeURIComponent(property);
//         let encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//       }
//       formBody = formBody.join("&");

//       this.setState({
//         response: fetch("http://ec2-18-191-166-180.us-east-2.compute.amazonaws.com:5000/posts", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Cache-Control": "max-age=31536000"
//           },
//           body: formBody
//         })
//           .then(response => response.json())
//           .then(responseJson => {
//             if (responseJson.status == 200) {
//               this.setState({
//                 loading: false
//                 // add_modal:false
//               });
//             //   this.props.history.push("/admin/news");
//             } else {
//               this.setState({
//                 loading: false
//                 // add_modal:false
//               });

//               swal("Warning!", responseJson.message, "warning");
//             }
//           })
//           .catch(error => {
//             this.setState({
//               loading: false
//             });
//             swal("Warning!", "Check your network!", "warning");
//             console.log(error);
//           })
//       });
//     }
//   }



 // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              
            </div> 
          ); 
        } 
      };

      renderEditImage(){

        if(this.state.image==null){
          return(<div className="input-group">
         
          <div className="custom-file textFontSize">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
              onChange={(text)=>this.setState({image:(text.target.files[0]),imgUrl:(URL.createObjectURL(text.target.files[0]))})}
            />
            <label className="custom-file-label textFontSize" htmlFor="inputGroupFile01">
            Choose file
            </label>
          </div>
        </div>)
        }
        else{
          return(
            <div  style={{position:"relative",cursor:'pointer',display:'flex',justifyContent:'flex-start',margin:10,width:'100%',alignItems:'center'}}>
          <img src={this.state.imgUrl} style={{margin:'0',width:160,height:120,border:'1px solid #d2d2d2'}} alt='' />
          <MDBIcon className='iconarrow' onClick={()=>this.setState({image:null})} icon="times-circle" />
          </div>
          )
        }
      }





render() {
    return (
        <div className="">

        <AdminNavbar {...this.props} />
        <div className='d-flex'>
        <SidebarPage {...this.props} active={1}/>

       

            <form className="form-div" onSubmit={this.onFileUpload}>
                <div className="form-group">
                    <label>Artist Name</label>
                    <input type="text" value={this.state.artistName} onChange={this.onChangeArtistName} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" value={this.state.artistDescription} onChange={this.onChangeArtistDescription} className="form-control" />
                </div>
               
          {this.renderEditImage()} 



                
                <div className="form-group mt-4">
                    <input type="submit" value="Add Artist" className="btn btn-success btn-block" />
                </div>
            </form>
            </div>
        </div>
    )
}
}

export default addArtist;
