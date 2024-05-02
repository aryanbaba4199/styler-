import React, {Fragment} from 'react'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { bannerData } from '@/constants/homedata';
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const banner = () => {
  return (
    <Fragment>
        <Carousel responsive={responsive}
            swipeable={false}
            draggable = {false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            slidesToSlide={1}
            transitionDuration={1000}
            
        >
        {bannerData.map(item =>(
            <div key={item.url}>
                <img
                    src={item.url}
                    className='rounded-md'
                />
            </div>
        ))}
        </Carousel>
    </Fragment>
  )
}

export default banner;