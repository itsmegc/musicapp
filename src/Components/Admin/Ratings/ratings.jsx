import React, { Component } from "react";
// import './allTax.css';
import SidebarPage from "../Sidebar/sidebarPage";
import AdminNavbar from "../Navbar/adminNavbar";
import swal from "sweetalert";
import { css } from "@emotion/core";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import GridLoader from "react-spinners/GridLoader";
import ActivePNG from "../../../Assets/images/activestatus.png";
import InactivePNG from "../../../Assets/images/inactivestatus.png";
import Select from "react-select";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;

class allRatings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      ratings: [],
      user_data: [],
      subject_data: [],
      showAction: false,
      draft_count: 0,
      published_count: 0,
      trash_count: 0,
      all_selected: true,
      draft_selected: false,
      published_selected: false,
      trash_selected: false,
      selected_data: [],
      selected_sub: []

      // classList: [
      //   { value: "", label: "" },

      // ]
    };
  }
  componentWillMount() {
    this.setState({ loading: true }, () => this.getratings());
    this.getSubjects();
    this.getUsers();
  }

  componentDidMount() {

    // window.localStorage.removeItem("subject_item");
  }

  getratings = async () => {
  
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_ratings", {
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

          var user = this.state.user_data;

          for (var v = 0; v < user.length; v++) {
            var userID1 = JSON.parse(user[v].user_id);
            for (let j = 0; j < responseJson.length; j++) {
              var userID2 = JSON.parse(responseJson[j].user_id);

              if (userID1 === userID2) {
                responseJson[j].name = user[v].name;
              }
            }
          }

          this.setState({
            ratings: responseJson,
            draft_count: draft_count,
            published_count: published_count,
            trash_count: trash_count,
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

  handleEditSubject(item) {
    window.localStorage.setItem("subject_item", JSON.stringify(item));
    window.localStorage.setItem(
      "subject_list",
      JSON.stringify(this.state.ratings)
    );
    this.props.history.push("/admin/edit-tax");
  }

  handleAddNewSubject() {
    window.localStorage.setItem(
      "subject_list",
      JSON.stringify(this.state.ratings)
    );
    this.props.history.push("/admin/add-tax");
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
          </div>
        );
      }
    } else {
      return (
        <div className="actions_div" style={{ visibility: "hidden" }}>
          <span className="actionstext">Edit</span>{" "}
        </div>
      );
    }
  }
  showactionbutton(item, index) {
    let { ratings } = this.state;
    let selected_page = ratings[index];
    for (var v = 0; v < ratings.length; v++) {
      ratings[v].selected = 0;
    }
    selected_page.selected = 1;
    this.setState({
      ratings
    });
  }
  hideactionbutton() {
    let { ratings } = this.state;

    for (var v = 0; v < ratings.length; v++) {
      ratings[v].selected = 0;
    }

    this.setState({
      ratings
    });
  }
  renderStatus(item) {
    if (item.status == 0) {
      return "Last Modified";
    } else {
      return "Published";
    }
  }


  changeRating(item, status) {
    this.setState({
      loading: true
    });
    let details = {
      
      subject_id: item.subject_id,
      rating_id:item.rating_id,
    
      user_id:item.user_id,
      rating_value: item.rating_value,
      reviews: item.reviews,
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
      response: fetch("http://18.221.47.207:3000/edit_ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=31536000"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          swal({
            text: `Featue review for ${item.label} added !!!`,
          });
              window.location.reload();
      //  this.setState({loading:false})

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
      user_name: item.name,
      rating_value: item.rating_value,
      reviews: item.reviews,
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
      response: fetch("http://18.221.47.207:3000/add_featured_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=31536000"
        },
        body: formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          // window.location.reload();

        this.setState({loading:false},()=>this.changeRating(item,status))
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

  getUsers = async () => {
  
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_users", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ user_data: responseJson, loading: false });
        })
        .catch(error => {
          this.setState({
            loading: false
          });
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };

  getSubjects = async () => {
  
    
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_subjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          var ratings = this.state.ratings;

          for (var v = 0; v < ratings.length; v++) {
            var subID1 = JSON.parse(ratings[v].subject_id);
            for (let j = 0; j < responseJson.length; j++) {
              var subID2 = JSON.parse(responseJson[j].subject_id);

              if (subID1 === subID2) {
                ratings[v].label = responseJson[j].subject_name;
                ratings[v].value = responseJson[j].subject_id;
              }
            }
          }

          this.setState({
            subject_data: ratings,
            classList: ratings,

            
          });
        })
        .catch(error => {
          this.setState({
            loading: false
          });
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };

  renderActiveReview(item) {
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

    // console.log(this.state.selected_sub.value!=item.value)

if(this.state.selected_sub.value===item.value){
 
      if (item.status != 2) {
        console.log(item,'bigE')
        return (
          <tr key={item.rating_id}>
            <td style={{ width: "15%" }} className="tdName textFontSize">
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.name}
              </span>
            </td>
            <td style={{ width: "8%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.rating_value}
              </span>
            </td>

            <td style={{ width: "8%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.label}
              </span>
            </td>

            <td style={{ width: "50%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.reviews}
              </span>
            </td>
            <td>{this.renderActiveReview(item)}</td>
          </tr>
        );
      }
   
    

    
  
      if (item.status == 1) {
        return (
          <tr key={item.rating_id}>
            <td style={{ width: "15%" }} className="tdName textFontSize">
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.name}
              </span>
            </td>
            <td style={{ width: "8%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.rating_value}
              </span>
            </td>

            <td style={{ width: "8%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.subject_name}
              </span>
            </td>

            <td style={{ width: "50%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.reviews}
              </span>
            </td>
            <td>{this.renderActiveReview(item)}</td>
          </tr>
        );
      }

    
  
      if (item.status == 0) {
        return (
          <tr key={item.rating_id}>
            <td style={{ width: "15%" }} className="tdName textFontSize">
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.name}
              </span>
            </td>
            <td style={{ width: "8%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.rating_value}
              </span>
            </td>

            <td style={{ width: "8%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.subject_name}
              </span>
            </td>

            <td style={{ width: "50%" }}>
              {" "}
              <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
                {item.reviews}
              </span>
            </td>
            <td>{this.renderActiveReview(item)}</td>
          </tr>
        );
      }


  }


// else {
 
//   if (item.status != 2) {
//     // console.log(this.state.all_selected,item.status,'bigE')
//     return (
//       <tr key={item.rating_id}>
//         <td style={{ width: "15%" }} className="tdName textFontSize">
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.name}
//           </span>
//         </td>
//         <td style={{ width: "8%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.rating_value}
//           </span>
//         </td>

//         <td style={{ width: "8%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.label}
//           </span>
//         </td>

//         <td style={{ width: "50%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.reviews}
//           </span>
//         </td>
//         <td>{this.renderActiveReview(item)}</td>
//       </tr>
//     );
//   }





//   if (item.status == 1) {
//     return (
//       <tr key={item.rating_id}>
//         <td style={{ width: "15%" }} className="tdName textFontSize">
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.name}
//           </span>
//         </td>
//         <td style={{ width: "8%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.rating_value}
//           </span>
//         </td>

//         <td style={{ width: "8%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.subject_name}
//           </span>
//         </td>

//         <td style={{ width: "50%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.reviews}
//           </span>
//         </td>
//         <td>{this.renderActiveReview(item)}</td>
//       </tr>
//     );
//   }



//   if (item.status == 0) {
//     return (
//       <tr key={item.rating_id}>
//         <td style={{ width: "15%" }} className="tdName textFontSize">
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.name}
//           </span>
//         </td>
//         <td style={{ width: "8%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.rating_value}
//           </span>
//         </td>

//         <td style={{ width: "8%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.subject_name}
//           </span>
//         </td>

//         <td style={{ width: "50%" }}>
//           {" "}
//           <span style={{ fontFamily: "Ubuntu-B", color: "#0073aa" }}>
//             {item.reviews}
//           </span>
//         </td>
//         <td>{this.renderActiveReview(item)}</td>
//       </tr>
//     );
//   }


// }



  }

  onToggle(index, e) {
    console.log(index, "kjkk");
    let { ratings, selected_data } = this.state;
    let selected_item = ratings[index];
    if (selected_item.checked == 1) {
      selected_item.checked = 0;
      selected_data.splice(index, 1);
    } else {
      selected_item.checked = 1;
      selected_data.push(selected_item);
    }

    this.setState({ selected_data });
    this.setState({ ratings });
  }

  handleAllChecked = event => {
    let { ratings } = this.state;
    if (this.state.item_selected) {
      for (var v = 0; v < ratings.length; v++) {
        ratings[v].checked = 1;
      }
      this.setState({ selected_data: ratings });
    } else {
      for (var v = 0; v < ratings.length; v++) {
        ratings[v].checked = 0;
      }
      this.setState({ selected_data: [] });
    }
    this.setState({ ratings });
  };


  handleChange = selected_sub => {
    this.setState({ selected_sub });
    console.log(`Option selected:`, selected_sub);

  
  };

  renderSelect() {
 
    const subjectOption = [...new Map(this.state.subject_data.map(item => [item.value, item])).values()]

   

    return (
      <div className="col-5  d-flex align-items-center">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          Subject :
        </label>
        <Select
          closeMenuOnSelect={true}
          onChange={this.handleChange}
          value={this.state.selected_sub}
          className="promocode-type select w-25 "
          options={subjectOption}
        />
        {/* {console.log(y)} */}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="sweet-loading">
          <GridLoader
            css={override}
            sizeUnit={"px"}
            size={25}
            color={"#c01825"}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <div id="subject-page-list">
          <AdminNavbar {...this.props} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <SidebarPage {...this.props} active={6} />

            <div
              className="colDefault"
              style={{ width: "100%", backgroundColor: "#F9F9F9" }}
            >
              <div className="page_heading d-flex justify-content-between">
                <h3 style={{ marginBottom: 0, marginRight: "5px" }}>Ratings</h3>
                {/* <span onClick={()=>this.handleAddNewSubject()} className='add_new_button'>Add New</span> */}

                {this.renderSelect()}
              </div>
              <div>
                <MDBTable
                  striped
                  className="pages_table"
                  style={{ backgroundColor: "#F9F9F9" }}
                >
                  <tr style={{ backgroundColor: "white" }}>
                    {/* <th><input type="checkbox" onClick={(event)=> this.setState({item_selected:!this.state.item_selected},()=>this.handleAllChecked(event))}  checked={this.state.item_selected}  value="checkedall" /></th> */}

                    <th className="">User Name</th>
                    <th className="textFontSize">Rating</th>
                    <th className="textFontSize">Subject Name</th>
                    <th className="textFontSize">Review</th>
                    <th>Make a Feature Review</th>
                  </tr>

                  <MDBTableBody>
                    {this.state.subject_data.map((item, index) => {
                      return this.renderTableData(item, index);
                    })}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default allRatings;
