import React, { useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';

const slideImages = [
    {
      url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      caption: 'Slide 1'
    },
    {
      url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      caption: 'Slide 2'
    },
    {
      url: 'https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      caption: 'Slide 3'
    },
  ];


export const ImageSlider = ({type}) => {

  const [size, setSize] = useState('each-slide')

  useEffect(() => {
    handleSize()
  }, [])


  const handleSize = () => {
    if(type === 'small'){
      setSize('each-slide-small')
    }else{
      setSize('each-slide')
    }
  }
  
  return (
        <Slide>
        {
            slideImages.map( image =>  {
                return (
                    /* type === "small" ? styles['each-slide-small'] : styles['each-slide'] */
                    <div className={ styles[size]} key={ image }>
                        <div style={{
                            backgroundImage: `url(${ image.url })`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                    </div>
                )

            })
        }
        </Slide>
  )
}
