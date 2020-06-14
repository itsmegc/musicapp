import React, { Component } from "react";
import "./artist.css";
import HomeHeader from "../../Reusable/Header/homeHeader";
import MainFooterPage from "../../Reusable/Footer/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist:[
      //   { id: 1, image:require( '../../Assets/images/bg1.jpg'), title: 'jon doe', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      // { id: 2, image:require( '../../Assets/images/bg2.jpg'), title: 'mj', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      // { id: 3,image:require( '../../Assets/images/bg3.jpg'), title: 'eminem', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      // { id: 4,image:require( '../../Assets/images/bg4.jpg'), title: 'raga', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      // { id: 5,image:require( '../../Assets/images/bg5.jpg'), title: 'forty seven', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    
  ],
    
      loading: true,
  
    }
 


   }
   

   componentDidMount() {
    this.getKeyDates()
  
  }



  getKeyDates = () => {
  
  fetch("https://nxt-1956111601.us-east-2.elb.amazonaws.com/feed/posts")
  .then(res=>{
    return res.json()})
  .then(res=>{
    console.log(res.posts[0].image,'sasa')
      this.setState({artist:res.posts})
  })
  };






   handleArtist (item) {
    window.localStorage.setItem("artist", JSON.stringify(item));
   
    this.props.history.push(`/${item.title}`);
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
          className='artistDiv' key={index}
          onClick={() => this.handleArtist(item, index)}
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

      
        <div className="containerArrtist pt-5">
          <div className="pt-5 mt-5">
          <h1  className='headingH1 pl-5'>Artists</h1>

          {this.renderArtist()}
          
          </div>
        </div>

        <div className="containerLyricist">
        <div className="pt-5">
        <h1  className='headingH1 pl-5'>Lyricist</h1>
        {this.renderArtist()} 
        
        </div>
        </div>

       

        <MainFooterPage />
      </div>
    );
  }
}
