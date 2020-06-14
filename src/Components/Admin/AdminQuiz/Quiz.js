import React, { Component } from "react";
import SidebarPage from "../Sidebar/sidebarPage";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBTable,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBContainer,
  MDBInput
} from "mdbreact";
import { css } from "@emotion/core";
//import {MDBInput,MDBTable,MDBTableBody,MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter  } from "mdbreact";
import AdminNavbar from "../Navbar/adminNavbar";
import "../UserDetail/userDetail.css";
import swal from "sweetalert";
import GridLoader from "react-spinners/GridLoader";
import ActivePNG from "../../../Assets/images/activestatus.png";
import InactivePNG from "../../../Assets/images/inactivestatus.png";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;



class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      quizzes: [],
      showAction: false,
      draft_count: 0,
      published_count: 0,
      trash_count: 0,
      all_selected: true,
      draft_selected: false,
      published_selected: false,
      trash_selected: false,
      selected_data: [],

    };
  }
  componentWillMount() {
    this.setState({ loading: true }, () => this.getQuizzes());
  }


  componentWillUnmount(){

  }

  componentDidMount() {
 
  }



  handleChangeAddName = e => {
    this.setState({ name: e.target.value });
  };


  getQuizzes = async () => {
    this.setState({
      loading: true
    });
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_quizzes", {
        method: "GET"
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          var draft_count = 0,
            published_count = 0,
            trash_count = 0;
          for (var v = 0; v < responseJson.length; v++) {
            responseJson[v].selected = 0;
            if (responseJson[v].status == 0) {
              draft_count = draft_count + 1;
            } else if (responseJson[v].status == 1) {
              published_count = published_count + 1;
            } else if (responseJson[v].status == 2) {
              trash_count = trash_count + 1;
            }
          }
          this.setState({
            quizzes: responseJson,
            draft_count: draft_count,
            published_count: published_count,
            trash_count: trash_count,
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            loading: false
          });
          swal("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };

  commentdate(timestamp) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Novr",
      "Dec"
    ];
    var dt = new Date(timestamp);
    var dd = dt.getDate();
    var mm = dt.getMonth() + 1;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return dd + "/" + mm + "/" + dt.getFullYear().toString();
  }

  commenttime(timestamp) {
    var convertdLocalTime = new Date(timestamp);
    var hours = convertdLocalTime.getHours();
    var minutes = convertdLocalTime.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }



  handleEditQuiz(item) {
    window.localStorage.setItem("quiz_item", JSON.stringify(item));
    this.props.history.push("/admin/edit-quiz");
  }

  handleAddNewQuiz() {
    this.props.history.push("/admin/add-quiz");
  }

  renderActions(item, index) {
    if (item.selected == 1) {
      if (this.state.trash_selected) {
        return (
          <div style={{ width: "15%" }} className="actions_div">
            {" "}
            <span
              onClick={() => this.restoreAlert(item)}
              className="actionstext"
            >
              Restore
            </span>
            |{" "}
            <span
              onClick={() => this.deleteAlert(item)}
              className="actionstext"
              style={{ color: "#a00" }}
            >
              Delete
            </span>
          </div>
        );
      } else {
        return (
          <div className="actions_div">
            <span
              onClick={() => this.handleEditQuiz(item, index)}
              className="actionstext"
            >
              Edit
            </span>{" "}
           <span className="opacity-0"> |</span>
            <span
              onClick={() => this.trashAlert(item)}
              className="actionstext d-none"
              style={{ color: "#a00" }}
            >
              Trash
            </span>{" "}
          </div>
        );
      }
    } else {
      return (
        <div className="actions_div" style={{ visibility: "hidden" }}>
          <span className="actionstext">Edit</span> |{" "}
          <span className="actionstext" style={{ color: "#a00" }}>
            Trash
          </span>{" "}
        </div>
      );
    }
  }
  showactionbutton(item, index) {
    let { quizzes } = this.state;
    let selected_page = quizzes[index];
    for (var v = 0; v < quizzes.length; v++) {
      quizzes[v].selected = 0;
    }
    selected_page.selected = 1;
    this.setState({
      quizzes
    });
  }
  hideactionbutton() {
    let { quizzes } = this.state;

    for (var v = 0; v < quizzes.length; v++) {
      quizzes[v].selected = 0;
    }

    this.setState({
      quizzes
    });
  }
  renderStatus(item) {
    if (item.status == 0) {
      return "Last Modified";
    } else {
      return "Published";
    }
  }
  trashAlert = item => {
    console.log(item, "xxx");
    swal({
      title: "Are you sure?",
      text: "You want to move this page to trash",
      buttons: true,
      dangerMode: true
    }).then(willAdd => {
      if (willAdd) {
        this.trashPage(item);
      } else return;
    });
  };
  deleteAlert = item => {
    console.log(item, "xxx");
    swal({
      title: "Are you sure?",
      text: "You want to delete this page",
      buttons: true,
      dangerMode: true
    }).then(willAdd => {
      if (willAdd) {
        this.deletePage(item);
      } else return;
    });
  };
  restoreAlert = item => {
    console.log(item, "xxx");
    swal({
      title: "Are you sure?",
      text: "You want to restore this page",
      buttons: true,
      dangerMode: true
    }).then(willAdd => {
      if (willAdd) {
        this.restorePage(item);
      } else return;
    });
  };
  trashPage(item) {
    this.setState({
      loading: true
    });
    let details = {
      id: item.subject_id
    };
    console.log(details, "details");
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.183.249:3000/trash_content", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=31536000"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          window.location.reload();
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

  changeStatus(item, status) {
    this.setState({
      loading: true
    });
    let details = {
      quiz_id: item.quiz_id,
      status: status
    };
    console.log(details, "details");
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/edit_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=31536000"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          window.location.reload();
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
  restorePage(item) {
    // this.setState({
    //     loading:true
    //   })
    //    let details = {
    //    id:item.id,
    //  };
    //  console.log(details,'details')
    //  let formBody = [];
    //  for (let property in details) {
    //   let encodedKey = encodeURIComponent(property);
    //   let encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    //  }
    //  formBody = formBody.join("&");
    //  this.setState({
    //   response: fetch('http://18.221.183.249:3000/restore_content', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Cache-Control': 'max-age=31536000'
    //   },
    //  body:formBody
    //   }).then((response) => response.json())
    //   .then((responseJson)=>{
    //        window.location.reload()
    //   }
    //   )
    //     .catch((error) => {
    //    this.setState({
    //      loading:false
    //    })
    //    swal("Warning!", "Check your network!", "warning");
    //  console.log(error)
    //      })
    //     })
  }

  renderActiveStatus(item) {
    if (item.status == 1) {
      return (
        <img
          src={ActivePNG}
          alt="Course is active"
          className="course-status-icon"
          onClick={() => this.changeStatus(item, 0)}
        />
      );
    } else {
      return (
        <img
          src={InactivePNG}
          alt="Course is INactive"
          className="course-status-icon"
          onClick={() => this.changeStatus(item, 1)}
        />
      );
    }
  }

  renderTableData(item, index) {
    if (this.state.all_selected == true) {
      if (item.status != 2) {
        console.log(this.state.all_selected, item.status);
        return (
          <tr key={item.topic_id}>
            <td>
              <input
                onChange={() => this.onToggle(index)}
                checked={item.checked == 1 ? true : false}
                type="checkbox"
              />
            </td>
            <td style={{ width: "25%" }} className="tdName textFontSize">
              <div
                onMouseEnter={() => this.showactionbutton(item, index)}
                onMouseLeave={() => this.hideactionbutton()}
                className="name_div_table"
              >
                <span
                  style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}
                >
                  {item.quiz_name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td>
            <td>{this.renderActiveStatus(item)}</td>
          </tr>
        );
      }
    } else if (this.state.published_selected == true) {
      if (item.status == 1) {
        return (
          <tr key={item.subject_id}>
            <td>
              <input className="checkbox_content" type="checkbox" />
            </td>
            <td style={{ width: "25%" }} className="tdName textFontSize">
              <div
                onMouseEnter={() => this.showactionbutton(item, index)}
                onMouseLeave={() => this.hideactionbutton()}
                className="name_div_table"
              >
                <span
                  style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}
                >
                  {item.subject_name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td>
            <td>{this.renderActiveStatus(item)}</td>
          </tr>
        );
      }
    } else if (this.state.draft_selected == true) {
      if (item.status == 0) {
        return (
          <tr key={item.subject_id}>
            <td>
              <input className="checkbox_content" type="checkbox" />
            </td>
            <td style={{ width: "25%" }} className="tdName textFontSize">
              <div
                onMouseEnter={() => this.showactionbutton(item, index)}
                onMouseLeave={() => this.hideactionbutton()}
                className="name_div_table"
              >
                <span
                  style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}
                >
                  {item.subject_name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td>
            <td>{this.renderActiveStatus(item)}</td>
          </tr>
        );
      }
    } else if (this.state.trash_selected == true) {
      if (item.status == 2) {
        return (
          <tr key={item.subject_id}>
            <td>
              <input className="checkbox_content" type="checkbox" />
            </td>
            <td style={{ width: "25%" }} className="tdName textFontSize">
              <div
                onMouseEnter={() => this.showactionbutton(item, index)}
                onMouseLeave={() => this.hideactionbutton()}
                className="name_div_table"
              >
                <span
                  style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}
                >
                  {item.subject_name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td>{" "}
          </tr>
        );
      }
    }
  }

  onToggle(index, e) {
    console.log(index, "kjkk");
    let { quizzes, selected_data } = this.state;
    let selected_item = quizzes[index];
    if (selected_item.checked == 1) {
      selected_item.checked = 0;
      selected_data.splice(index, 1);
    } else {
      selected_item.checked = 1;
      selected_data.push(selected_item);
    }

    this.setState({ selected_data });
    this.setState({ quizzes });
  }

  handleAllChecked = event => {
    let { quizzes } = this.state;
    if (this.state.item_selected) {
      for (var v = 0; v < quizzes.length; v++) {
        quizzes[v].checked = 1;
      }
      this.setState({ selected_data: quizzes });
    } else {
      for (var v = 0; v < quizzes.length; v++) {
        quizzes[v].checked = 0;
      }
      this.setState({ selected_data: [] });
    }
    this.setState({ quizzes });
  };

  render() {
 
      return (
        <div id="subject-page-list">
          <AdminNavbar {...this.props} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <SidebarPage {...this.props} active={10}/>

            <div
              className="colDefault"
              style={{ width: "100%", backgroundColor: "#F9F9F9" }}
            >
               {this.state.loading?
                     (
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
                    :
                    (
             <React.Fragment>
              <div className="page_heading">
                <h3 style={{ marginBottom: 0 }}>Quiz </h3>
                <span
                  onClick={() => this.handleAddNewQuiz()}
                  className="add_new_button"
                >
                  Add New
                </span>
              </div>
              <div>
                <ul className="subsubsub">
                  <li className="all">
                    <span
                      onClick={() =>
                        this.setState({
                          all_selected: true,
                          published_selected: false,
                          trash_selected: false,
                          draft_selected: false
                        })
                      }
                      className={
                        this.state.all_selected
                          ? "text_Pub current"
                          : "text_Pub"
                      }
                      aria-current="page"
                    >
                      All <span className="count">({this.state.quizzes.length})</span>
                    </span>{" "}
                    |
                  </li>

                  <li className="publish">
                    <span
                      onClick={() =>
                        this.setState({
                          all_selected: false,
                          published_selected: true,
                          trash_selected: false,
                          draft_selected: false
                        })
                      }
                      className={
                        this.state.published_selected
                          ? "text_Pub current"
                          : "text_Pub"
                      }
                    >
                      Published <span className="count">({this.state.quizzes.filter(item=>item.status==1).length})</span>
                    </span>{" "}
                    |
                  </li>

                  <li className="draft">
                    <span
                      onClick={() =>
                        this.setState({
                          all_selected: false,
                          published_selected: false,
                          trash_selected: false,
                          draft_selected: true
                        })
                      }
                      className={
                        this.state.draft_selected
                          ? "text_Pub current"
                          : "text_Pub"
                      }
                    >
                      Drafts <span className="count">({this.state.quizzes.filter(item=>item.status==0).length})</span>
                    </span>{" "}
                    |
                  </li>

                  <li className="draft d-none">
                    <span
                      onClick={() =>
                        this.setState({
                          all_selected: false,
                          published_selected: false,
                          trash_selected: true,
                          draft_selected: false
                        })
                      }
                      style={{
                        color: this.state.trash_selected ? "#000" : "#a00"
                      }}
                      className={
                        this.state.trash_selected
                          ? "text_Pub current"
                          : "text_Pub"
                      }
                    >
                      Trash <span className="count">()</span>
                    </span>
                  </li>
                </ul>
                <div className="tablenav">
                  <div className="alignleft actions bulkactions">
                    <select name="action" id="bulk-action-selector-top">
                      <option value="-1">Bulk Actions</option>

                      <option value="trash">Move to Trash</option>
                    </select>
                    <span
                      onClick={() => console.log(this.state.selected_data)}
                      className="apply"
                    >
                      Apply
                    </span>
                  </div>
                </div>
                <MDBTable
                  striped
                  className="pages_table"
                  style={{ backgroundColor: "#F9F9F9" }}
                >
                  <tr style={{ backgroundColor: "white" }}>
                    <th>
                      <input
                        type="checkbox"
                        onClick={event =>
                          this.setState(
                            { item_selected: !this.state.item_selected },
                            () => this.handleAllChecked(event)
                          )
                        }
                        checked={this.state.item_selected}
                        value="checkedall"
                      />
                    </th>
                    <th className="">Title</th>
                    <th className="textFontSize">Date</th>
                    <th>Status</th>
                  </tr>

                  <MDBTableBody>
                    {this.state.quizzes.map((item, index) => {
                      return this.renderTableData(item, index);
                    })}
                  </MDBTableBody>
                </MDBTable>
              </div>
            
            </React.Fragment>
                   )
                }
          </div>
        </div>
        </div>
      );
    }
  
}

export default Quiz;
