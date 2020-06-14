// import React from 'react'
// import SidebarPage from '../../../Components/Admin/Sidebar/sidebarPage';
// import AdminNavbar from '../Navbar/adminNavbar'
// import {MDBTable,MDBTableBody, MDBContainer, MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter, MDBTableHead } from "mdbreact";
// import { css } from '@emotion/core';
// import GridLoader from 'react-spinners/GridLoader'; 
// import './orderPage.css';
// import {FormGroup,Input,Label} from 'reactstrap';
// import { Button } from 'react-bootstrap';


// const override = css`
// display: block;
// margin: 0 auto;
// border-color: black;
// margin:20% 45%;
// `;


// class OrderPage extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             loading:true,
//             order_data:[],
//             showModal:false,
//             modalData:null
//         }
//     }


//     componentWillMount(){
//      this.getOrders()
//     }

//     //GET FUNCTION
//     getOrders = async() => {
//         console.log("fetching orders")
//          this.setState({
//           loading:true
//       })
//        this.setState({
//       response: fetch('http://18.221.47.207:3000/get_orders', {
//        method: 'GET',
//        headers: {
        
//          'Content-Type': 'application/x-www-form-urlencoded',
       
//       },
      
      
       
//       }).then((response) => response.json())
//       .then((responseJson)=>{
//         console.log(responseJson,'orders')
 
//      this.setState({
//        order_data:responseJson,

     
//        loading:false
//      })
//       }
      
//       )
//        .catch((error) => {
//       this.setState({
//         loading:false
//       })
//       alert("Warning!", "Check your network!", "warning");
//       console.log(error)
//         })
//        })
//     }



//     componentDidMount(){
//         window.localStorage.removeItem('subject_item');
//     }


//     //TIMESTAMP FUNCTION
//     commentdate(timestamp){ 
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//         "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"
//       ];
//         var dt = new Date(timestamp);
//         var dd = dt.getDate(); 
//         var mm = (dt.getMonth()+1); 
//         if (dd < 10) { 
//             dd = '0' + dd; 
//         } 
//         if (mm < 10) { 
//             mm = '0' + mm; 
//         } 
//        return (  dd +"/"+mm+ "/" +(dt.getFullYear()).toString());
//       }
    
//     //CLICK HANDLERS
//     handleOptionChange = (index) => {
//         let {subjects}=this.state
//         var subject=subjects[index];
//         subject.status==1?subject.status=0:subject.status=1;
//         this.setState({subjects});
//     }

//     handleEditSubject(item){
//         window.localStorage.setItem('subject_item', JSON.stringify(item))
//         this.props.history.push('/admin/edit-subject');
//     }


//     initiateRefund(data){
        
//     let details = {
//         order_id:data.order_id,
//         payment_id:data.payment_id
//        };
       
//        console.log(details,'initiating refund')
//        let formBody = [];
//        for (let property in details) {
//         let encodedKey = encodeURIComponent(property);
//         let encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//        }
//        formBody = formBody.join("&");
    
//     this.setState({
//     response: fetch('http://18.221.47.207:3000/refund', {
//     method: 'POST',
//     headers: {
     
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Cache-Control': 'max-age=31536000'
//     },
//     body:formBody
    
    
    
//     }).then((response) => response.json())
//     .then((responseJson)=>{
//         window.location.reload();
//         console.log(responseJson,'refund')
      
//    this.setState({
//     cart:responseJson,
//     loading:false
    
//    })
              
              
              
              
//               }
    
//     )
//     .catch((error) => {
//     this.setState({
//      loading:false
//     })
   
//     console.log(error)
//      })
//    })
//     }

//     toggle(){
//         this.setState({showModal:false})
//     }

//     toggleData(item){
//         this.setState({showModal:true,
//                        modalData:item})
//                        console.log(this.state.modalData)
//     }


//     renderRefundStatus(data){
//         if(data.refund==0){
// return <div className="col-12 refund-column text-center">
// <button 
// style={{
//     backgroundColor: '#c01825',
//     border: '1px solid #c01825',
//     color: '#fff',
//   padding:'10px',
//     fontSize: '16px'


// }}

// onClick={()=>this.initiateRefund(data)}>Initiate Refund</button>
// </div>
//         }
//         else{
//             return <div className="col-12 refund-column text-center">
//                   <p>Order refunded</p>
//              </div>
//         }
//     }

//     renderOrderdetailsModal(modalData){
//         if(modalData!=null)
//         return (
//                   <MDBContainer>
//                     {/* <MDBBtn onClick={()=>this.toggle()}>Modal</MDBBtn> */}
//                     <MDBModal size="lg" isOpen={this.state.showModal} toggle={()=>this.toggle()}>
//                         <MDBModalHeader toggle={()=>this.toggle()}>Order Details</MDBModalHeader>
//                         <MDBModalBody>
//                             <div className="order-details-modal-body">
                                  
//                             <div className="row my-3">
//                                 <div className="col-6 px-5 text-left">
//                                     Name:  {modalData.name}
//                                 </div>
//                                 <div className="col-6 text-left">
                                  
//                                 </div>
//                                 <div className="w-100" />
//                                 <div className="col-6 px-5 text-left">
//                                     Phone:  {modalData.phone}
//                                 </div>
//                                 <div className="col-6 text-left">
                                  
//                                 </div>
//                             </div>
//                             <div className="product-order-details-container">
//                                 <div className="row">
//                                         <div className="col-12 package-name-column">
//                                             Package Name <br />
//                                             {JSON.parse(modalData.items)[0].subject_name}
//                                         </div>
//                                         <hr />
//                                         <div className="col-12 purchase-date-amount-column">
//                                           <span>  Purchase Date: <br /> {this.commentdate(JSON.parse(modalData.items)[0].creation_time)}</span>
//                                           <span>  Purchase Amount: <br />&#8377; {modalData.amount}</span>
//                                         </div>
//                                         <hr />
//                                         <div className="col-12 status-column">
//                                           <span> Status: {modalData.status==0?(<span style={{color:'red'}}>Expired</span>)
//                                           :
//                                           <span style={{color:'green'}}>Active</span>}</span>
//                                         </div>
//                                         <hr />
//                                         <div className="col-12 transaction-column">
//                                             <span>Mode of transaction: UPI </span>
//                                             <span>Transaction ID: {modalData.payment_id}</span>
//                                         </div>
//                                         <hr />
//                                         {
//                                             this.renderRefundStatus(modalData)
//                                         }
//                                 </div>
//                             </div>

//                             </div>
//                         </MDBModalBody>
//                         <MDBModalFooter>
//                         {/* <MDBBtn color='#c01825' onClick={()=>this.toggle()}>Close</MDBBtn> */}
//                         </MDBModalFooter>
//                     </MDBModal>
//                     </MDBContainer>

//         )
//     }

//     //RENDER 

//     renderActiveStatus(item,index){
//         if(item.status===1){
//             return(
//                 <FormGroup style={{display:'flex'}}>
//              <Label for="exampleEmail" className="grey-text" style={{color:'#008EC2'}}>Active</Label>
//               {/* <Input value={item.status} onClick={()=>this.handleOptionChange(index)} checked={item.status==1 ? true:false}             label='Active'
//               type="radio" /> */}
//             </FormGroup>
//             )
//         }
//         else if(item.status===0){
//             return (  
//            <div>
            
//             <FormGroup style={{display:'flex'}}>
//               <Label for="exampleEmail" className="grey-text" style={{color:'red'}}>Expired</Label>
//               {/* <Input value={item.status} onClick={()=>this.handleOptionChange(index)} checked={item.status==0 ? true :false} label='Inactive'
//               type="radio" /> */}
//             </FormGroup>
//             </div>
        
       
//         )
//         }
//     }    

//     renderOrderTableContent(){
//         return this.state.order_data.map((item,index)=>{
//             return(
//             <tr key={index}>
//                <td>{item.name}
//                  <button className="order-details-button" onClick={()=>this.toggleData(item)}>Details</button>
//                     {/* <button onClick={()=>this.handleEditSubject(item)}>Edit</button> */}
//                 </td>
//                 <td>{item.phone}</td>
//                 <td>{item.amount} &#8377;</td>
//                <td>{this.commentdate(item.ts)}</td>
//                <td>{this.renderActiveStatus(item,index)}</td>
//             </tr>
//             )
//         })
//     }


//     renderOrdersTable(){
//         return(
//             <MDBTable  striped className="pages_table" style={{backgroundColor:'#F9F9F9'}}>
//                 <MDBTableHead>
//                    <tr style={{backgroundColor:'white'}}>
//                       {/* <th><input type="checkbox" onClick={(event)=> this.setState({all_selected:!this.state.all_selected},()=>this.handleAllChecked(event))   }  checked={this.state.all_selected}  value="checkedall" /></th> */}

//                        <th className="" >Name</th>
//                        <th>Phone</th>
//                         <th>Amount</th>
//                        <th>Date created</th>
//                       <th>Order Status</th>
//                      </tr>
//                 </MDBTableHead>
//                 <MDBTableBody>
//                  {this.renderOrderTableContent()}
//                 </MDBTableBody>
//             </MDBTable>
//         )
//     }

//     render(){
//         console.log(this.state);
//         return(
//             <div id="order-list-page">

//                 <AdminNavbar {...this.props} />

//                 <div className="d-flex">

//                 <SidebarPage {...this.props} active={4} />

//                 <div className="order-list-column">
//                     {this.state.loading?
//                        (
//                         <div className='sweet-loading'>
//                         <GridLoader
//             css={override}
//             sizeUnit={"px"}
//             size={5}
//             color={"#c01825"}
//             loading={this.state.loading}
//           />
//                         </div>
//                         )
//                         :
//                         (   
//                             <React.Fragment>
//                             <h1 className="px-5 my-3">  Orders </h1>
//                             {/* <div className="row mx-0">
//                                 <Button className="float-right ml-auto mr-5" onClick={()=> this.props.history.push('/admin/add-subject')}>Add New Subject</Button>
//                             </div> */}
//                             {this.renderOrdersTable()}
//                             </React.Fragment>
//                         )
//                     }

//                 </div>
//                 </div>
//                 {this.renderOrderdetailsModal(this.state.modalData)}
//             </div>
            
//         )
    

//         }
// }



// export default OrderPage;




import React from "react";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
import AdminNavbar from "../Navbar/adminNavbar";
import {
  MDBTable,
  MDBTableBody,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBTableHead
} from "mdbreact";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import "./orderPage.css";
import { FormGroup, Label } from "reactstrap";
import RangePicker from "react-range-picker";
import "../TopicTests/test.css";
import swal from "sweetalert";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 20% 45%;
`;

class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order_data: [],
      showModal: false,
      modalData: null,
      toggle:false,
      start_date: null,
      end_date: null,
      showToggle: true
    };
  }

  componentWillMount() {
    this.getOrders();
  }

  //GET FUNCTION
  getOrders = async () => {
    console.log("fetching orders");
    this.setState({
      loading: true
    });
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "orders");

          var selected_orders = responseJson.filter(item => {
            var today = new Date();
            var order_date = new Date(item.ts);
            if (today.getTime() - order_date.getTime() < 269200000) return item;
          });

          this.setState({
            order_data: responseJson,
            selected_orders,
            loading: false
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

  componentDidMount() {
    window.localStorage.removeItem("subject_item");
  }

  //TIMESTAMP FUNCTION
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

  //CLICK HANDLERS
  handleOptionChange = index => {
    let { subjects } = this.state;
    var subject = subjects[index];
    subject.status == 1 ? (subject.status = 0) : (subject.status = 1);
    this.setState({ subjects });
  };

  handleEditSubject(item) {
    window.localStorage.setItem("subject_item", JSON.stringify(item));
    this.props.history.push("/admin/edit-subject");
  }

  initiateRefund(data) {
    let details = {
      order_id: data.order_id,
      payment_id: data.payment_id
    };

    console.log(details, "initiating refund");
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/refund", {
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
          console.log(responseJson, "refund");

          this.setState({
            cart: responseJson,
            loading: false
          });
        })
        .catch(error => {
          this.setState({
            loading: false
          });

          console.log(error);
        })
    });
  }

  toggle() {
    this.setState({ showModal: false });
  }

  toggleData(item) {
    this.setState({ showModal: true, modalData: item });
    console.log(this.state.modalData);
  }

  renderRefundStatus(data) {
    if (data.refund == 0) {
      return (
        <div className="col-12 refund-column text-center">
          <MDBBtn
            color="danger"
            size="md"
            onClick={() => this.initiateRefund(data)}
          >
            Initiate Refund
          </MDBBtn>
        </div>
      );
    } else {
      return (
        <div className="col-12 refund-column text-center">
          <p>Order refunded</p>
        </div>
      );
    }
  }

  handleViewAll() {
    var selected_orders = this.state.order_data.filter(item => {
      var today = new Date();
      var order_date = new Date(item.ts);
      if (today.getTime() - order_date.getTime() < 269200000) return item;
    });
    this.setState({ selected_orders: this.state.order_data, showToggle: true });
  }

  renderOrderdetailsModal(modalData) {
    if (modalData != null)
      return (
        <MDBContainer>
          <MDBBtn onClick={() => this.toggle()}>Modal</MDBBtn>
          <MDBModal
            size="lg"
            isOpen={this.state.showModal}
            toggle={() => this.toggle()}
          >
            <MDBModalHeader toggle={() => this.toggle()}>
              Order Details
            </MDBModalHeader>
            <MDBModalBody>
              <div className="order-details-modal-body">
                <div className="row my-3">
                  <div className="col-6 px-5 text-left">
                    Name: {modalData.name}
                  </div>
                  <div className="col-6 text-left"></div>
                  <div className="w-100" />
                  <div className="col-6 px-5 text-left">
                    Phone: {modalData.phone}
                  </div>
                  <div className="col-6 text-left"></div>
                </div>
                <div className="product-order-details-container">
                  <div className="row">
                    <div className="col-12 package-name-column">
                      Package Name <br />
                      {JSON.parse(modalData.items)[0].subject_name}
                    </div>
                    <hr />
                    <div className="col-12 purchase-date-amount-column">
                      <span>
                        {" "}
                        Purchase Date: <br />{" "}
                        {this.commentdate(
                          JSON.parse(modalData.items)[0].creation_time
                        )}
                      </span>
                      <span>
                        {" "}
                        Purchase Amount: <br />
                        &#8377; {modalData.amount}
                      </span>
                    </div>
                    <hr />
                    <div className="col-12 status-column">
                      <span>
                        {" "}
                        Status:{" "}
                        {modalData.status == 0 ? (
                          <span style={{ color: "red" }}>Expired</span>
                        ) : (
                          <span style={{ color: "green" }}>Active</span>
                        )}
                      </span>
                    </div>
                    <hr />
                    <div className="col-12 transaction-column">
                      <span>Mode of transaction: UPI </span>
                      <span>Transaction ID: {modalData.payment_id}</span>
                    </div>
                    <hr />
                    {this.renderRefundStatus(modalData)}
                  </div>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => this.toggle()}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      );
  }

  //RENDER

  renderActiveStatus(item, index) {
    if (item.status === 1) {
      return (
        <FormGroup style={{ display: "flex" }}>
          <Label
            for="exampleEmail"
            className="grey-text"
            style={{ color: "#008EC2" }}
          >
            Active
          </Label>
          {/* <Input value={item.status} onClick={()=>this.handleOptionChange(index)} checked={item.status==1 ? true:false}             label='Active'
              type="radio" /> */}
        </FormGroup>
      );
    } else if (item.status === 0) {
      return (
        <div>
          <FormGroup style={{ display: "flex" }}>
            <Label
              for="exampleEmail"
              className="grey-text"
              style={{ color: "red" }}
            >
              Expired
            </Label>
            {/* <Input value={item.status} onClick={()=>this.handleOptionChange(index)} checked={item.status==0 ? true :false} label='Inactive'
              type="radio" /> */}
          </FormGroup>
        </div>
      );
    }
  }

  renderOrderTableContent() {
    return this.state.selected_orders.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            {item.name}
            <a
              className="order-details-button"
              href={item.invoice_pdf}
              target="_blank"
            >
              {" "}
              Details
            </a>{" "}
            {/* <button onClick={()=>this.handleEditSubject(item)}>Edit</button> */}
            {/* <a className="order-details-button" href={} target="_blank" > Click here to generate report</a>                    <button onClick={()=>this.handleEditSubject(item)}>Edit</button> */}
          </td>
          <td>{item.phone}</td>
          <td>{item.amount} &#8377;</td>
          <td>{item.GSTIN}</td>
          <td>{this.commentdate(item.ts)}</td>
          <td>{this.renderActiveStatus(item, index)}</td>
        </tr>
      );
    });
  }

  renderOrdersTable() {
    return (
      <MDBTable
        striped
        className="pages_table"
        style={{ backgroundColor: "#F9F9F9" }}
      >
        <MDBTableHead>
          <tr style={{ backgroundColor: "white" }}>
            {/* <th><input type="checkbox" onClick={(event)=> this.setState({all_selected:!this.state.all_selected},()=>this.handleAllChecked(event))   }  checked={this.state.all_selected}  value="checkedall" /></th> */}

            <th className="">Name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>GSTIN Number</th>
            <th>Date created</th>
            <th>Order Status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{this.renderOrderTableContent()}</MDBTableBody>
      </MDBTable>
    );
  }

  handleDateSelect(start, end) {
    this.setState({ start_date: start, end_date: end });
  }

  handleOnClose() {
    let startDate = new Date(this.state.start_date);
    //  console.log(startDate.getTime())
    let endDate = new Date(this.state.end_date);
    let selected_orders = this.state.order_data.filter(item => {
      let order_date = new Date(item.ts);
      if (
        order_date.getTime() >= startDate.getTime() - 86400000 &&
        order_date.getTime() <= endDate.getTime() + 86400000
      ) {
        return item;
      }
    });
    this.setState({ selected_orders, showToggle: false });
  }
renderModal(){
  if(this.state.toggle==true)  
  return <div className="report"><a href="http://18.221.47.207:3000/report" onClick={(e)=>this.handleReportDownload(e)}><span className="content">Click here to download report.</span></a></div>
}


handleReportDownload(e){
  this.setState({toggle:false, loading:false})
}


  generateReport = () => {

    if(this.state.start_date == null || this.state.end_date == null){
      swal("Select date range", "", "info")
    }
    else{
    let start_date = (new Date(this.state.start_date)).toLocaleDateString()
    start_date = start_date.split("/").reverse()
    var temp = start_date[1];
    start_date[1] = start_date[2]
    start_date[2] = temp;
    start_date = start_date.join('-')
    console.log(start_date)

    let end_date = (new Date(this.state.end_date)).toLocaleDateString()
    end_date = end_date.split("/").reverse()
    var temp = end_date[1];
    end_date[1] = end_date[2]
    end_date[2] = temp;
    end_date = end_date.join('-')
    console.log(end_date)


    let details = {
      start_date,
      end_date
    };

    console.log(details);
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    this.setState({
      loading:true,
      response: fetch("http://18.221.47.207:3000/get_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, "orders");
         this.setState({toggle:true})        
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
  }

  render() {

    console.log(this.state);

    return (
      <div id="order-list-page">
      {this.renderModal()}

        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} active={4} />

          <div className="order-list-column">
            {this.state.loading ? (
              <div className="sweet-loading">
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={5}
                  color={"#2fb2eb"}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <React.Fragment>
                <div className="row align-items-center justify-content-between mx-0 pr-5">
                  <h2 className="pl-2 my-3 mr-3">
                    {" "}
                    Orders{" "}
                    <span
                      className="add_new_button viewallOrder"
                      style={{ fontSize: "18px" }}
                      onClick={() => this.handleViewAll()}
                    >
                      {" "}
                      View all
                    </span>
                    <span
                      className="add_new_button viewallOrder"
                      style={{ fontSize: "18px" }}
                      onClick={() => this.generateReport()}
                    >
                      {" "}
                      Generate Report
                    </span>{" "}
                  </h2>
                  <RangePicker
                    onDateSelected={(start, end) =>
                      this.handleDateSelect(start, end)
                    }
                    onClose={() => this.handleOnClose()}
                  />
                </div>
                {/* <div className="row mx-0">
                                <Button className="float-right ml-auto mr-5" onClick={()=> this.props.history.push('/admin/add-subject')}>Add New Subject</Button>
                            </div> */}
                <p
                  className={
                    this.state.showToggle
                      ? "text-muted font-italic ml-2 px-1 mt-2 mb-0"
                      : "d-none"
                  }
                >
                  Showing orders for last three days
                </p>
                {this.renderOrdersTable()}
              </React.Fragment>
            )}
          </div>
        </div>
        {this.renderOrderdetailsModal(this.state.modalData)}
      </div>
    );
  }
}

export default OrderPage;
