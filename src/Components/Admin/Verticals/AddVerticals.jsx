import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import GridLoader from "react-spinners/GridLoader";
import Select from "react-select";
import '../../commonStyles.css'
import Fade from "react-reveal";
import swal from "sweetalert";
import "./AddVerticals.css";
import { MDBIcon } from "mdbreact";
import MediaComponent from "../MediaComponent/chooseMediaFile";
import { css } from '@emotion/core';
import { SketchPicker } from 'react-color';

const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;


export default class AddVerticals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "image",
      status: 1,
      url: "",
      name: "",
    
      background:'',
      type:'',
      info: "",
      selectedType: "",
    
      inputLink: "",
      subtitle:"",
      bannerImage:"",
      verticalUrl:" ",
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
  addVerticals() {

    var type_local= JSON.parse(window.localStorage.getItem('selected_media_type')).type 
    console.log(this.state);
    if (this.state.name.length === 0) return swal("Check Name!", "Please enter name", "error");
    else if (this.state.info.length === 0)  return swal("Check Info!", "Please enter description", "error");
    else if (!this.state.selectedLanguage.value) {
      swal("Select any language", "Please Select any language!", "error");
    } 
    else if (this.state.inputLink.length === 0) return swal("Check the URL!", "Please enter valid Image url", "error");
      else if(this.state.background.length==0) return swal("Warning!", "Please Select any Color", "error");
      else if(this.state.type.length==0) return swal("Warning!", "Please Enter any type", "error");
      let language=JSON.parse(localStorage.getItem('language'))
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("info", this.state.info);
    formData.append("image", this.state.inputLink);
    formData.append("status", this.state.status);
    formData.append("language_id",+language.value)
    formData.append("color",this.state.background);
    formData.append("subtitle",this.state.subtitle);
    formData.append("bannerImage",this.state.bannerImage);
    formData.append("url",this.state.verticalUrl);
    formData.append('language_id',this.state.selectedLanguage.value)
    formData.append('type',this.state.type)
    this.setState({
      response: fetch("http://18.221.47.207:3000/add_dashboard", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "QWERTy");
          swal("Success", "Dashboard succesfullly added", "success");
          this.props.history.push("/admin/vertical");
        })
        .catch(error => {
          swal("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  }


  handlechangeurl = text => this.setState({ inputLink: text.target.value });

  handlechangebannerImageurl = text => this.setState({ bannerImage: text.target.value });
 
 

  renderTitle = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
                  <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      Title:
                  </label>
                  <input    
                    value={this.state.name}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control subject-name-form custom-form"
                    onChange={(text)=>this.setState({name:text.target.value})}
                />
        </div>
    );
  };

  renderSubTitle = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
                  <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      SubTitle:
                  </label>
                  <input    
                    value={this.state.subtitle}
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control subject-name-form custom-form"
                    onChange={(text)=>this.setState({subtitle:text.target.value})}
                />
        </div>
    );
  };





  renderDashboardInfo = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
          Info:
      </label>
      <input
         
         value={this.state.info}
             type="text"
             id="defaultFormRegisterNameEx"
             className="form-control subject-name-form custom-form"
             onChange={(text)=>this.setState({info:text.target.value})
              }
         />
    </div>
    );
  };


 

 

  renderChooseFile = () => {
    return (
      <div className="col-12  d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
      Vertical Home Image:
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


  
  renderBannerImage = () => {
    return (
      <div className="col-12  d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
      Banner Image:
        </label>

    
          <input
            autoFocus
            type="text"
            value={this.state.bannerImage}
            onChange={text => this.handlechangebannerImageurl(text)}
            id="defaultFormRegisterNameEx"
            className="form-control duration-form custom-form "
          />
        
       
      </div>
    );
  };




  
  renderVerticalUrl = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
      Vertical Routes Url:
      </label>
      <input    
         value={this.state.verticalUrl}
        type="text"
        id="defaultFormRegisterNameEx"
        className="form-control subject-name-form custom-form"
        onChange={(text)=>this.setState({verticalUrl:text.target.value})}
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

 
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

renderDashboardType=()=>{
  return (
    <div className="col-12  subject-name-section d-flex">
                <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                    Type:
                </label>
                <input    
                  value={this.state.type}
                  type="text"
                  id="defaultFormRegisterNameEx"
                  className="form-control subject-name-form custom-form"
                  onChange={(text)=>this.setState({type:text.target.value})}
              />
      </div>
  );
}
colorPicker=()=>{
return  (
  <>
  <SketchPicker className='colorPicker'
color={ this.state.background }
onChangeComplete={ this.handleChangeComplete }
/>
<span className="hashColor">{this.state.background}</span>
</>
)
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
                    <button className="admin-button-style admin-button-style-margin" onClick={()=>this.props.history.push('/admin/vertical')}>
                        All Vertical
                    </button>
                    <MediaComponent onSelectMediaItem={this.handleMediaChooseImage} buttonName={<MDBIcon icon="camera" /> } restriction= 'image/*' /> 
                    <button className="admin-button-style ml-auto" onClick={()=>this.addVerticals()}> Save &amp; Publish</button>
                    </div>
                    
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Vertical</h3> 
                    {this.renderSelect()}
                  </div>



                      </div>

                  <div className="d-flex">
                    <div className="subject-content-container ml-4 fit-content">
                      <div className="row px-0 mx-0">
                        {this.renderTitle()}
                        {this.renderSubTitle()}
                        {this.renderDashboardInfo()}
                        {this.renderChooseFile()}
                        {this.renderDashboardType()}
                        {this.renderBannerImage()}
                       
                        {this.renderVerticalUrl()}




                        {this.colorPicker()}
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
