import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import GridLoader from "react-spinners/GridLoader";
import Select from "react-select";
import Fade from "react-reveal";
import { CircularProgressbar } from "react-circular-progressbar";
import swal from "sweetalert";
import "../Lectures/Addlecture.css";
import { MDBIcon } from "mdbreact";
import MediaComponent from "../MediaComponent/chooseMediaFile";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

export default class AddLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "image",
      username: "",
      selectedType: "",
      testType: "",
      verticals: [],
      selectedVerticals: "",
      explainationSubjective: "",
      evaluationDetails: [],
      evaluations: [],
      evaluationsCompleted: [],
      inputLink: ""
    };
  }
  componentDidMount() {
    console.log(this.state.value);
  }
  componentWillMount() {
    let evaluationDetails = JSON.parse(localStorage.getItem("user_evaluation"));
    console.log(evaluationDetails.test_id)
    localStorage.setItem('test_id',evaluationDetails.test_id)
    this.setState({ evaluationDetails },()=>console.log(this.state.evaluationDetails));
    console.log(this.state.evaluationDetails)
    let test_questions = JSON.parse(evaluationDetails.test_questions);
    test_questions.forEach(element => {
      element.explaination = null;
    });
    console.log(evaluationDetails);
    //   let testType=localStorage.getItem('test_type')
    // console.log(testType)
    this.setState({
      username: evaluationDetails.user_name,
      test_evaluations: JSON.parse(evaluationDetails.test_questions),
      testType: evaluationDetails.test_type
    });
  }

  handlechangeurl = text => this.setState({ inputLink: text.target.value });

  handleExplanation(e, index) {
    let test_evaluations = this.state.test_evaluations;
    let tetsItem = test_evaluations[index];
    tetsItem.explaination = e.target.value;
    this.setState({ test_evaluations }, () =>
      console.log(this.state.test_evaluations)
    );
    let test_question_updated = JSON.stringify(this.state.test_evaluations);
    console.log(test_question_updated);
    let evaluationsCompleted = { ...this.state.evaluationDetails };
    // console.log(evaluations)
    evaluationsCompleted.test_questions = test_question_updated;
    this.setState({ evaluationsCompleted });
  }

  renderSubjectiveQuestionsTest() {
    console.log(this.state.test_evaluations);
    let c = 0;
    return this.state.test_evaluations.map((item, index) => {
      console.log(item.keywords);
      let answer;
      if (item.answers != null) {
        answer = item.answers.trim().toLowerCase();
      }
      if(item.keywords!=null){
      var keyword = item.keywords
        .trim()
        .toLowerCase()
        .split(" ");
      }
      console.log(answer);
      console.log(keyword);
      let percentage;
      if (item.answers != null) {
        var count = 0;
        if(keyword!=undefined){
        keyword.forEach(word => {
          if (answer.includes(word.toLowerCase())) {
            count++;
          }
        });
        console.log(count);

        percentage = Math.floor((count / keyword.length) * 100);
      } }else {
        percentage = 0;
      }

      return (
        <>
          <div className="col-7">
            <p>
              <b>{++c}. Question - </b> {item.question_title}
            </p>
            <p>
              <b>Answer - </b> {item.answers}
            </p>
            <br />
            <p className="d-flex justify-content-between">
              <span>
                <b>Keywords - </b> {item.keywords}
              </span>{" "}
              <span style={{ marginLeft: "30px" }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                />
                ;
              </span>
            </p>
            <br />
            <br />
            <br />
          </div>
          <div className="col-4">
            <textarea
              id="form7"
              class="md-textarea form-control"
              rows="3"
              placeholder="Explaination here ..."
              value={this.state.explaination}
              onChange={e => this.handleExplanation(e, index)}
            ></textarea>
          </div>
          <hr />
        </>
      );
    });
  }
  renderSelectedAnswer(item) {
    if (item.selected_answer == null) return "Not attempted";
    else return item.selected_answer.answer;
  }
  renderCorrectAnswer(item) {
    console.log(item);
    let findCorrectAnswer = JSON.parse(item.answers);
    // console.log(correctAnswer)
    let correctAnswer = findCorrectAnswer.filter(item => item.value == 1);
    console.log(correctAnswer);
    return correctAnswer[0].answer;
  }

  renderObjectiveQuestionsTest() {
    console.log(this.state.test_evaluations);


    let c = 0;
    let opt = ["a", "b", "c", "d"];
    return this.state.test_evaluations.map((item,index) => {
      let options = JSON.parse(item.answers);
      return (
        <>
          <div className="col-7">
            <p>
              <b>{++c}. Question - </b> {item.question_title}
            </p>
            <p>
              <b>Options - </b>{" "}
              {options.map((item, index) => (
                <p className="itemanswers">
                  {opt[index]}) {item.answer}
                </p>
              ))}
            </p>
            <span style={{ fontFamily: "OpenSans-B" }}>
              User Answer - {this.renderSelectedAnswer(item)}
            </span>
            <p style={{ fontFamily: "OpenSans-B" }}>
              Correct Answer - {this.renderCorrectAnswer(item)}
            </p>
            {/* <p>User Answer - {item.selected_answer.answer}</p> */}
            <br />
            {/* <p><b>Keywords - </b> {item.keywords}</p> <br/><br/><br/> */}
          </div>
          <div className="col-4">
          <textarea
              id="form7"
              class="md-textarea form-control"
              rows="3"
              placeholder="Explaination here ..."
              value={this.state.explaination}
              onChange={e => this.handleExplanation(e, index)}
            ></textarea>
          </div>
          <hr />
        </>
      );
    });
  }

  renderChooseFile = () => {
    return (
      <div className="col-12  d-flex">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="course-duration-label subject-labels"
        >
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
  completedEvaluation() {
    this.setState({
      loading: true
    });
    let details = {
      // product_id:this.state.selected_products.product_id,

      evaluation_id: this.state.evaluationDetails.evaluation_id
    };
    console.log(this.state.evaluationDetails.evaluation_id)
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/del_evaluation", {
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
      this.props.history.push('/admin/evaluation')
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

  addExplaination() {
    this.setState({
      loading: true
    });
    

    let details = {
      // product_id:this.state.selected_products.product_id,

      user_id: this.state.evaluationDetails.user_id,
      test_id: this.state.evaluationDetails.test_id,
      explainations: JSON.stringify(this.state.evaluationsCompleted),
      test_type:this.state.evaluationDetails.test_type
    };
    console.log(details, "add-without photo");
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/add_explaination", {
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
            this.setState(
              {
                loading: false
                // add_modal:false
              },
              // this.props.history.push('/admin/evaluation')
              () => this.completedEvaluation()
            );
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

    // let formData = new FormData();
    // formData.append("lecture_name", this.state.lecturename);
    // formData.append("lecture_description", this.state.description);
    // formData.append("duration", Number(this.state.duration));
    // formData.append("type", type_local);
    // formData.append("link", this.state.inputLink);
    // formData.append("status", this.state.status);
    // this.setState({
    //   response: fetch("http://18.221.47.207:3000/post_lecture", {
    //     method: "POST",
    //     body: formData
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log(responseJson, "QWERTy");
    //       swal("Success", "Lecture succesfullly added", "success");
    //       this.props.history.push("/admin/lecture");
    //     })
    //     .catch(error => {
    //       swal("Warning!", "Check your network!", "warning");
    //       console.log(error);
    //     })
    // });
  }

  //PART OF MEDIA COMPONENT
  handleMediaChange = item => {
    console.log(item, "handleMediaChange");
    this.setState({ inputLink: `http://18.221.47.207:3000/${item.file}` });
  };

  render() {
    console.log(this.state.evaluationDetails, "state");
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
                    <button
                      className="admin-button-style admin-button-style-margin"
                      onClick={() => this.props.history.push("/admin/lecture")}
                    >
                      All Lectures
                    </button>
                    {/* <MediaComponent
                      onSelectMediaItem={this.handleMediaChooseImage}
                      buttonName={<MDBIcon icon="camera" />}
                      restriction="image/*"
                    /> */}
                    <button
                      className="admin-button-style ml-auto"
                      onClick={() => this.addExplaination()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h4 style={{ fontFamily: "OpenSans-R" }}>
                      {" "}
                      Evaluation for{" "}
                      <span style={{ fontFamily: "OpenSans-R" }}>
                        {this.state.username}
                      </span>
                    </h4>
                  </div>
                </div>

                {/* <div className="subject-content-container ml-4 fit-content">
                      <div className="row px-0 mx-0">rv
                      </div>
                    </div> */}
                <div className="row px-0 mx-5">
                  {console.log(this.state.testType)}
                  {this.state.testType == "Subjective"
                    ? this.renderSubjectiveQuestionsTest()
                    : this.renderObjectiveQuestionsTest()}
                  {console.log(this.state.explainationSubjective)}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
