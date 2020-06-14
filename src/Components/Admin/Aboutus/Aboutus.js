import React, { Component } from "react";
import "../SubjectPage/subjectPage.css";
import SidebarPage from "../Sidebar/sidebarPage";
import AdminNavbar from "../Navbar/adminNavbar";
import swal from "sweetalert";

import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { HalfCircleSpinner } from "react-epic-spinners";
import ActivePNG from "../../../Assets/images/activestatus.png";
import InactivePNG from "../../../Assets/images/inactivestatus.png";
import "../../commonStyles.css";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import Select from "react-select";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;

class Aboutus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      subjects: [],
      showAction: false,
      draft_count: 0,
      published_count: 0,
      trash_count: 0,
      all_selected: true,
      draft_selected: false,
      published_selected: false,
      trash_selected: false,
      selected_data: [],
      options: [
        {value:"-1", label:"All"},
        { value: "1", label: "English" },
        { value: "0", label: "Hindi" }

      ],
      selectedLanguage:[ {value:"-1", label:"All"}]
    };
  }
  componentWillMount() {
    this.setState({ loading: true }, () => this.getAboutus());
  }

  componentDidMount() {}

  handleChangeAddName = e => {
    this.setState({ name: e.target.value });
  };
  handleChangeAddLink = e => {
    this.setState({ website_link: e.target.value });
  };

  handleChangeAddLogo = e => {
    this.setState({ logo: e.target.files[0] });
  };

  getAboutus = async () => {
    this.setState({
      loading: true
    });
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_aboutus", {
        method: "GET"
      })
        .then(response => response.json())
        .then(responseJson => {
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
            subjects: responseJson,
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

  handleEditSubject(item) {
    window.localStorage.setItem("about_us", JSON.stringify(item));
    // window.localStorage.setItem(
    //   "subject_list",
    //   JSON.stringify(this.state.subjects)
    // );
    this.props.history.push("/admin/edit-aboutus");
  }

  // handleAddNewSubject() {
  //   window.localStorage.setItem(
  //     "subject_list",
  //     JSON.stringify(this.state.subjects)
  //   );
  //   this.props.history.push("/admin/add-subject");
  // }

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
              onClick={() => this.handleEditSubject(item, index)}
              className="actionstext"
            >
              Edit
            </span>
            <span className="opacity-0">|</span>
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
          <span className="actionstext d-none">Edit</span> |{" "}
          {/* <span className="actionstext" style={{ color: "#a00" }}>
            Trash
          </span>{" "} */}
        </div>
      );
    }
  }

  showactionbutton(item, index) {
    let { subjects } = this.state;
    let selected_page = subjects[index];
    for (var v = 0; v < subjects.length; v++) {
      subjects[v].selected = 0;
    }
    selected_page.selected = 1;
    this.setState({
      subjects
    });
  }
  hideactionbutton() {
    let { subjects } = this.state;

    for (var v = 0; v < subjects.length; v++) {
      subjects[v].selected = 0;
    }

    this.setState({
      subjects
    });
  }
  // renderStatus(item) {
  //   if (item.status == 0) {
  //     return "Last Modified";
  //   } else {
  //     return "Published";
  //   }
  // }
  trashAlert = item => {
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
      subject_id: item.subject_id,
      status: status
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/subject_status", {
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

    if (item.language_id !=this.state.selectedLanguage.value)
    {
    if (this.state.all_selected == true) {
      if (item.status != 2) {
        return (
          <tr key={item.subject_id}>
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
                <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                  {item.banner_title}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            {/* <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td> */}
            {/* <td>{this.renderActiveStatus(item)}</td> */}
            <td><span className="tabledate">
            {item.language_id==0?<span>English</span>:<span>Hindi</span>}
              </span></td>
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
                <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                  {item.banner_title}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td><span className="tabledate">
            {item.language_id==0?<span>English</span>:<span>Hindi</span>}
              </span></td>
            {/* <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td> */}
            {/* <td>{this.renderActiveStatus(item)}</td> */}
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
                <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                  {item.banner_title}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td><span className="tabledate">
            {item.language_id==0?<span>English</span>:<span>Hindi</span>}
              </span></td>
            {/* <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td> */}
            {/* <td>{this.renderActiveStatus(item)}</td> */}
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
                <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                  {item.banner_title}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td><span className="tabledate">
                {item.language_id==0?<span>English</span>:<span>Hindi</span>}
              </span></td>
            {/* <td className="datefontsize">
              {this.renderStatus(item)} <br />{" "}
              <span className="tabledate">
                {this.commentdate(item.creation_time)}
              </span>
            </td>{" "} */}
          </tr>
        );
      }
    }
  }
  }

  onToggle(index, e) {
    let { subjects, selected_data } = this.state;
    let selected_item = subjects[index];
    if (selected_item.checked == 1) {
      selected_item.checked = 0;
      selected_data.splice(index, 1);
    } else {
      selected_item.checked = 1;
      selected_data.push(selected_item);
    }

    this.setState({ selected_data });
    this.setState({ subjects });
  }

  handleAllChecked = event => {
    let { subjects } = this.state;
    if (this.state.item_selected) {
      for (var v = 0; v < subjects.length; v++) {
        subjects[v].checked = 1;
      }
      this.setState({ selected_data: subjects });
    } else {
      for (var v = 0; v < subjects.length; v++) {
        subjects[v].checked = 0;
      }
      this.setState({ selected_data: [] });
    }
    this.setState({ subjects });
  };





  handleChange = selectedLanguage => {
    this.setState({ selectedLanguage });
    console.log(`Option selected:`, selectedLanguage.value);

  
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
  onChange={this.handleChange}
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
      <div id="subject-page-list">
        <AdminNavbar {...this.props} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SidebarPage {...this.props} active={3} />

          <div
            className="colDefault"
            style={{ width: "100%", backgroundColor: "#F9F9F9" }}
          >
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
                <div className="page_heading justify-content-between">
                  <h3 style={{ marginBottom: 0 }}>About us</h3>
                  {/* <span
                    // onClick={() => this.handleAddNewSubject()}
                    className="add_new_button"
                  >
                    Add New
                  </span> */}

                  {this.renderSelect()}
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
                        All{" "}
                        <span className="count">
                          ({this.state.draft_count + this.state.published_count}
                          )
                        </span>
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
                        Published{" "}
                        <span className="count">
                          ({this.state.published_count})
                        </span>
                      </span>{" "}
                      |
                    </li>
                    {/* <li className="draft">
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
                        Drafts{" "}
                        <span className="count">
                          ({this.state.draft_count})
                        </span>
                      </span>{" "}
                    </li> */}
                    {/* <li className="draft"> */}
                    {/* <span onClick={()=>this.setState({all_selected:false,published_selected:false,trash_selected:true,draft_selected:false})} style={{color:this.state.trash_selected ? '#000':'#a00' }} className={this.state.trash_selected ?"text_Pub current":"text_Pub"}  >Trash <span className="count">({this.state.trash_count})</span></span></li> */}
                  </ul>
                  {/* <div className="tablenav">
                    <div className="alignleft actions bulkactions">
                      <select name="action" id="bulk-action-selector-top">
                        <option value="-1">Bulk Actions</option>

                        <option value="trash">Move to Trash</option>
                      </select>
                      <span className="apply">Apply</span>
                    </div>
                  </div> */}
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
                      <th className="textFontSize">Language</th>
                      {/* <th>Status</th> */}
                    </tr>

                    <MDBTableBody>
                      {this.state.subjects.map((item, index) => {
                        return this.renderTableData(item, index);
                      })}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Aboutus;
