import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import Fade from "react-reveal";
import "./questions.css";
import { MDBIcon } from "mdbreact";
import CKEditor from "ckeditor4-react";
import Select from "react-select";
import swal from "sweetalert";
import MediaComponent from "../MediaComponent/chooseMediaFile";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

export default class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherImage1: "",
      otherImage2: "",
      objective: 0,
      otherImage3: "",
      answerImage: "",

      inputLink: "",
      loading: false,
      objectiveExplaination: "",
      questionTitle: "",
      answers: [],
      correctAnswer: "",
      otherOption1: "",
      otherOption2: "",
      keywords: "",
      otherOption3: "",
      questionType: [
        { value: 1, label: "Objective" },
        { value: 2, label: "Subjective" }
      ],
      questionImage: null,
      questionImageUrl: null,
      topics: [],
      selectedTopics: [],
      difficultyLevels: [
        { value: 1, label: "Easy" },
        { value: 2, label: "Moderate" },
        { value: 3, label: "Tough" }
      ],
      selectedDifficultyLevel: null,
      selectedQuestionType: [{ value: 1, label: "Objective" }],
      selectedQuestionValue: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  componentWillMount() {
    this.getTopics();
    let question_item = JSON.parse(
      window.localStorage.getItem("question_item")
    );
    console.log(question_item.question_type);
    this.setState(
      {
        typeOfQuestion: question_item.question_type,
        objectiveExplaination: question_item.explaination_for_objective
      },
      () => {
        if (this.state.typeOfQuestion == "Subjective") {
          console.log(this.state.typeOfQuestion);
          let state1 = [...this.state.selectedQuestionType];
          console.log(state1.selectedQuestionType);
          state1 = [{ value: 2, label: "Subjective" }];
          this.setState({ selectedQuestionType: state1 }, () =>
            console.log(this.state.selectedQuestionType)
          );
        }
      }
    );
  }

  componentDidMount() {}

  renderQuestionType() {
    return (
      <div className="col-4 diffiulty-level-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="difficulty-label subject-labels question-label "
        >
          Question Type:
        </label>
        <Select
          closeMenuOnSelect={true}
          onChange={e =>
            this.setState({ selectedQuestionType: e }, () => {
              if (this.state.selectedQuestionType.label == "Objective") {
                this.setState({ objective: 1 });
              } else if (this.state.selectedQuestionType.label == "Subjctive") {
                this.setState({ objective: 0 });
              }
            })
          }
          value={this.state.selectedQuestionType}
          className="select-difficulty select"
          options={this.state.questionType}
        />
      </div>
    );
  }

  setInitialQuestionState() {
    var question_item = JSON.parse(
      window.localStorage.getItem("question_item")
    );

    if (question_item.question_type == "Objective") {
      let selectedTopics = [];
      this.setState({ objective: 1 });
      var answers = JSON.parse(question_item.answers);
      var selected_topics = JSON.parse(question_item.topics);

      this.state.topics.forEach(element => {
        for (var i = 0; i < selected_topics.length; i++) {
          if (selected_topics[i] == element.value) {
            var object = new Object();
            object.label = element.label;
            object.value = element.value;
            selectedTopics.push(object);
          }
        }
      });
      this.setState({
        questionId: question_item.question_id,
        choseImage: question_item.question_image,

        questionTitle: question_item.question_title,

        correctAnswer: answers.find(function(element) {
          return element.value == 1;
        }).answer,
        otherOption1: answers[1].answer,
        otherOption2: answers[2].answer,
        otherOption3: answers[3].answer,
        otherImage1: answers[1].link,
        otherImage2: answers[2].link,
        otherImage3: answers[3].link,
        answerImage: answers.find(item => item.value == 1).link,
        selectedTopics: selectedTopics,

        selectedDifficultyLevel: this.state.difficultyLevels.find(
          item => item.value == question_item.difficulty_level
        ),
        loading: false
      });
    } else {
      var selected_topics = JSON.parse(question_item.topics);
      let selectedTopics = [];
      this.state.topics.forEach(element => {
        for (var i = 0; i < selected_topics.length; i++) {
          if (selected_topics[i] == element.value) {
            var object = new Object();
            object.label = element.label;
            object.value = element.value;
            selectedTopics.push(object);
          }
        }
      });
      this.setState({
        questionId: question_item.question_id,
        choseImage: question_item.question_image,

        questionTitle: question_item.question_title,

        keywords: question_item.keywords,
        // otherOption1:answers[1].answer,
        // otherOption2:answers[2].answer,
        // otherOption3:answers[3].answer,
        // otherImage1:answers[1].link,
        // otherImage2:answers[2].link,
        // otherImage3:answers[3].link,
        // answerImage:answers.find(item=>item.value==1).link,
        selectedTopics: selectedTopics,

        selectedDifficultyLevel: this.state.difficultyLevels.find(
          item => item.value == question_item.difficulty_level
        ),
        loading: false
      });
    }

    // console.log("topics",question_item)w
  }

  getTopics = async () => {
    this.setState({
      loading: true
    });
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_topics", {
        method: "GET"
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          responseJson.forEach(element => {
            element.value = element.topic_id;
            element.label = element.topic_name;
          });
          console.log(responseJson);
          this.setState({ topics: responseJson }, () =>
            this.setInitialQuestionState()
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
  };

  handleSaveQuestion() {
    var question = JSON.parse(window.localStorage.getItem("question_item"));
    var id = question.question_id;
    console.log(id, "ididididi");
    if (this.state.questionTitle.length == 0) {
      swal("Check question field!", "Please enter valid question", "error");
    } else if (!this.state.selectedDifficultyLevel) {
      swal("Select difficulty level!", "Choose a difficulty level", "error");
      console.log(this.state.selectedDifficultyLevel);
    } else {
      var questionObject = new Object();
      if (this.state.selectedQuestionType.label == "Objective") {
        console.log(id, "ididididi");
        //question title
        questionObject.id = id;
        questionObject.question = this.state.questionTitle;
        questionObject.questionImage = this.state.choseImage;
        //answers
        questionObject.answers = new Array();
        //correct answer
        questionObject.answers[0] = new Object();
        questionObject.answers[0].id = 0;
        questionObject.answers[0].answer = this.state.correctAnswer;
        questionObject.answers[0].value = 1;
        questionObject.answers[0].link = this.state.answerImage;
        //oter answers
        questionObject.answers[1] = new Object();
        questionObject.answers[1].id = 1;
        questionObject.answers[1].answer = this.state.otherOption1;
        questionObject.answers[1].value = 0;
        questionObject.answers[1].link = this.state.otherImage1;

        questionObject.answers[2] = new Object();
        questionObject.answers[2].id = 2;
        questionObject.answers[2].answer = this.state.otherOption2;
        questionObject.answers[2].value = 0;
        questionObject.answers[2].link = this.state.otherImage2;

        questionObject.answers[3] = new Object();
        questionObject.answers[3].id = 3;
        questionObject.answers[3].answer = this.state.otherOption3;
        questionObject.answers[3].value = 0;
        questionObject.answers[3].link = this.state.otherImage3;
        questionObject.questionType = this.state.selectedQuestionType.label;

        questionObject.difficultyLevel = this.state.selectedDifficultyLevel.value;
        questionObject.objectiveExplaination = this.state.objectiveExplaination;
        //topics
        questionObject.topics = [];
        this.state.selectedTopics.forEach(element => {
          questionObject.topics.push(element.value);
        });
        console.log(
          questionObject,
          this.state.objectiveExplaination,
          "rwhwguiwgwieohgewugg"
        );
      } else if (this.state.selectedQuestionType.label == "Subjective") {
        console.log(id, "ididididi");
        questionObject.id = id;
        questionObject.question = this.state.questionTitle;
        questionObject.questionImage = this.state.choseImage;
        questionObject.keywords = this.state.keywords;
        questionObject.questionType = this.state.selectedQuestionType.label;
        questionObject.difficultyLevel = this.state.selectedDifficultyLevel.value;
        questionObject.topics = [];
        this.state.selectedTopics.forEach(element => {
          questionObject.topics.push(element.value);
        });
      }
      this.editQuestion(questionObject);
    }
  }

  editQuestion(question) {
    this.setState({
      loading: true
    });

    console.log(question.questionType);
    let formData = new FormData();
    if (question.questionType == "Objective") {
      formData.append("question_id", question.id);
      formData.append("difficulty_level", question.difficultyLevel);
      formData.append("question_title", question.question);
      formData.append("topics", JSON.stringify(question.topics));
      formData.append("answers", JSON.stringify(question.answers));
      formData.append("question_image", question.questionImage);
      formData.append("question_type", question.questionType);
      formData.append(
        "explaination_for_objective",
        question.objectiveExplaination
      );
    } else {
      formData.append("question_id", question.id);
      formData.append("difficulty_level", question.difficultyLevel);
      formData.append("question_title", question.question);
      formData.append("topics", JSON.stringify(question.topics));
      formData.append("keywords", this.state.keywords);
      // formData.append('answers',JSON.stringify(question.answers))
      formData.append("question_image", question.questionImage);
      formData.append("question_type", question.questionType);
    }

    for (let key of formData.entries()) {
      console.log(key[0] + ",with photo " + key[1]);
    }

    this.setState({
      response: fetch("http://18.221.47.207:3000/edit_question", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "QWERTy");
          swal("Success", "Question succesfullly edited", "success").then(
            value => {
              this.setState({ loading: false }, () =>
                this.props.history.push("/admin/all-questions")
              );
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

  //HANDLE FUNCTIONS

  renderQuestionTitleSection() {
    return (
      <React.Fragment>
        <div className="col-12 my-2 course-duration-section question-title-section d-flex justify-content-start align-items-center">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className=" subject-labels w-25"
          >
            Question:
          </label>

          <input
            value={this.state.questionTitle}
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control question-form custom-form"
            onChange={data =>
              this.setState({
                questionTitle: data.target.value
              })
            }
          />
        </div>

        <div className="col-12 d-flex align-items-center">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="course-duration-label subject-labels  w-25"
          >
            Choose Image:
            <MediaComponent
              onSelectMediaItem={this.handleMediaChooseImage}
              buttonName={<MDBIcon icon="camera" />}
              restriction="image/*"
            />
          </label>

          <input
            value={this.state.choseImage}
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control other-answer-form custom-form"
            onChange={data => this.setState({ choseImage: data.target.value })}
          />
        </div>
        <div className="col-8 text-center">
          <img src={this.state.choseImage} style={{ width: "200px" }} />
        </div>
      </React.Fragment>
    );
  }

  renderAnswerSection() {
    return (
      <div className="col-8 my-2 right-answer-section">
        <p className="question-label">Answers</p>

        <div className="d-flex align-items-center">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="course-duration-label subject-labels"
          >
            Correct Answer:
          </label>

          <input
            value={this.state.correctAnswer}
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control correct-answer-form custom-form w-100"
            onChange={data =>
              this.setState({ correctAnswer: data.target.value })
            }
          />
          <img
            src={this.state.answerImage}
            className={
              this.state.answerImage.length < 2 ? "d-none" : "answers-image"
            }
          />
          <MediaComponent
            onSelectMediaItem={this.handleMediaChangeAnswer}
            buttonName={<MDBIcon icon="camera" />}
          />
        </div>
        <div className="d-flex  mt-3 other-answers-section">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="course-duration-label subject-labels"
          >
            Other options:
          </label>

          <div className="d-flex flex-column " style={{ width: "110%" }}>
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <input
                value={this.state.otherOption1}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control other-answer-form custom-form w-100"
                onChange={data =>
                  this.setState({ otherOption1: data.target.value })
                }
              />

              <img
                src={this.state.otherImage1}
                className={
                  this.state.otherImage1.length < 2 ? "d-none" : "answers-image"
                }
              />

              <div>
                <MediaComponent
                  onSelectMediaItem={this.handleMediaChangeOption1}
                  buttonName={<MDBIcon icon="camera" />}
                />
              </div>
            </div>

            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <input
                value={this.state.otherOption2}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control other-answer-form custom-form w-100"
                onChange={data =>
                  this.setState({ otherOption2: data.target.value })
                }
              />

              <img
                src={this.state.otherImage2}
                className={
                  this.state.otherImage2.length < 2 ? "d-none" : "answers-image"
                }
              />

              <div>
                <MediaComponent
                  onSelectMediaItem={this.handleMediaChangeOption2}
                  buttonName={<MDBIcon icon="camera" />}
                />
              </div>
            </div>

            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <input
                value={this.state.otherOption3}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control other-answer-form custom-form w-100"
                onChange={data =>
                  this.setState({ otherOption3: data.target.value })
                }
              />

              <img
                src={this.state.otherImage3}
                className={
                  this.state.otherImage3.length < 2 ? "d-none" : "answers-image"
                }
              />

              <div>
                <MediaComponent
                  onSelectMediaItem={this.handleMediaChangeOption3}
                  buttonName={<MDBIcon icon="camera" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //PART OF MEDIA COMPONENT
  handleMediaChangeAnswer = item => {
    console.log(item, "handleMediaChange");
    this.setState({ answerImage: `http://18.221.47.207:3000/${item.file}` });
  };

  handleMediaChangeOption1 = item => {
    console.log(item, "handleMediaChange");
    this.setState({ otherImage1: `http://18.221.47.207:3000/${item.file}` });
  };
  handleMediaChangeOption2 = item => {
    console.log(item, "handleMediaChange");
    this.setState({ otherImage2: `http://18.221.47.207:3000/${item.file}` });
  };
  handleMediaChangeOption3 = item => {
    console.log(item, "handleMediaChange");
    this.setState({ otherImage3: `http://18.221.47.207:3000/${item.file}` });
  };

  handleMediaChooseImage = item => {
    console.log(item, "handleMediaChange");
    this.setState({ choseImage: `http://18.221.47.207:3000/${item.file}` });
  };

  renderRelatedTopicsSection() {
    return (
      <div className="col-6 rquestion-topics-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="question-topics-label subject-labels question-label "
        >
          Topics:
        </label>
        <Select
          closeMenuOnSelect={false}
          isMulti
          onChange={e => this.setState({ selectedTopics: e })}
          value={this.state.selectedTopics}
          className="select-question-topics select"
          options={this.state.topics}
        />
      </div>
    );
  }

  renderDifficultyLevelSection() {
    return (
      <div className="col-4 diffiulty-level-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="difficulty-label subject-labels question-label "
        >
          Difficulty Level:
        </label>
        <Select
          closeMenuOnSelect={true}
          onChange={e => this.setState({ selectedDifficultyLevel: e })}
          value={this.state.selectedDifficultyLevel}
          className="select-difficulty select"
          options={this.state.difficultyLevels}
        />
      </div>
    );
  }

  renderAnswerSectionSubjective() {
    return (
      <div className="col-8 my-2 right-answer-section">
        <div className="d-flex align-items-center">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="course-duration-label subject-labels"
          >
            Keywords
          </label>

          <textarea
            value={this.state.keywords}
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control correct-answer-form custom-form w-100"
            onChange={data => this.setState({ keywords: data.target.value })}
          />
        </div>
      </div>
    );
  }
  onEditorChange(evt) {
    this.setState({
      objectiveExplaination: evt.editor.getData()
    });
  }

  handleChange(changeEvent) {
    this.setState({
      objectiveExplaination: changeEvent.target.value
    });
  }

  renderAnswerSectionObjective() {
    return (
      <div className="col-8 my-2 right-answer-section">
        <p className="question-label">Answers</p>

        <div className="d-flex align-items-center">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="course-duration-label subject-labels"
          >
            Correct Answer:
          </label>

          <input
            value={this.state.correctAnswer}
            type="text"
            id="defaultFormRegisterNameEx"
            className="form-control correct-answer-form custom-form w-100"
            onChange={data =>
              this.setState({ correctAnswer: data.target.value })
            }
          />
          <img
            src={this.state.answerImage}
            className={
              this.state.answerImage.length < 2 ? "d-none" : "answers-image"
            }
          />
          <MediaComponent
            onSelectMediaItem={this.handleMediaChangeAnswer}
            buttonName={<MDBIcon icon="camera" />}
          />
        </div>
        <div className="d-flex  mt-3 other-answers-section">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="course-duration-label subject-labels"
          >
            Other options:
          </label>

          <div className="d-flex flex-column " style={{ width: "110%" }}>
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <input
                value={this.state.otherOption1}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control other-answer-form custom-form w-100"
                onChange={data =>
                  this.setState({ otherOption1: data.target.value })
                }
              />

              <img
                src={this.state.otherImage1}
                className={
                  this.state.otherImage1.length < 2 ? "d-none" : "answers-image"
                }
              />

              <div>
                <MediaComponent
                  onSelectMediaItem={this.handleMediaChangeOption1}
                  buttonName={<MDBIcon icon="camera" />}
                />
              </div>
            </div>

            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <input
                value={this.state.otherOption2}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control other-answer-form custom-form w-100"
                onChange={data =>
                  this.setState({ otherOption2: data.target.value })
                }
              />

              <img
                src={this.state.otherImage2}
                className={
                  this.state.otherImage2.length < 2 ? "d-none" : "answers-image"
                }
              />

              <div>
                <MediaComponent
                  onSelectMediaItem={this.handleMediaChangeOption2}
                  buttonName={<MDBIcon icon="camera" />}
                />
              </div>
            </div>

            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <input
                value={this.state.otherOption3}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control other-answer-form custom-form w-100"
                onChange={data =>
                  this.setState({ otherOption3: data.target.value })
                }
              />

              <img
                src={this.state.otherImage3}
                className={
                  this.state.otherImage3.length < 2 ? "d-none" : "answers-image"
                }
              />

              <div>
                <MediaComponent
                  onSelectMediaItem={this.handleMediaChangeOption3}
                  buttonName={<MDBIcon icon="camera" />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-8 my-2 right-answer-section">
          <div className="d-flex align-items-center">
            <label
              htmlFor="defaultFormRegisterNameEx"
              className="course-duration-label subject-labels"
            >
              Explaination
            </label>

            <CKEditor
              data={this.state.objectiveExplaination}
              onChange={this.onEditorChange}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div id="add-subject-page" className="add-question-page">
        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} />

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
                      <button
                        className="admin-button-style"
                        onClick={() =>
                          this.props.history.push("/admin/all-questions")
                        }
                      >
                        All Questions
                      </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                      <h3> Edit Question</h3>
                      <button
                        className="admin-button-style"
                        onClick={() => this.handleSaveQuestion()}
                      >
                        {" "}
                        Save &amp; Publish
                      </button>
                    </div>
                  </div>

                  <div className="row px-2 my-2 mx-0">
                    {/* {this.renderRelatedTopicsSection()} */}
                    {/* {this.renderDifficultyLevelSection()} */}
                    {/* {this.renderQuestionType()} */}
                    <hr />
                    {/* {this.renderQuestionTitleSection()} */}

                    <hr />

                    {/* {this.state.objective == 1
                      ? this.renderAnswerSectionObjective()
                      : this.renderAnswerSectionSubjective()} */}

                    <hr />

                    <button
                      className="add-subject"
                      onClick={() => this.handleSaveQuestion()}
                    >
                      Save &amp; Publish
                    </button>
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
