import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import Fade from "react-reveal";
import "./Addlecture.css";
import MediaComponent from "../MediaComponent/chooseMediaFile";
import swal from "sweetalert";
import Select from "react-select";
import GridLoader from "react-spinners/GridLoader";

import {MDBIcon} from 'mdbreact'

import { css } from '@emotion/core';


const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;


export default class Editlecture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: Number,
      value: "image",
      status: 1,
      url: "",
      type:'',

      lecturename: "",
      description: "",
      totallectures: "",
      duration: "",
      selectedoption: "",
      verticals: [],
      selectedVerticals: "",
      inputLink: "",
      selectedType:null,
      fileTypes:[{value:1,label:"PDF"},
      {value:2,label:"PPT"},
      {vaue:3, label:"Video"},
      {value:4,label:"Image"},
      {value:5,label:"Text"}]
,
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''


    };
  }
  componentWillMount() {
    this.setState({loading:true})
    this.getlecturedetails();
  }


  getlecturedetails = async () => {
    var lecture_item = JSON.parse(window.localStorage.getItem("lecture_item"));
    console.log(lecture_item);
    this.setState({
      id: lecture_item.id,
      lecturename: lecture_item.lecture_name,
      description: lecture_item.lecture_description,
      duration: lecture_item.duration,
      url:lecture_item.link,
      type:lecture_item.type,
      inputLink: lecture_item.link,
      value: lecture_item.type,
      selectedType:this.state.fileTypes.find(item=>item.label.toLowerCase() === lecture_item.type.toLowerCase()),
      loading:false,
      selectedLanguage:this.state.options.find(item=>item.value==lecture_item.language_id)
    });
  };
  componentDidMount() {}



  renderlecturename = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
             <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                  Name:
             </label>
             <input
                
                value={this.state.lecturename}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control subject-name-form custom-form"
                    onChange={(text)=>this.setState({lecturename:text.target.value})}
                />
        </div>
    );
  };



  renderdescription = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
           Description:
      </label>
      <input
         
         value={this.state.description}
             type="text"
             id="defaultFormRegisterNameEx"
             className="form-control subject-name-form custom-form"
             onChange={(text)=>this.setState({description:text.target.value})
             }
         />
    </div>
    );
  };

  
  renderduration = () => {
    return(
      <div className="col-12  d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
           Duration (in minutes):-
      </label>
      <input
         
         value={this.state.duration}
             type="text"
             id="defaultFormRegisterNameEx"
             className="form-control duration-form custom-form"
             onChange={(duration)=>this.setState({duration:duration.target.value})}
         />
       </div>
)
  };




  renderChooseFile = () => {
    return (
      <div className="col-12  d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
          Enter file link:
        </label>

    
          <input
            autoFocus
            type="text"
            value={this.state.inputLink}
            onChange={text => this.setState({inputLink:text.target.value})}
            id="defaultFormRegisterNameEx"
            className="form-control duration-form custom-form "
          />
        
       
      </div>
    );
  };



  handlechangeurl = text => this.setState({ url: text.target.value });
  handleMediaChange = item => {
    console.log(item, "handleMediaChange");
    this.setState({ inputLink: `http://18.221.47.207:3000/${item.file}`, type: item.type});
  };

  editlectures() {
 
    if (this.state.lecturename.length === 0)
      return swal("Check Lecture name!", "Please enter name", "error");
    else if (this.state.description.length === 0)
      return swal("Check Description!", "Please enter description", "error");
    else if (isNaN(this.state.duration) || this.state.duration.length === 0)
      return swal("Check Duration!", "Please enter correct duration", "error");
    else if (this.state.inputLink.length === 0)
      return swal("Check the URL!", "Please enter valid url", "error");
      
    else if (!this.state.selectedLanguage.value) {
      swal("Select any language", "Please Select any language!", "error");
    } 
    else {
      let details = {
        // product_id:this.state.selected_products.product_id,
        id: this.state.id,
        lecture_name: this.state.lecturename,
        lecture_description: this.state.description,
        duration: this.state.duration,
        link: this.state.inputLink,

        type:this.state.type,
        language_id:this.state.selectedLanguage.value
      };
      console.log(details);

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log('formbosy',formBody)
      this.setState({
        response: fetch("http://18.221.47.207:3000/edit_lecture", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "max-age=31536000"
          },
          body: formBody
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson, "123");
            if (responseJson.status == 200) {
              swal("Success", "Lecture edited", "success")
              this.props.history.push("/admin/lecture");
            } else {
              swal("Warning!", responseJson.message, "warning");
            }
          })
          .catch(error => {
            swal("Warning!", "Check your network!", "warning");
            console.log(error);
          })
      });
    }
    
  }

  
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
                onChange={e => this.setState({ selectedLanguage: e },)}
                value={this.state.selectedLanguage}
                className="language-select "
                options={this.state.options}
              />
      {/* {console.log(y)} */}
    </div>
  );
}




  render() {
    console.log(this.state, "state");
    return (
      <div id="add-subject-page">
        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} active={11} />

          <div className="add-subject-column">
            {this.state.loading ? (
              <div className="sweet-loading">
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={5}
                  color={"#c01825"}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <React.Fragment>
                
                      <div className="row my-3 px-4">
                      <div className="col-12 top_button_bar d-flex align-items-center">
                    <button className="admin-button-style admin-button-style-margin" onClick={()=>this.props.history.push('/admin/lecture')}>
                        All Lectures
                    </button>
                    <MediaComponent onSelectMediaItem={this.handleMediaChooseImage} buttonName={<MDBIcon icon="camera" /> } restriction= 'image/*' /> 
                    <button className="admin-button-style ml-auto" onClick={()=>this.editlectures()}> Save &amp; Publish</button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-start align-items-center">
                    <h3> Edit Lecture</h3> 
                    {this.renderSelect()}
                    </div>
                      </div>

                  <div className="d-flex">
                    <div className="subject-content-container ml-4 fit-content">
                      <div className="row px-0 mx-0">
                        {this.renderlecturename()}
                        {this.renderdescription()}
                        {this.renderduration()}
                        {this.renderChooseFile()}
                      </div>
                    </div>
                    <div className="subject-select-fields-container ml-2 row align-self-start flex-column mr-4 h-100">
                      {/* {this.renderChooseFileType()} */}
                 
                    </div>
                  </div>

                   {/* <button className='add-subject my-5 float-right mr-4' onClick={()=>this.editlectures()}>Save &amp; Publish</button>  */}
              
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
