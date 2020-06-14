import React, { Component } from "react";
import "./Homepage.css";
import HomeHeader from "../../Reusable/Header/homeHeader";
import MainFooterPage from "../../Reusable/Footer/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist:[{ id: 1, image:require( '../../Assets/images/bg1.jpg'), title: 'artist 1', description: 'bar' },
      { id: 2, image:require( '../../Assets/images/bg2.jpg'), title: 'artist 2', description: 'bar' },
      { id: 3,image:require( '../../Assets/images/bg3.jpg'), title: 'artist 3', description: 'bar' },
      { id: 4,image:require( '../../Assets/images/bg4.jpg'), title: 'artist 4', description: 'bar' },
      { id: 5,image:require( '../../Assets/images/bg5.jpg'), title: 'artist 5', description: 'bar' },
    
  ],
  region:[{ id: 1, image:require( '../../Assets/images/bg1.jpg'), title: 'Kumaon', description: 'bar' },
  { id: 2, image:require( '../../Assets/images/bg2.jpg'), title: 'Garhwal', description: 'bar' },
 
],
    
      loading: true,
  
    }
 


   }
    
    
    
    
    
     componentDidMount() {
    // this.getKeyDates()
  
  }



  getKeyDates = () => {
  
  fetch("http://localhost:8080/feed/posts")
  .then(res=>{
    return res.json()})
  .then(res=>{
     this.setState({title:res[0].title})
  })
  };

    
    
    
    
   

  pushNext() {
    this.props.history.push("/2");
  }


  renderArtist() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow:3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 577,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return <Slider {...settings}>{this.renderArtist1()}</Slider>
    
    ;
  }


  renderArtist1()
{

  return this.state.artist.map((item, index) => {
   
        return (
                <div
          className='artistDiv'key={index}
             
            >
              <img
                 className='imageSize'
                src={item.image}
                alt="new songs"
             
              />

              <p className='text-center paraRel' >{item.title}</p>
              
            </div>
         
        );
      }
  )

}

// renderRegion() {
//   var settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow:3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 577,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };
//   return <Slider {...settings}>{this.renderRegion1()}</Slider>
  
//   ;
// }


renderRegion()
{

return this.state.region.map((item, index) => {
 
      return (
              <div
        className='regionDiv' key={index}
           
          >
            <img
               className='imageSize'
              src={item.image}
              alt="new songs"
           
            />

            <p className='text-center paraRel' >{item.title}</p>
            
          </div>
       
      );
    }
)

}



  render() {
    return (
      <div id="homepage">
        <HomeHeader />

      
        <div className="containerx pt-5">
          <div className="pt-5 mt-5">
          <h1  className='headingH1 pl-5'>New Releases</h1>

          {this.renderArtist()}
          
          </div>
        </div>

        <div className="container1">
        <div className="pt-5">
        <h1  className='headingH1 pl-5'>Region</h1>
<div className='regionDivMain ' >
{this.renderRegion()}
</div>
        
        
        </div>
        </div>

        <div className="container2">
          <div className="homepageContent">
            {
              
              <h1>{this.state.title}</h1>
            
            }
          </div>
        </div>

        <MainFooterPage />
      </div>
    );
  }
}
