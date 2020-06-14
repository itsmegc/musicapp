import React, {Component} from 'react'
import AdminNavbar from '../Navbar/adminNavbar'
import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage'
import MediaComponent from "../MediaComponent/chooseMediaFile";
import './addSubject.css';
import Select from 'react-select';
import {MDBIcon,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader,MDBInput} from 'mdbreact';
import {Picky} from 'react-picky';
import 'react-picky/dist/picky.css';
import swal from 'sweetalert'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';



// const topicsList=[];
// for(var i=1;i<=100;i++){
//     topicsList.push({id:i,name:`Topic ${i}`})
// }

const override = css`
display: block;
margin: 0 auto;
border-color: black;
margin:30% 45%;
`;


class AddSubject extends Component {
    constructor(props){
        super(props);
        this.state={
            loadng:true,
            subjectId:``,
            inputLink: "",
            seoTitle:'',
            seoDescription:'',
            subjectName:"",
            subjectSubtitle:"",
            authors:[{label:'Vikram Mathur',value:'Vikram Mathur',author_id:1},
            {label:'Gaurav',value:'Gaurav',author_id:2},
            {label:'Madhur',value:'Madhur',author_id:3},
            {label:'Param',value:'Param',author_id:4},
            {label:'Shalini',value:'Shalini',author_id:5},
            {label:'Pallavi',value:'Pallavi',author_id:6}],
            classList:[
                { value:'0', label:'Class 6th'},
                { value:'1', label:'Class 7th'},
                { value:'2', label:'Class 8th'},
                { value:'3', label:'Class 9th'},
                { value:'4', label:'Class 10th'},
                { value:'5', label:'Class 11th'},
                { value:'6', label:'Class 12th'},
            ],
            StudentTypes:[
                { value:'0', label:'school'},
                { value:'1', label:'civil-service'},
                {value:'2', label:'humanities'},
                { value:'3', label:'other-service'},
                { value:'4', label:'CCA'}
            ],
            selectedClass:[],
            selectedPromoCodeType:[],
            selectedStudentType:[],
            // 'Vikram Mathur', 'Gaurav', 'Madhur', 'Param', 'Shalini', 'Pallavi'
            selectedAuthors:[],
            subjectCost:``,
            subject_old_cost:``,
            subjectDuration:``,
            testIDs:[],
            selectedTestIDs:[],
            subjectThumbnail:``,
            subjectThumbnailUrl:``,
            subjectDescriptions:[{

                
                id:`1`,
                description:''
            }],
            learningRequirements:[{
                id:`1`,
                requirement:''
            }],
            learningTopics:[{
                id:`1`,
                topic:''
            }],
            exams:[],
            selectedExams:[],
            topicsArray:[],
            selectedTopics:[],
            dragDropTopics:[],
            topicListShowing:false,
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:'',
      testCost:null
        }

        this.itemRenderer = this.itemRenderer.bind(this);
        this.handleRLDDChange = this.handleRLDDChange.bind(this);


    }



    componentWillMount(){
  
       this.setState({loading:true},()=>this.getExams());
  
       
                }

    



    componentDidMount(){
        this.getSubjectList();
        this.getTopics();
        this.getTests()
        this.getDashboard()
    }

    //GETS , POSTS , FORM VALIDATION
getDashboard=()=>{
    this.setState({
        response: fetch("http://18.221.47.207:3000/get_dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "max-age=31536000"
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            // console.log(responseJson)
            // for(var v=0;v<responseJson.length;v++){
            //   responseJson[v].data_type='subject'
            // }
  
            this.setState(
              {
                dashboards: responseJson,
                loading: false
              },
              () => console.log(this.state.dashboards)
            );
          })
          .catch(error => {
            this.setState({
              loading: false
            });
  
            console.log(error);
          })
      });
}

    getTests = async() =>{
        console.log("fetching tests")
        this.setState({
        response: fetch('http://18.221.47.207:3000/get_tests', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },


        }).then((response) => response.json())
        .then((responseJson)=>{
        console.log(responseJson);
        for(var v=0;v<responseJson.length;v++){
            responseJson[v].label = responseJson[v].test_name
            responseJson[v].value = responseJson[v].test_id
        }
        this.setState({
            testIDs:responseJson,
            loading:false
        });


      console.log(this.state) })
         .catch((error) => {
         this.setState({
           loading:true
         })
         alert("Warning!", "Check your network!", "warning");
         console.log(error)
        console.log(error);
            })
        })
    }

    getSubjectList = async ()=> {
        console.log(JSON.parse(window.localStorage.getItem('subject_list')))
        var subject_list = JSON.parse(window.localStorage.getItem('subject_list'));
        let subjectList=[];
        for(var i = 0; i< subject_list.length;i++){
            console.log(this.state.subjectId, "subjectId")
            var subject_object = new Object;
            subject_object.value=subject_list[i].subject_id;
            subject_object.label = subject_list[i].subject_name;
            subjectList.push(subject_object);
        }
        this.setState({
            subjectList:subjectList
        })
    }

    getTopics = async() =>{
        var topic_list = window.localStorage.getItem("topic_list");
        this.setState({
            topicsArray:JSON.parse(topic_list)
        })
    }



    getExams = async() => {
        console.log("fetching exams")
        this.setState({
        response: fetch('http://18.221.47.207:3000/get_exams', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },


        }).then((response) => response.json())
        .then((responseJson)=>{
        console.log(responseJson);
        for(var v=0;v<responseJson.length;v++){
            responseJson[v].label = responseJson[v].exam_name
            responseJson[v].value = responseJson[v].exam_id
        }
        this.setState({
            exams:responseJson,
            loading:false
        });


      console.log(this.state) })
         .catch((error) => {
         this.setState({
           loading:true
         })
         alert("Warning!", "Check your network!", "warning");
         console.log(error)
        console.log(error);
            })
        })
    }

    getSubjectList = async ()=> {
        console.log(JSON.parse(window.localStorage.getItem('subject_list')))
        var subject_list = JSON.parse(window.localStorage.getItem('subject_list'));
        let subjectList=[];
        for(var i = 0; i< subject_list.length;i++){
            console.log(this.state.subjectId, "subjectId")
            var subject_object = new Object;
            subject_object.value=subject_list[i].subject_id;
            subject_object.label = subject_list[i].subject_name;
            subjectList.push(subject_object);
        }
        this.setState({
            subjectList:subjectList
        })
    }




    //ADD FORM

    addSubject(){



            if(this.state.subjectName.length==0){
                swal("Check subject name!", "Please enter valid name", "error");
            }
            else if (isNaN(this.state.subjectCost)) {
                swal("Check cost field!", "Enter valid cost", "error");
                console.log(this.state.subjectCost)
             }
            else if(this.state.subjectSubtitle.length<=2){
                swal("Check subtitle field!", "Must contain more than two characters", "error");
              }
            else if(!this.state.inputLink){
                swal("Check thumbnail field","Please upload a thumbnail for your course!","error");
            }
            else if(!this.state.testCost || this.state.testCost.length==0){
                swal("Check Test ID field","Please select a test for your course!","error");
            }
            else if(!this.state.selectedExams ||  this.state.selectedExams.length==0){
                swal("Check Exams field","Please select related exams for your course!","error");
            }
            else if(!this.state.dragDropTopics || this.state.dragDropTopics.length==0){
                swal("Check Topics","Please select topics for your course!","error");
            }
            // else if(!this.state.selectedSubjectList || this.state.selectedSubjectList.length==0){
            //     swal("Check Related Subjects","Please select subjects related to your course!","error");
            // }

            else if(parseInt(this.state.subject_old_cost) < parseInt(this.state.subjectCost)){
                swal("The discounted cost cannot be more than the original cost!","Please revisit cost section.", "error")
            }
            else if (!this.state.selectedLanguage.value) {
                swal("Select any language", "Please Select any language!", "error");
              } 
              

            else{


                this.setState({
                loading:true
                // add_modal:false
                })
                console.log(this.state.inputLink)


                  let formData = new FormData()
                  formData.append('subject_name',this.state.subjectName)
                  formData.append('sub_title',this.state.subjectSubtitle)
                  formData.append('cost',this.state.subjectCost)
                  formData.append('old_cost',this.state.subject_old_cost)
                  formData.append('duration', this.state.subjectDuration )
                  formData.append('description',JSON.stringify(this.state.subjectDescriptions))
                  formData.append('test_cost',this.state.testCost)
                  formData.append('exams',JSON.stringify(this.state.selectedExams))
                  formData.append('topics',JSON.stringify(this.state.dragDropTopics))
                  formData.append('learning_topic',JSON.stringify(this.state.learningTopics))
                  formData.append('requirements',JSON.stringify(this.state.learningRequirements))
                  formData.append('related_subjects',JSON.stringify(this.state.selectedSubjectList))
                  formData.append('status',1)
                  formData.append('student_type',JSON.stringify(this.state.selectedStudentType));
                  formData.append('class',JSON.stringify(this.state.selectedClass));
                  formData.append('image',this.state.inputLink);
                  formData.append('language_id',this.state.selectedLanguage.value)
                  for (let key of formData.entries()) {
                    console.log(key[0] + ',with photo ' + key[1]);
                }


    
                    this.setState({
                    response: fetch('http://18.221.47.207:3000/add_subject', {
                    method: 'POST',
                    body: formData
                    }).then((response) => response.json())
                    .then((responseJson)=>{
                    console.log(responseJson,'QWERTy')
                    swal("Success", "Subject succesfullly added", "success").then((value)=>{
                    this.props.history.push('/admin/subject-list')
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








    //GET FUNCTIONS


   //REACT PICKY EVENTS
    selectMultipleOption(value){
       this.setState({selectedTopics:value})
    }


    //ITEM RENDERER DRAG DROP
    itemRenderer(item, index) {
        return (
          <div className="item">
            <p className="title">{item.name}</p>
            <button className="delete-subject-topic-button" onClick={()=>this.deleteSubjectTopic(item)}><i className="fas fa-trash"></i></button>
          </div>
        );
      }

   //HANDLE CLICK EVENTS
   addSubjectDescription(){
    let {subjectDescriptions}=this.state
    subjectDescriptions.push({id:`${subjectDescriptions.length+1}`,description:''});
    this.setState({subjectDescriptions})
   }


   removeSubjectDescription(index){
    let {subjectDescriptions}=this.state
    if(subjectDescriptions.length>1){
    subjectDescriptions.splice(index,1);
    }
    for(var i = 0;i<subjectDescriptions.length;i++){
        subjectDescriptions[i].id = i+1;
    }
    this.setState({subjectDescriptions});
   }

   renderStudentsTypeSection(){
    return(
        
        <div className="col-12  d-flex">
        <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
        Categories :
        </label>
        <Select
           closeMenuOnSelect={true}
           onChange={e=>this.setState({selectedStudentType:e})}
           value={this.state.selectedStudentType}
           className='promocode-type select w-25 '
           options={this.state.StudentTypes}
       />
         </div>
    )
}

	
renderClassSelect(){
    return(
        <div className="col-12 my-2 d-flex">
        <label htmlFor="defaultFormRegisterNameEx" className="subject-list-label subject-labels">
             Classes Applicable:
        </label>
        <Select
           closeMenuOnSelect={false}
           onChange={e=>this.setState({selectedClass:e})}
           value={this.state.selectedClass}
           className='promocode-type select'
           options={this.state.classList}
           isMulti
       /> 
       </div>
    )
}



renderConditionalInputPromo(value){
    console.log(value,"conditional value");

        // if(value==0){
        //     return <p className="text-muted  text-center w-100">Applicable to all Products</p>
        // }
        if(value==0){
            return this.renderClassSelect();
        }
        if(value==1){
            return 
        }
        // if(value==3){
        //     return this.renderSubjectSelect();
        // }
        // if(value==4){
        //     return this.renderUserSelect();
        // }
        else{
            return <p className="text-muted  text-center w-100">Please select a Class type!</p>
        }
    }

    
   addLearningRequirement(){
    let {learningRequirements}=this.state
    learningRequirements.push({id:`${learningRequirements.length+1}`,requirement:''});
    this.setState({learningRequirements})
   }

   removeLearningRequirement(index){
    let {learningRequirements}=this.state
    if(learningRequirements.length>1){
        learningRequirements.splice(index,1);
    }
    for(var i = 0;i<learningRequirements.length;i++){
        learningRequirements[i].id = i+1;
    }
    this.setState({learningRequirements});
   }

   addLearningTopic(){
    let {learningTopics}=this.state
    learningTopics.push({id:`${learningTopics.length+1}`,topic:''});
    this.setState({learningTopics})
   }

   removeLearningTopic(index){
    let {learningTopics}=this.state
    if(learningTopics.length>1){
        learningTopics.splice(index,1);
    }
    for(var i = 0;i<learningTopics.length;i++){
        learningTopics[i].id = i+1;
    }
    this.setState({learningTopics});
   }


   addSubjectTopics(selectedTopicsArray){
    if(selectedTopicsArray.length==0){
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
        text:`You are adding ${selectedTopicsArray.length} topics to this course`,
        icon: "info",
        buttons: true,
        dangerMode: false,
      })
      .then((willAdd) => {
        if (willAdd) {
            var array = [];
            var i = 0;

            selectedTopicsArray.forEach(element => {
                var topicObject = new Object();
                topicObject.id = element.topic_id;
                topicObject.topic_id=element.topic_id;
                topicObject.name = element.topic_name;
                topicObject.topic_name = element.topic_name;
                topicObject.sortOrder = i;
                array.push(topicObject);
                i++;
            });
           this.setState({dragDropTopics:array})
      } else {

      }
    });
   }
}



   deleteSubjectTopic(item){
    let {dragDropTopics} = this.state;
    var newTopicList = dragDropTopics.filter(Listitem=>Listitem.id!=item.id);
    var i = 0;
    newTopicList.forEach(element => {
        element.sortOrder = i;
        i++;
    });
    this.setState({dragDropTopics:newTopicList,
                   selectedTopics:newTopicList
                });
   }





    //HANDLE CHANGE FUNCTIONS

    handleSubjectNameChange=(text)=> {
        console.log("Subject Name:",text.target.value,)
        this.setState({subjectName:text.target.value})
        }

    handleSubjectSubtitleChange=(text)=> {
        console.log("Subject Subtitle:",text.target.value)
        this.setState({subjectSubtitle:text.target.value})
        }

    handleCostChange=(cost)=> {
        console.log("Subject Cost",cost.target.value)
        this.setState({subjectCost:cost.target.value})
        }
        handle_old_CostChange=(cost)=> {
        console.log("Old Cost",cost.target.value)
        this.setState({subject_old_cost:cost.target.value})
        }
    handleDurationChange=(duration)=> {
        console.log("Course duration:",duration.target.value);
        this.setState({subjectDuration:duration.target.value})
        }

    handleTestIdChange=(testid)=>{
        console.log("Test ID:",testid.target.value);
        this.setState({testID:testid.target.value})
    }

    handleSubjectDescription(item,index){
        console.log(item.target.value);
        let subjectDescriptions = this.state.subjectDescriptions;
        let descriptionObject = subjectDescriptions[index];
        descriptionObject.description = item.target.value;
        this.setState({subjectDescriptions});
        console.log(this.state.subjectDescriptions)
    }

    handleLearningRequirement(item,index){
        console.log(item.target.value);
        let {learningRequirements} = this.state;
        let requirementObject = learningRequirements[index];
        requirementObject.requirement = item.target.value;
        this.setState({learningRequirements});
        console.log(this.state.learningRequirements)
    }

    handleLearningTopic(item,index){
        console.log(item.target.value);
        let {learningTopics} = this.state;
        let topicObject = learningTopics[index];
        topicObject.topic = item.target.value;
        this.setState({learningTopics});
        console.log(this.state.learningTopics)
    }

    handleRLDDChange(reorderedItems) {
        this.setState({ dragDropTopics: reorderedItems });
    }

      
    handleOldCostChange=(cost)=> {
        this.setState({subject_old_cost:cost.target.value})
    }



    //RENDER FUNCTIONS
    renderSubjectNameSection(){
        return(
            <div className="col-12  subject-name-section d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-name-label subject-labels">
                      Name:
                 </label>
                 <input
                    
                    value={this.state.subjectName}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-name-form custom-form"
                        onChange={(text)=>this.handleSubjectNameChange(text)}
                    />
            </div>
        )
    }

    renderSubjectSubtitleSection(){
        return(
            <div className="col-12  subtitle-section d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="subject-subtitle-label subject-labels">
                      Subtitle:
                 </label>
                 <input
                    
                    value={this.state.subjectSubtitle}
                        type="text"
                        id="defaultFormRegisterNameEx"
                        className="form-control subject-subtitle-form custom-form"
                        onChange={(text)=>this.handleSubjectSubtitleChange(text)}
                    />
            </div>
        )
    }

  
    renderCostSection(){
        return(
                 <div className="col-12  d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
                      Discounted Cost:
                 </label>
                 <input
                
                    value={this.state.subjectCost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form w-25"
                        onChange={(cost)=>this.handleCostChange(cost)}
                    />
                  </div>
        )
    }


    oldCostSection(){
        return(
                 <div className="col-4 my-2 cost-section">
                 <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
                      Original Cost :
                 </label>
                 <input
                    
                    value={this.state.subject_old_cost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form"
                        onChange={(cost)=>this.handle_old_CostChange(cost)}
                    />
                  </div>
        )
    }

    
    renderCourseDurationSection(){
        return(
            <div className="col-12  d-flex">
            <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
                 Duration (in minutes):-
            </label>
            <input
               
               value={this.state.subjectDuration}
                   type="text"
                   id="defaultFormRegisterNameEx"
                   className="form-control duration-form custom-form"
                   onChange={(duration)=>this.handleDurationChange(duration)}
               />
             </div>
     )
    }



    renderTestIdSection(){
        return(
            <div className="col-12  test-id-section d-flex align-items-center">
            <label htmlFor="defaultFormRegisterNameEx" className="test-id-label subject-labels">
                 Test Cost :
            </label>
            {/* <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={e=>this.setState({selectedTestIDs:e})}
                    value={this.state.selectedTestIDs}
                    className='select-testid select '
                    options={this.state.testIDs}

                /> */}
                      <input
                        value={this.state.testCost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form w-25"
                        onChange={(cost)=>this.setState({testCost:cost.target.value})}
                    />

             </div>
     )
    }



    renderCourseThumbSection(){

           if(!this.state.subjectThumbnail){
                return(
                <div className="col-12 d-flex align-items-center subject-thumbnail-container">
                <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels">
                 Subject Thumbnail: <br /> <span className="text-right text-muted ml-auto"> <i>(275 x 180 pixels)</i></span>
                </label>
                <input
                    type="file"
                    className="thumbnail-file-input d-block"
                    accept="image/*"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(event)=>this.setState({subjectThumbnail:event.target.files[0],subjectThumbnailUrl:(URL.createObjectURL(event.target.files[0]))})}

                />

                </div>)
            }
            


          else{
              return(
                <div className='col-12 d-flex align-items-center subject-thumbnail-container'>
                    <label htmlFor="defaultFormRegisterNameEx" className="image-label subject-labels h-100">
                        Subject Thumbnail: <br /> <span className="text-right text-muted ml-auto"> <i>(275 x 180 pixels)</i></span>
                    </label>
                    <div className="position-relative">
                       <img src={this.state.subjectThumbnailUrl} style={{margin:'10px 0px',width:"300px"}}/>
                     <MDBIcon style={{position: "absolute",
    top: "20px",right: "-5px", cursor:"pointer"}} className='cross_icon' onClick={()=>this.setState({subjectThumbnail:null, subjectThumbnailUrl:null})} icon="times-circle" / >
                     </div>
                  </div>
                  )
          }
    }
    
    renderSubjectDescriptions(){
        return (this.state.subjectDescriptions.map((item,index)=>{
          return ( <React.Fragment key={item.id}>
                      <div className="d-flex align-items-start mt-3">
                   <label  className="p-1" > {index+1}.&nbsp; </label>
                   <div className="position-relative w-100 mr-4">
                   <textarea
                   label="subject-description"
                   className="subject-description-textarea w-100"
                   type="text"
                   onChange={(text)=>this.handleSubjectDescription(text,index)}
                     />
                      <MDBIcon className='cross_icon' onClick={()=>this.removeSubjectDescription(index)} icon="times-circle" />
                    </div>
                    </div>
                    <div className="w-100" />
                    </React.Fragment>
                )
                    })
        )
    }


    renderLearningRequirements(){
        return (this.state.learningRequirements.map((item,index)=>{
          return ( <React.Fragment key={item.id}>
                   <div className="d-flex align-items-start mt-3">
                   <label  className="p-1" > {index+1}.&nbsp; </label>
                   <div className="position-relative w-100 mr-4">
                   <textarea
                   label="learning-requirement-label"
                   className="subject-description-textarea w-100"
                   type="text"
                   onChange={(text)=>this.handleLearningRequirement(text,index)}
                     />
                      <MDBIcon className='cross_icon' onClick={()=>this.removeLearningRequirement(index)} icon="times-circle" />
                    </div>
                    </div>
                    <div className="w-100" />
                    </React.Fragment>
                )
                    })
        )
    }


    renderLearningTopics(){
        return (this.state.learningTopics.map((item,index)=>{
            return ( <React.Fragment key={item.id}>
                   <div className="d-flex align-items-start mt-3">
                   <label className="p-1"> {index+1}.&nbsp; </label>
                   <div className="position-relative w-100 mr-4">
                     <textarea
                     label="learning-topic-label"
                     className="subject-description-textarea w-100"
                     type="text"
                     onChange={(text)=>this.handleLearningTopic(text,index)}
                       />
                        <MDBIcon className='cross_icon' onClick={()=>this.removeLearningTopic(index)} icon="times-circle" />
                      </div>
                      </div>
                      <div className="w-100" />
                      </React.Fragment>
                  )
                      })
          )
    }

    renderSubjectDescriptionContainer(){
        return(
            <React.Fragment>
       <div className="col-12 subject-description-container  d-flex align-items-center">
       <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                        Subject Description(s):
          </label>
          <div className="descriptions-container">
          {this.renderSubjectDescriptions()}
          <button className="admin-button-style ml-30px float-right mr-4 mb-3" onClick={()=>this.addSubjectDescription()}>Add para</button>
          </div>
        </div>
        </React.Fragment>)
    }


    renderLearningRequirementsContainer(){
        return(
            <React.Fragment>
         <div className="col-12 subject-descriptions-container d-flex align-items-center">
         <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                        Learning Requirement(s):
          </label>
          <div className="descriptions-container">
        {this.renderLearningRequirements()}
        <button className="admin-button-style ml-30px float-right mr-4 mb-3" onClick={()=>this.addLearningRequirement()}>Add para</button>
        </div>
        </div>
        </React.Fragment>)
    }

    renderLearningTopicsContainer(){
        return(
            <React.Fragment>
            <div className="col-12 subject-description-container  d-flex align-items-center">
            <label htmlFor="defaultFormRegisterNameEx" className="subject-labels h-100">
                        Learning Topic(s):
          </label>
          <div className="descriptions-container">
        {this.renderLearningTopics()}
        <button className="admin-button-style ml-30px float-right mr-4 mb-3" onClick={()=>this.addLearningTopic()}>Add para</button>
        </div>
        </div>
        </React.Fragment>
)
    }


    renderExamSection(){
        return(
            <div className="col-12 exam-section">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels pl-0">
                 Related Exams:
            </label>
            <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={e=>this.setState({selectedExams:e})}
                    value={this.state.selectedExams}
                    className='select-exam select'
                    options={this.state.exams}

                />
             </div>
     )
    }

    renderTopicListSection(){
        return(
        <React.Fragment>
        <button className="show-topics-list-button" onClick={()=>this.setState({topicListShowing:!this.state.topicListShowing})}>Topics List <i className="fa fa-chevron-down" /></button>
        {this.state.topicListShowing?
    (   <div className="topic-list-picky-container">
        <Picky
         value={this.state.selectedTopics}
         options={this.state.topicsArray}
         onChange={(value)=>this.selectMultipleOption(value)}
         open={true}
         valueKey="topic_id"
         labelKey="topic_name"
         multiple={true}
         includeSelectAll={true}
         includeFilter={true}
         dropdownHeight={350}
         keepOpen={true}
         placeholder="Topics"
           />
           <div>
           <button className="w-50 float-right admin-button-style" onClick={()=>this.addSubjectTopics(this.state.selectedTopics)}>
                Save Topics
            </button>
        </div>
        </div>)
        :
        ""}
        </React.Fragment>
        )
    }


    renderTopicStructureSection(){
        if (this.state.dragDropTopics.length!=0)
        return(

                <RLDD
                cssClasses="drag-drop-topic-list"
                items={this.state.dragDropTopics}
                itemRenderer={this.itemRenderer}
                onChange={this.handleRLDDChange}
                />
        )
        else{
            return <p className="text-center text-muted">There are no topics currently selected for this course!</p>
                }
    }

    renderSubjectTopicsSection(){
        return(
            <React.Fragment>
            <div className="col-12 subject-topics-container">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels py-3">
                Add Topics:
            </label> 
            <div className="row mx-0 bg-white">
            <div className="col-3 topic-list-column px-0">
                {this.renderTopicListSection()}
            </div>

            <div className="col-9 topic-structure-column">
            <label htmlFor="defaultFormRegisterNameEx" className="exam-label subject-labels text-center w-100">
                 Topics Order:
            </label>
                 <hr />
                 {this.renderTopicStructureSection()}
            </div>

            </div>
            </div>
            </React.Fragment>
        )
    }



    renderRelatedSubjectsSection(){
        return (
            <React.Fragment>
               <div className="col-12 related-subjects-container my-2">
                <label htmlFor="defaultFormRegisterNameEx" className="related-subjects-label subject-labels pl-0">
                 Related Subjects:
                </label>
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={e=>this.setState({selectedSubjectList:e},()=>console.log(this.state.selectedSubjectList))}
                    value={this.state.selectedSubjectList}
                    className='select-exam select'
                    options={this.state.subjectList}

                />
                </div>
            </React.Fragment>
        )
    }
  handlechangeurl = text => this.setState({ inputLink: text.target.value });
renderChooseImage = () => {
    return (
      <div className="col-12  d-flex">
      <label htmlFor="defaultFormRegisterNameEx" className="course-duration-label subject-labels">
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

    renderDiscountedSection(){
        return(
                 <div className="col-12  d-flex">
                 <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
                      Original Cost:
                 </label>
                 <input
                
                    value={this.state.subject_old_cost}
                        type="number"
                        id="defaultFormRegisterNameEx"
                        className="form-control cost-form custom-form w-25"
                        onChange={(cost)=>this.handleOldCostChange(cost)}
                    />
                  </div>
        )
    }
    renderSEO(){
        return (
         <div className="col-12  ">
             <h4 className="cost-label subject-labels" style={{fontWeight:'Bold'}}>SEO</h4>
        <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
              Page Title:
         </label>
         <br/>
         <input
        
            value={this.state.subject_old_cost}
                type="number"
                id="defaultFormRegisterNameEx"
                className="form-control cost-form custom-form w-60"
                onChange={(cost)=>this.handleSeoTitle(cost)}
            />
            <br/>
            <label htmlFor="defaultFormRegisterNameEx" className="cost-label subject-labels">
              Page Description:
         </label>
         <br/>
         <textarea
                   label="subject-description"
                   className="subject-description-textarea w-20"
                   type="text"
                   onChange={(text)=>this.handleSeoDescription(text)}
                     />
          </div>
        )
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
  
  </div>
);
}






    render(){
        console.log(this.state)
        return(
            <div id="add-subject-page">
            <AdminNavbar {...this.props} />

            <div className="d-flex">
              <SidebarPage {...this.props} active={3}/>

              <div className="add-subject-column">
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

                    <div className="row my-3 px-4">
                    <div className="col-12 top_button_bar d-flex align-items-center ">
                    <button className="admin-button-style  admin-button-style-margin" onClick={()=>this.props.history.push('/admin/subject-list')}>
                        All Subjects
                    </button>
                    <MediaComponent onSelectMediaItem={this.handleMediaChooseImage} buttonName={<MDBIcon icon="camera" /> } restriction= 'image/*' /> 
                    <button className="admin-button-style ml-auto" onClick={()=>this.addSubject()}> Save &amp; Publish</button>

                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Subject</h3> 
                    {this.renderSelect()}
                    </div>
                    </div>
                <div className="d-flex">
                <div className="subject-content-container ml-4">
                <div className="row px-0 mx-0">
                {this.renderStudentsTypeSection()}
                       
                       {this.renderConditionalInputPromo(this.state.selectedStudentType.value)}
                    {this.renderSubjectNameSection()}
                    {this.renderSubjectSubtitleSection()}
                    {/* <hr /> */}
                    {this.renderCostSection()}
                    {this.renderDiscountedSection()}
                    {this.renderTestIdSection()}
                    {this.renderCourseDurationSection()}
                    {/* <hr /> */}
                   
                    {/* <hr /> */}
                    {/* {this.renderCourseThumbSection()} */}
                    {this.renderChooseImage()}
                    {/* <hr /> */}
                    {this.renderSubjectDescriptionContainer()}
                    {/* <hr /> */}
                    {this.renderLearningRequirementsContainer()}
                    {/* <hr /> */}
                    {this.renderLearningTopicsContainer()}
                </div>
                </div>
                <div className="subject-select-fields-container ml-2 row align-self-start flex-column mr-4">
                {this.renderExamSection()}
                {this.renderRelatedSubjectsSection()}
                </div>
                </div>

                <div className="subject-topics-container mx-4 mt-4">
                    <div className="row p-0 mx-0">
                    {this.renderSubjectTopicsSection()}
                    </div>
                    {/* <hr /> */}
                </div>

                <hr />

                    <button className="add-subject my-5 float-right mr-4" onClick={()=>this.addSubject()}>Save &amp; Publish</button>
                    
                    
                    </React.Fragment>
                   )
                }
              </div>


            </div>
        </div>
        )
    }
}


export default AddSubject;