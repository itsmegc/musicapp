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
import { thisExpression } from "@babel/types";
import { ListGroupItemText } from "reactstrap";

export default class EditTopic extends Component {


  constructor(props) {
    super(props);
    this.state = {
      status: true,
      topicId:-1,
      topicame: "",
      description: "",
      totallectures: "",
      duration: "",
      dragDropLectures: [],
      lecturesArray: [],
      topicListShowing: false,
      selectedLectures:null,
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''
      
    };

    this.itemRenderer = this.itemRenderer.bind(this);
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentWillMount(){
    var topic_item= window.localStorage.getItem("topic_item");
    var topics= JSON.parse(window.localStorage.getItem("topic_item"));
    var lecture_list = JSON.parse(window.localStorage.getItem("lecture_list"));

// console.log(topics,'Mr.Robot')
     
this.setState({
  selectedLanguage:this.state.options.find(item=>item.value==topics.language_id)


},()=>console.log(this.state.selectedLanguage,'Mr.Robot'))
    
    if(topic_item){
      if(JSON.parse(topic_item).sample==0){
        let item = JSON.parse(topic_item);
   
        this.setState({
            topicId:item.topic_id,
            topicName:item.topic_name,
            description:item.topic_description,
            selectedLectures:JSON.parse(item.lectures),
            dragDropLectures:JSON.parse(item.lectures),
            lecturesArray:lecture_list,
            sample:false,
  
    
        })
      }
      else{
        let item = JSON.parse(topic_item);
 
        this.setState({
            topicId:item.topic_id,
            topicName:item.topic_name,
            description:item.topic_description,
            selectedLectures:JSON.parse(item.lectures),
            dragDropLectures:JSON.parse(item.lectures),
            lecturesArray:lecture_list,
            sample:true,
        
  
        })
      }
        
       
    }


  
    
  }


  componentWillUnmount(){
      window.localStorage.removeItem("topic_item");
  }



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

    editTopic(){
        this.setState({
        loading:true
        // add_modal:false
        })
        if(this.state.sample==true){
          var sample_content=1
        }
        else{
        

          var sample_content=0
        }
   
          let formData = new FormData()

          formData.append('topic_id',this.state.topicId)
          formData.append('topic_name',this.state.topicName)
          formData.append('topic_description',this.state.description)
          formData.append('sample',sample_content)

          formData.append('lectures',JSON.stringify(this.state.selectedLectures))
          formData.append('language_id',this.state.selectedLanguage.value)
        //  formData.append('answers',JSON.stringify(question.answers))
       //   formData.append('image',this.state.choseImage)


          for (let key of formData.entries()) {
            console.log(key[0] + ',with photo ' + key[1]);
        }

            this.setState({
            response: fetch('http://18.221.47.207:3000/edit_topic', {
            method: 'POST',
            body: formData
            }).then((response) => response.json())
            .then((responseJson)=>{
            console.log(responseJson,'QWERTy')
            swal("Success", "Topic succesfullly edited", "success").then((value)=>{
                this.setState({loading:false},()=>this.props.history.push('/admin/all-topics'))
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
            // var array = [];
            // var i = 0;

            // selectedLectures.forEach(element => {
            //     var topicObject = new Object();
            //     topicObject.value = element.value;
            //     topicObject.label = element.label;
            //     topicObject.sortOrder = i;
            //     array.push(topicObject);
            //     i++;
            // });
           this.setState({dragDropLectures:selectedLectures})
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
         
         value={this.state.topicName}
             type="text"
             id="defaultFormRegisterNameEx"
             className="form-control subject-name-form custom-form"
             onChange={(text)=>this.setState({topicName:text.target.value})}
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

//   renderduration = () => {
//     return (
//       <div className="col-4 w-100 my-2 cost-section">
//         <label
//           htmlFor="defaultFormRegisterNameEx"
//           className="cost-label subject-labels"
//         >
//           Duration :
//         </label>
//         <input
//           autoFocus
//           type="text"
//           id="defaultFormRegisterNameEx"
//           className="form-control subject-name-form custom-form"
//           value={this.state.duration}
//           onChange={(e)=>this.setState({duration:e.target.value})}
//         />
//       </div>
//     );
//   };


  renderLecturesPickySection() {
      return(
        <React.Fragment>
        <button className="show-topics-list-button" onClick={()=>this.setState({topicListShowing:!this.state.topicListShowing})}>Topics List <i className="fa fa-chevron-down" /></button>
        {this.state.topicListShowing?
    (   <div className="topic-list-picky-container">
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
                    <button className="admin-button-style" onClick={()=>this.editTopic()}> Save &amp; Publish</button>

                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Edit Topic</h3> 
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
                <button className="add-subject my-5 float-right mr-4" onClick={()=>this.editTopic()}>Save &amp; Publish</button>
                    

              </Fade>
            </React.Fragment>
          </div>
          </div>
       </div>
    )
  }
}
