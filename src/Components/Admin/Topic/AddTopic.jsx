import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import GridLoader from "react-spinners/GridLoader";
import Select from "react-select";
import Fade from "react-reveal";
import swal from "sweetalert";
import Picky from "react-picky";
// import "react-picky/dist/picky.css"; //
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import './Topic.css'
import {MDBInput} from 'mdbreact'
export default class AddTopic extends Component {


  constructor(props) {
    super(props);
    this.state = {
      status: true,
      topicname: "",
      description: "",
      totallectures: "",
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:'',
      dragDropLectures: [],
      lecturesArray: [],
      topicListShowing: false,
      selectedLectures:null,sample:false,
      
      
    };

    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentWillMount(){
    this.getLectures();
  }


  renderCheckBox = () => {
    return (
      <>
     
     <div className="col-12  subject-name-section d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels include_label">
           Include in sample content:
      </label>
          
          <input className='check_input' label="Include in sample content" checked={this.state.sample} onChange={()=>this.setState({sample:!this.state.sample})} type="checkbox" id="checkbox1" />
      </div>
      </>
    );
  };

    //ITEM RENDERER DRAG DROP
    itemRenderer(item, index) {
      return (
        <div className="item" key={item.id}>
          <p className="title">{item.lecture_name}</p>
          <button className="delete-subject-topic-button" onClick={()=>this.deleteLecture(item)}><i className="fas fa-trash"></i></button>
        </div>
      );
    }
    handleRLDDChange(reorderedItems) {
      this.setState({ dragDropLectures: reorderedItems });
    }

  getLectures = async () => {
    var lecture_list = JSON.parse(window.localStorage.getItem("lecture_list"));
    this.setState({lecturesArray:lecture_list})
  };



  addTopic(){

    if(this.state.topicname.length==0){
      swal("Check topic name!", "Please enter valid name", "error");
  }
  else if (this.state.description.length==0) {
      swal("Check description!", "Enter valid description", "error");
      console.log(this.state.subjectCost)
   }
  else if(!this.state.dragDropLectures){
      swal("Choose lectures for your Topic!", "Must contain atleast one lecture", "error");
    }
    else if (!this.state.selectedLanguage.value) {
      swal("Select any language", "Please Select any language!", "error");
    } 


  else{


    if(this.state.sample==true){
      var sample_content=1
    }
    else{
      var sample_content=0
    }

      this.setState({
      loading:true
      // add_modal:false
      })


        let formData = new FormData()
        formData.append('topic_name',this.state.topicname)
        formData.append('topic_description',this.state.description)
        formData.append('status',1)
        formData.append('sample',sample_content)
        formData.append('lectures',JSON.stringify(this.state.dragDropLectures))

        formData.append('language_id',this.state.selectedLanguage.value)
        for (let key of formData.entries()) {
          console.log(key[0] + ',with photo ' + key[1]);
      }



          this.setState({
          response: fetch('http://18.221.47.207:3000/add_topic', {
          method: 'POST',
          body: formData
          }).then((response) => response.json())
          .then((responseJson)=>{
          console.log(responseJson,'QWERTy')
          swal("Success", "Topic succesfullly added", "success").then((value)=>{
          this.props.history.push('/admin/all-topics')
          });

          })
          .catch((error) => {
          this.setState({
          loading:false
          })
          swal("Warning!", "Check your network!", "warning")
           console.log(error)
              })
          })
       }
  }


  addTopicLectures(selectedLectures){
    if(!selectedLectures){
        swal({
            title: `No Selections Made`,
            text:`You have not seleted any topics to add`,
            icon: "error",
            buttons: false,
            dangerMode: true,
          })
    }
    else{
    swal({
        title: `Confirm selection?`,
        text:`You are adding ${selectedLectures.length} topics to this course`,
        icon: "info",
        buttons: true,
        dangerMode: false,
      })
      .then((willAdd) => {
        if (willAdd) {
            var array = [];
            var i = 0;

            selectedLectures.forEach(element => {
                var topicObject = new Object();
                topicObject = element;
                topicObject.sortOrder = i;
                array.push(topicObject);
                i++;
            });
            console.log(array)
           this.setState({dragDropLectures:array})
      } else {

      }
    });
   }
}

deleteLecture(item){
  let {dragDropLectures} = this.state;
  console.log("deleted",item);
  var newLectureList = dragDropLectures.filter(Listitem=>Listitem.id!=item.id);
  var i = 0;
  newLectureList.forEach(element => {
      element.sortOrder = i;
      i++;
  });
  console.log("topics", newLectureList)
  this.setState({dragDropLectures:newLectureList,
                  selectedLectures:newLectureList});
 }





  rendertopicname = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
           Name:
      </label>
      <input
         
         value={this.state.topicname}
             type="text"
             id="defaultFormRegisterNameEx"
             className="form-control subject-name-form custom-form"
             onChange={(text)=>this.setState({topicname:text.target.value})}
         />
 </div>
    );
  };

  renderdescription = () => {
    return (
      <div className="col-12  subject-name-section d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
           Description:
      </label>
      <input
         
         value={this.state.description}
             type="text"
             id="defaultFormRegisterNameEx"
             className="form-control subject-name-form custom-form"
             onChange={(text)=>this.setState({description:text.target.value})}
         />
 </div>
    );
  };

  rendernumberoflectures = () => {
    return (
      <div className="col-4 w-100 my-2 cost-section d-none">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          Number of lectures :
        </label>
        <input
          autoFocus
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
        />
      </div>
    );
  };



  renderLecturesPickySection() {
      return(
        <React.Fragment>
        <button className="show-topics-list-button mb-3" onClick={()=>this.setState({topicListShowing:!this.state.topicListShowing})}> Lecture List <i className="fa fa-chevron-down" /></button>
        {this.state.topicListShowing?
    (   <div className="lecture-list-picky-container">
          <Select
            closeMenuOnSelect={false}
            isMulti
            onChange={e=>this.setState({selectedLectures:e},()=>console.log(this.state.selectedLectures))}
            value={this.state.selectedLectures}
            className='select-exam select w-100'
            options={this.state.lecturesArray}           
               />
           <div>
           <button className="w-50 float-right admin-button-style" onClick={()=>this.addTopicLectures(this.state.selectedLectures)}>
                Save Topics
            </button>
        </div>
        </div>)
        :
        ""}
        </React.Fragment>
        )
  }

  renderLessonStructureSection(){
    if (this.state.dragDropLectures)
    return(

            <RLDD
            cssClasses="drag-drop-topic-list"
            items={this.state.dragDropLectures}
            itemRenderer={this.itemRenderer}
            onChange={this.handleRLDDChange}
            />
    )
    else{
        return <p className="text-center text-muted">There are no topics currently selected for this course!</p>
            }
}

  
  renderTopicLecturesSection() {
    return (
<React.Fragment>
            <div className="col-12 subject-topics-container">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels py-3">
                Add Lectures:
            </label> 
            <div className="row mx-0 bg-white">
            <div className="col-3 topic-list-column px-0">
                {this.renderLecturesPickySection()}
            </div>

            <div className="col-9 topic-structure-column">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels text-center w-100">
                 Lectures Order:
            </label>
                 <hr />
                 {this.renderLessonStructureSection()}
            </div>

            </div>
            </div>
            </React.Fragment>
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
    {    console.log(this.state.options,'mr.Robot')}

    </div>
  );
}





  render() {
    console.log(this.state)
  
    return (
      <div id="add-subject-page">
      <AdminNavbar {...this.props} />
     
      <div className="d-flex">
          <SidebarPage {...this.props} active={10}/>

          <div className="add-subject-column">
            <React.Fragment>
              <Fade>
              <div className="row my-3 px-4">
                    <div className="col-12 d-flex align-items-center justify-content-between mb-4">
                    <button className="admin-button-style" onClick={()=>this.props.history.push('/admin/all-topics')}>
                        All Topics
                    </button>
                    {this.renderSelect()}
                    <button className="admin-button-style" onClick={()=>this.addTopic()}> Save &amp; Publish</button>

                    </div>
             

                    <div className="col-12 mt-4 d-flex align-items-center">
                    <h3> Add Topic</h3> 
                  
                  </div>
                    </div>
                <div className="d-flex">
                <div className="subject-content-container ml-4">
                <div className="row px-0 mx-0">
                    {this.rendertopicname()}
                    {this.renderdescription()}
                    {this.renderCheckBox()}
                    {/* <hr /> */}
  
                </div>
                </div>
                <div className="subject-select-fields-container ml-2 row align-self-start flex-column mr-4">
             
                </div>
                </div>
                <div className="subject-topics-container mx-4 mt-4">
                    <div className="row p-0 mx-0">
                    {this.renderTopicLecturesSection()}
                    </div>
                    {/* <hr /> */}
                </div>
                <button className="add-subject my-5 float-right mr-4" onClick={()=>this.addTopic()}>Save &amp; Publish</button>
                    

              </Fade>
            </React.Fragment>
          </div>
          </div>
       </div>
    )
  }
}
