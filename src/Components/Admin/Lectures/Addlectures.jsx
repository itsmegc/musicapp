import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import GridLoader from "react-spinners/GridLoader";
import Select from "react-select";
import Fade from "react-reveal";
import swal from "sweetalert";
import "./Addlecture.css";
import { MDBIcon } from "mdbreact";
import MediaComponent from "../MediaComponent/chooseMediaFile";
import { css } from '@emotion/core';


const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;


export default class AddLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "image",
      status: 1,
      url: "",
      lecturename: "",
      description: "",
      totallectures: "",
      duration: "",
      selectedType: "",
      verticals: [],
      selectedVerticals: "",
      inputLink: "",
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''


    };
  }
  componentDidMount() {
    console.log(this.state.value);
  }
  componentWillMount() {
    // this.getVerticals();
  }

  handlechangeurl = text => this.setState({ inputLink: text.target.value });
 

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
            onChange={text => this.handlechangeurl(text)}
            id="defaultFormRegisterNameEx"
            className="form-control duration-form custom-form "
          />
        
       
      </div>
    );
  };

  renderChooseFileType() {
    return (
      <div className="col-12 exam-section h-25 min-height-unset">
        <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels pl-0">
          Choose file type :
        </label>

        <Select
          closeMenuOnSelect={true}
          onChange={e => this.setState({ selectedType: e })}
          value={this.state.selectedType}
          className="select-exam select"
          options={[
            { value: 1, label: "PDF" },
            { value: 2, label: "PPT" },
            { vaue: 3, label: "Video" },
            { value: 4, label: "Image" },
            { value: 5, label: "Text" }
          ]}
         




        />
      </div>
    );
  }

  addlectures() {
    let language=JSON.parse(localStorage.getItem('language'))
    var type_local= JSON.parse(window.localStorage.getItem('selected_media_type')).type 
    console.log(this.state);
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

      let includeSample
      if(this.state.ischecked==true) includeSample=1
      else includeSample=0 
      console.log(this.state.inputLink)
      let finaInputLink
      if(this.state.inputLink.includes('.zip')==true){
      let inputLink=this.state.inputLink.substring(0,this.state.inputLink.lastIndexOf('.'))
      // console.log(finaInputLink+`index.html`)
      finaInputLink=inputLink+`/index.html`
      }
      else{
        finaInputLink=this.state.inputLink
      }
      
    let formData = new FormData();
    formData.append("lecture_name", this.state.lecturename);
    formData.append("lecture_description", this.state.description);
    formData.append("duration", Number(this.state.duration));
    formData.append("type", type_local);
    formData.append("link",  finaInputLink);
    formData.append("status", this.state.status);
    // formData.append('language_id',+language.value)
    formData.append('language_id',this.state.selectedLanguage.value)
    this.setState({
      response: fetch("http://18.221.47.207:3000/post_lecture", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "QWERTy");
          swal("Success", "Lecture succesfullly added", "success");
          this.props.history.push("/admin/lecture");
        })
        .catch(error => {
          swal("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  }

  //PART OF MEDIA COMPONENT
  handleMediaChange = item => {
    console.log(item, "handleMediaChange");
    this.setState({ inputLink: `http://18.221.47.207:3000/${item.file}` });
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
                    <button className="admin-button-style ml-auto" onClick={()=>this.addlectures()}> Save &amp; Publish</button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-start align-items-center">
                    <h3> Add Lecture</h3> 
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

                   {/* <button className='add-subject my-5 float-right mr-4' onClick={()=>this.addlectures()}>Save &amp; Publish</button>  */}
              
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
