import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
import "./LatestUpdate.css" 
import "react-picky/dist/picky.css";
import swal from "sweetalert";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import Fade from "react-reveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CKEditor from 'ckeditor4-react';
import Select from "react-select";
const topicsList = [];
for (var i = 1; i <= 100; i++) {
  topicsList.push({ id: i, name: `Topic ${i}` });
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

class editLatestUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
      id: "",
      isPageUpdated:false,
      Name: "",
      Description: "<p></p>",
      date: new Date(),
      startDate1: new Date(),
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''
    };
    this.onEditorChange = this.onEditorChange.bind( this );

  }

  componentWillMount() {
    this.setState({ loading: true }, () => this.getNewsDetails());
  }
  onEditorChange( e ) {
    console.log(e)
    this.setState( {
      Description: e.editor.getData()
    } );
  }
  getNewsDetails = async () => {
    var LatestUpdates_item = JSON.parse(window.localStorage.getItem("LatestUpdates_item"));
    console.log(LatestUpdates_item, "LatestUpdates_item");

    this.setState({
      id: LatestUpdates_item.id,
      Name: LatestUpdates_item.latest_updates_title,
      Description: LatestUpdates_item.updates_description,
     date:LatestUpdates_item.latest_updates_dates,

     status:LatestUpdates_item.status,
     selectedLanguage:this.state.options.find(item=>item.value==LatestUpdates_item.language_id),
      loading: false,
    });
  };

  componentDidMount() {}

  //Edit FORM

  editLatestUpdate() {
    let language=JSON.parse(localStorage.getItem('language'))

    if (this.state.Name.length == 0) {
      swal("Check News name!", "Please enter valid name", "error");
    } else if (this.state.Description.length == 0) {
      swal("Check News Description field!", "Enter valid tax value", "error");
    } else {
      this.setState({
        loading: true
      });

      let details = {
     
        id:this.state.id,
        latest_updates_title: this.state.Name,
        updates_description: this.state.Description,
        latest_updates_dates:this.state.date,
     
        language_id:this.state.selectedLanguage.value,
        status:this.state.status
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      this.setState({
        response: fetch("http://18.221.47.207:3000/edit_latest_updates", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "max-age=31536000"
          },
          body: formBody
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status == 200) {
              this.setState({
                loading: false,
                isPageUpdated:true
                // add_modal:false
              },()=>setTimeout(()=>this.setState({isPageUpdated:false}),2000))
              
            } else {
              this.setState({
                loading: false
                // add_modal:false
              });
             

              // swal("Warning!", responseJson.message, "warning");
            }
            this.props.history.push('/admin/latest-updates')
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


  commentdate(timestamp){ 
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
    var dt = new Date(timestamp);
    var dd = dt.getDate(); 
    var mm = (dt.getMonth()); 
    console.log(dt.getMonth()+1)
    if (dd < 10) { 
        dd = '0' + dd; 
    } 
    if (mm < 10) { 
        mm = '0' + mm; 
    } 
   return (  dd +"/"+monthNames[Number(dt.getMonth())]+ "/" +(dt.getFullYear()).toString());
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


//HANDLE CHANGE FUNCTIONS

// handleNameChange = text => {

//   this.setState({ Name: text.target.value });
// };

handleDescriptionChange = text => {

  this.setState({ Description: text.target.value });
};

//RENDER FUNCTIONS
renderName=() =>{
  return (
    <div className="col-12 my-2 subject-name-section">
      <label
        htmlFor="defaultFormRegisterNameEx"
        className="subject-name-label subject-labels"
      >
     Name :
      </label>
      <input
        autoFocus
        value={this.state.Name}
        type="text"
        id="defaultFormRegisterNameEx"
        className="form-control subject-name-form custom-form"
        onChange={text => this.setState({Name:text.target.value})}
      />
    </div>
  );
}

renderDescription() {
  return (
    <div className="col-12 my-2 cost-section">
      <label
        htmlFor="defaultFormRegisterNameEx"
        className="cost-label subject-labels"
      >
        Description :
      </label>
      <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } 
          data={this.state.Description}
           style={{width:'60%'}}
              onChange={this.onEditorChange} 
              className="textFontSize"/> 
    </div>
  );
}

renderDate() {
  console.log(this.state.date)
  return (
    <div className="col-6 my-2">
    <label htmlFor="defaultFormRegisterNameEx" className="date-from-label subject-labels mr-3">
         date:
    </label>
    <DatePicker
selected={this.state.startDate1}
    onChange={(date)=>this.setState({date })}
    value={this.commentdate(this.state.date)}
  />
     </div>
  );
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
  console.log(this.props.history);
  return (
    <div id="add-subject-page">
      <AdminNavbar {...this.props} />

      <div className="d-flex">
        <SidebarPage {...this.props} active={13} />

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
              <Fade>
                <div className="row my-3 px-4">
                  <div className="col-12">
                    <button
                      className="admin-button-style"
                      onClick={() =>
                        this.props.history.push("/admin/latest-updates")
                      }
                    >
                      All Latest Updates
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Latest Updates</h3>
                    <button
                      className="admin-button-style"
                      onClick={() => this.editLatestUpdate()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                </div>

                <div className="row px-2 my-2 mx-0">

                {this.renderSelect()}
                  {this.renderName()}

                  {this.renderDescription()}
                  {this.renderDate()}
                </div>
              </Fade>
            </React.Fragment>
          )}
        </div>

        {console.log(this.state)}
      </div>
    </div>
  );
}
}

export default editLatestUpdates;
