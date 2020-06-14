import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
import "./news.css" 
import "react-picky/dist/picky.css";
import swal from "sweetalert";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import Fade from "react-reveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

class editNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
      news_id: "",
      isPageUpdated:false,
      newsName: "",
      newsDescription: "",
      startDate1: new Date(),
    };
  }

  componentWillMount() {
    this.setState({ loading: true }, () => this.getNewsDetails());
  }

  getNewsDetails = async () => {
    var news_item = JSON.parse(window.localStorage.getItem("news_item"));
    console.log(news_item, "news123");

    this.setState({
      news_id: news_item.news_id,
      newsName: news_item.news_title,
      newsDescription: news_item.news_description,
     examDate:news_item.exam_date,

      loading: false
    });
  };

  componentDidMount() {}

  //Edit FORM

  editNews() {
    if (this.state.newsName.length == 0) {
      swal("Check Tax name!", "Please enter valid name", "error");
    } else if (this.state.newsDescription.length == 0) {
      swal("Check tax value field!", "Enter valid tax value", "error");
    } else {
      this.setState({
        // loading: true
      });

      let details = {
        // product_id:this.state.selected_products.product_id,
        news_id: this.state.news_id,
        news_title: this.state.newsName,
        news_description: this.state.newsDescription,
        exam_date:this.state.examDate
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      this.setState({
        response: fetch("http://18.221.47.207:3000/edit_news", {
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

              swal("Warning!", responseJson.message, "warning");
            }
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

  handleNameChange = text => {
    console.log("News Name:", text.target.value);
    this.setState({ newsName: text.target.value });
  };

  handleDescriptionChange = text => {
    console.log("Tax value", text.target.value);
    this.setState({ newsDescription: text.target.value });
  };



  renderNameChange() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          News Name :
        </label>
        <input
          autoFocus
          value={this.state.newsName}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.handleNameChange(text)}
        />
      </div>
    );
  }

  renderDescriptionSection() {
    return (
      <div className="col-12 my-2 cost-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          News Description :
        </label>
        <input
          autoFocus
          value={this.state.newsDescription}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control cost-form custom-form"
          onChange={cost => this.handleDescriptionChange(cost)}
        />
      </div>
    );
  }

  renderNewsDate() {
    return (
      <div className="col-6 my-2">
      <label htmlFor="defaultFormRegisterNameEx" className="date-from-label subject-labels mr-3">
           Exam date:
      </label>
      <DatePicker

selected={this.state.startDate1}
onChange={(date)=>this.setState({examDate:date })}
value={this.commentdate(this.state.examDate)}
    />
       </div>
    );
  }


  render() {
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
                  color={"#c01825"}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <React.Fragment>
                <Fade>
                  <div className="row my-3 px-4">
                    <div className="col-12">
                    <div className={this.state.isPageUpdated?'d-flex justify-content-center pageUpdate':'d-none'} >
                      Page has been updated !
                    </div>
                    

                      <button
                        className="admin-button-style"
                        onClick={() =>
                          this.props.history.push("/admin/news")
                        }
                      >
                        All News
                      </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                      <h3> Edit News</h3>
                      <button
                        className="admin-button-style"
                        onClick={() => this.editNews()}
                      >
                        {" "}
                        Save &amp; Publish
                      </button>
                    </div>
                  </div>

                  <div className="row px-2 my-2 mx-0">
                    {this.renderNameChange()}

                    {this.renderDescriptionSection()}

                    {this.renderNewsDate()}

                  
                  </div>
                </Fade>
              </React.Fragment>
            )}
          </div>

        </div>
      </div>
    );
  }
}

export default editNews;
