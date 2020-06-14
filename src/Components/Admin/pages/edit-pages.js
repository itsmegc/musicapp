import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
import "../AddSubject/addSubject.css";
import "../Lectures/Addlecture.css";
import Select from "react-select";
import MediaComponent from "../MediaComponent/chooseMediaFile";
import {
  MDBNavbar,
  MDBBtn,
  MDBNavItem,
  MDBNavbarNav,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBInput
} from "mdbreact";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import swal from "sweetalert";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import Fade from "react-reveal";
import CKEditor from "ckeditor4-react";

// const topicsList=[];
// for(var i=1;i<=100;i++){
//     topicsList.push({id:i,name:`Topic ${i}`})
// }

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
      pageId:'',
      pageTitle:'',
    pageDescription:'',
      pageURL:'',
      inputLink:'',
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''

    };
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  


  onEditorChange(e) {
    console.log(e);
    this.setState({
      pageDescription: e.editor.getData()
    });
  }
componentWillMount(){
// this.getpages()
let pages=JSON.parse(localStorage.getItem('pages'))
this.setState({pages:pages,pageTitle:pages.name,pageDescription:pages.description,inputLink:pages.image,pageURL:pages.page_url,pageId:pages.id,

  selectedLanguage:this.state.options.find(item=>item.value==pages.language_id)


})
}

// getpages=async()=>{
//   this.setState({
//     // response: fetch("http://localhost:8000/get_lectures", {
//       response: fetch("http://18.221.47.207:3000/get_pages", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     })
//       .then(response => response.json())
//       .then(responseJson => {
//         console.log(responseJson);
      
//                   this.setState({
//                     pages:responseJson[0],
//                     pageTitle:responseJson[0].page_title,
//                     pageDescription:responseJson[0].page_description,
//                     pageURL:responseJson[0].page_url,
//                     pageId:responseJson[0].id,
               
//                     loading:false
//                     })

//         console.log(this.state);
//       })
//       .catch(error => {
//         alert("Warning!", "Check your network!", "warning");
//         console.log(error);
//         console.log(error);
//       })
//   });
// }
  //ADD FORM

  editPage() {
    if (this.state.pageTitle.length == 0) {
      swal("Check  name!", "Please enter valid name", "error");
    }
     else if (!this.state.pageURL) {
      swal("Check pageURL", "Please enter Page URL!", "error");
    }
    
    else if (!this.state.selectedLanguage.value) {
      swal("Select any language", "Please Select any language!", "error");
    } 
    
    else {
      this.setState({
        loading: true
        // add_modal:false
      });
     

      let formData = new FormData();
      formData.append("name", this.state.pageTitle);
      formData.append("description", this.state.pageDescription);
      formData.append("page_url",this.state.pageURL);

      formData.append('image',this.state.inputLink)
      formData.append('id',this.state.pageId)
      formData.append('language_id',this.state.selectedLanguage.value)
      console.log(formData)
      // console.log(this.state.facultyName,this.state.facultyThumbnail,this.state.profession,this.state.description)
      this.setState({
        response: fetch("http://18.221.47.207:3000/edit_header-content", {
          method: "POST",
          body: formData
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson, "QWERTy");
            swal("Success", "Page succesfullly added", "success").then(
              value => {
                this.props.history.push("/admin/pages");
              }
            );
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
  }


  //RENDER FUNCTIONS
  renderPageURL() {
    return (
      <div className="col-12  subject-name-section d-flex">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
         Page URL:
        </label>
        <input
          value={this.state.pageURL}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({pageURL:text.target.value})}
        />
      </div>
    );
  }

  renderPageNameSection() {
    return (
      <div className="col-12  subtitle-section d-flex">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-subtitle-label subject-labels"
        >
          Page Title:
        </label>
        <input
          value={this.state.pageTitle}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-subtitle-form custom-form"
          onChange={text => this.setState({pageTitle:text.target.value})}
        />
      </div>
    );
  }




  renderPageDescription() {
    return(
        <React.Fragment>
   <div className="col-12 subject-description-container  d-flex align-items-center">
   <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                    Page Description:
      </label>
      <div className="descriptions-container">
      {this.renderFacultyDescriptions()}
      </div>
    </div>
    </React.Fragment>)
  }
  renderFacultyDescriptions(){
    console.log(this.state)
    return ( <React.Fragment>
                <div className="d-flex align-items-start mt-3 mb-3">
             <div className="position-relative w-100 ml-3 mr-4">
             <CKEditor
      data={this.state.pageDescription}
       style={{width:'88%'}}
          onChange={this.onEditorChange} 
          className="textFontSize"/> 
              </div>
              </div>
              <div className="w-100" />
              </React.Fragment>
          )
  
}
renderChooseFile = () => {
  return (
    <div className="col-12  d-flex">
      <label
        htmlFor="defaultFormRegisterNameEx"
        className="course-duration-label subject-labels"
        style={{ borderRight: "none" }}
      >
        Enter file link:
      </label>

      <div
        className="flex-column "
        style={{
          width: "39.4%",
          borderLeft: "1px solid #bfbfbf",
          height: "100%"
        }}
      >
        <input
          style={{ marginTop: "10px", width: "100%"}}
          type="text"
          placeholder="Choose File From Gallery"
          value={this.state.inputLink}
          onChange={text => this.setState({inputLink:text.target.value})}
          id="download_link"
          className="form-control duration-form custom-form link-placeholder "
        />
    
    <div   style={{ marginLeft:'5%' }}>
  
                  </div>
      </div>

    </div>
  );
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
    return (
      <div id="add-subject-page">
        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} active={1} />

          <div className="add-subject-column">
            {this.state.loading ? (
              <div className="sweet-loading">
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={5}
                  color={"#2fb2eb"}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <React.Fragment>
                <div className="row my-3 px-4">
                  <div
                    className="col-12 top_button_bar d-flex"
                    style={{ alignItems: "center" }}
                  >
                    <button
                      className="admin-button-style admin-button-style-margin"
                      onClick={() => this.props.history.push("/admin/pages")}
                    >
                      All Pages
                    </button>
                    <MediaComponent
                      onSelectMediaItem={this.handleMediaChooseImage}
                      buttonName={<MDBIcon icon="camera" />}
                      restriction="image/*"
                    />
                    <button
                      className="admin-button-style ml-auto"
                      onClick={() => this.editPage()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Edit Page</h3>
                    {this.renderSelect()}
                  </div>
                </div>
                <div className="d-flex">
                  <div
                    className="subject-content-container ml-4"
                    style={{ width: "80%" }}
                  >
                    <div className="row px-0 mx-0 ">
                      {this.renderPageNameSection()}
                      {this.renderPageDescription()}
                      {this.renderPageURL()}
                      {this.renderChooseFile()}
                      
                    </div>
                 
                  </div>
                </div>

               
    <hr />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EditPage;
