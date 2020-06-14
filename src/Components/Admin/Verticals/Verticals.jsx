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
import GridLoader from "react-spinners/GridLoader";
import AdminNavbar from "../Navbar/adminNavbar";
import "../UserDetail/userDetail.css";
import swal from "sweetalert";
import { FormGroup, Label, Input } from "reactstrap";
import { HalfCircleSpinner } from "react-epic-spinners";
import ActivePNG from "../../../Assets/images/activestatus.png";
import InactivePNG from "../../../Assets/images/inactivestatus.png";
import Select from "react-select";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;
class allVerticals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showAction: false,
      draft_count: 0,
      published_count: 0,
      trash_count: 0,
      all_selected: true,
      dashboard:[],
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
    this.setState({ loading: true });
    this.getdashboard()
  }
  getdashboard=async()=>{
    this.setState({
     
        response: fetch("http://18.221.47.207:3000/get_dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          var draft_count=0,published_count=0,trash_count=0
                for(var v=0;v<responseJson.length;v++){
                   
                    responseJson[v].selected = 0
                    if(responseJson[v].status==0){
                      draft_count=draft_count+1
                    }
                    else if(responseJson[v].status==1){
                      published_count=published_count+1
                                        }
                    else if(responseJson[v].status==2){
                      trash_count=trash_count+1
                         }
                    }
                    this.setState({
                     dashboard:responseJson,
                      draft_count:draft_count,
                      published_count:published_count,
                      trash_count:trash_count,
                      loading:false
                      })

          console.log(this.state);
        })
        .catch(error => {
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
          console.log(error);
        })
    });
  }

  componentDidMount() {
    window.localStorage.removeItem("subject_item");
  }

  handleChangeAddName = e => {
    this.setState({ name: e.target.value });
  };
  handleChangeAddLink = e => {
    this.setState({ website_link: e.target.value });
  };

  handleChangeAddLogo = e => {
    this.setState({ logo: e.target.files[0] });
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

  handleEditlecture(item) {
    window.localStorage.setItem("dashboard_item", JSON.stringify(item));
    window.localStorage.setItem(
      "dashboard_list",
      JSON.stringify(this.state.dashboard)
    );
    this.props.history.push("/admin/edit-vertical");
  }

  handleAddNewDashboard() {
    window.localStorage.setItem(
      "dashboard_list",
      JSON.stringify(this.state.dashboard)
    );
    this.props.history.push("/admin/add-vertical");
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
              onClick={() => this.handleEditlecture(item, index)}
              className="actionstext"
            >
              Edit
            </span>{" "}
            {" "}
            {/* <span
              onClick={() => this.trashAlert(item)}
              className="actionstext"
              style={{ color: "#a00" }}
            >
              Trash
            </span>{" "} */}
          </div>
        );
      }
    } else {
      return (
        <div className="actions_div" style={{ visibility: "hidden" }}>
          <span className="actionstext">Edit</span> {" "}
          {/* <span className="actionstext" style={{ color: "#a00" }}>
            Trash
          </span>{" "} */}
        </div>
      );
    }
  }
  showactionbutton(item, index) {
    let { dashboard } = this.state;
    let selected_page = dashboard[index];
    for (var v = 0; v < dashboard.length; v++) {
      dashboard[v].selected = 0;
    }
    selected_page.selected = 1;
    this.setState({
      dashboard
    });
  }
  hideactionbutton() {
    let { dashboard } = this.state;

    for (var v = 0; v < dashboard.length; v++) {
      dashboard[v].selected = 0;
    }

    this.setState({
      dashboard
    });
  }
  renderStatus(item) {
    if (item.status == 0) {
      return "Last Modified";
    } else {
      return "Published";
    }
  }
  // trashAlert = item => {
  //   console.log(item, "xxx");
  //   swal({
  //     title: "Are you sure?",
  //     text: "You want to move this page to trash",
  //     buttons: true,
  //     dangerMode: true
  //   }).then(willAdd => {
  //     if (willAdd) {
  //       this.trashPage(item);
  //     } else return;
  //   });
  // };
  // deleteAlert = item => {
  //   console.log(item, "xxx");
  //   swal({
  //     title: "Are you sure?",
  //     text: "You want to delete this page",
  //     buttons: true,
  //     dangerMode: true
  //   }).then(willAdd => {
  //     if (willAdd) {
  //       this.deletePage(item);
  //     } else return;
  //   });
  // };
  // restoreAlert = item => {
  //   console.log(item, "xxx");
  //   swal({
  //     title: "Are you sure?",
  //     text: "You want to restore this page",
  //     buttons: true,
  //     dangerMode: true
  //   }).then(willAdd => {
  //     if (willAdd) {
  //       this.restorePage(item);
  //     } else return;
  //   });
  // };
  // trashPage(item) {
  //   this.setState({
  //     loading: true
  //   });
  //   let details = {
  //     id: item.subject_id
  //   };
  //   console.log(details, "details");
  //   let formBody = [];
  //   for (let property in details) {
  //     let encodedKey = encodeURIComponent(property);
  //     let encodedValue = encodeURIComponent(details[property]);
  //     formBody.push(encodedKey + "=" + encodedValue);
  //   }
  //   formBody = formBody.join("&");

  //   this.setState({
  //     response: fetch("http://18.221.183.249:3000/trash_content", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Cache-Control": "max-age=31536000"
  //       },
  //       body: formBody
  //     })
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         window.location.reload();
  //       })
  //       .catch(error => {
  //         this.setState({
  //           loading: false
  //         });
  //         swal("Warning!", "Check your network!", "warning");
  //         console.log(error);
  //       })
  //   });
 // }

  changeStatus(item, status) {
  
    let details = {
      id: item.id,
      status: status
    };
    // console.log(details, "details");
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({

      response: fetch("http://18.221.47.207:3000/edit_dashboard", {
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
       let details = {
       id:item.id,
     };
     console.log(details,'details')
     let formBody = [];
     for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
     }
     formBody = formBody.join("&");
     this.setState({
      response: fetch('http://18.221.183.249:3000/restore_content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'max-age=31536000'
      },
     body:formBody
      }).then((response) => response.json())
      .then((responseJson)=>{
           window.location.reload()
      }
      )
        .catch((error) => {
       this.setState({
         loading:false
       })
       swal("Warning!", "Check your network!", "warning");
     console.log(error)
         })
        })
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
        console.log(this.state.all_selected, item.status);
        return (
          <tr key={item.id}>
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
                  {item.name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
             
              <span className="tabledate">
              {item.subtitle}
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
                  {item.name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
             
             <span className="tabledate">
             {item.subtitle}
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
                  {item.name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
             
             <span className="tabledate">
             {item.subtitle}
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
                  {item.name}
                </span>
                {this.renderActions(item, index)}
              </div>
            </td>
            <td className="datefontsize">
             
             <span className="tabledate">
             {item.subtitle}
             </span>
           </td>
           <td>{this.renderActiveStatus(item)}</td>
          </tr>
        );
      }
    }
  }
}

  onToggle(index, e) {
    console.log(index, "kjkk");
    let { dashboard, selected_data } = this.state;
    let selected_item = dashboard[index];
    if (selected_item.checked == 1) {
      selected_item.checked = 0;
      selected_data.splice(index, 1);
    } else {
      selected_item.checked = 1;
      selected_data.push(selected_item);
    }

    this.setState({ selected_data });
    this.setState({ dashboard });
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
            <SidebarPage {...this.props} active={11} />

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
                <h3 style={{ marginBottom: 0 }}>Verticals</h3>
                <span
                  onClick={() => this.handleAddNewDashboard()}
                  className="add_new_button"
                >
                  Add New
                </span>
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
                      All <span className="count">    ({this.state.draft_count+this.state.published_count})</span>
                    </span>
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
                      Published <span className="count">({this.state.published_count})</span>
                    </span>
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
                      Drafts <span className="count">({this.state.draft_count})</span>
                    </span>{" "}
                    |
                  </li> */}

                  <li className="draft">
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
                      {/* Trash <span className="count">()</span> */}
                    </span>
                  </li>
                </ul>
                {/* <div className="tablenav">
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
                    <th className="textFontSize">Sub Title</th>
                    <th>Status</th>
                  </tr>

                  <MDBTableBody>
                    {this.state.dashboard.map((item, index) => {
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

export default allVerticals;
