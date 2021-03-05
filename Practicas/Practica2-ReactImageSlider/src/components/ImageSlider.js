import React, { useRef, useState } from 'react'
import { SliderData } from './SliderData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

const ImageSlider = ({slides}) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    //console.log(current);

    // Si no hay images, devuelve null
    if(!Array.isArray(slides) || slides.length <= 0){
        return null;
    }

    // Esta funcion deberia crear un elemento div nuevo en el que solo se ve la imagen, pero no se por que no me lo hace
    function zoomImage(){
        <div className='model open'>
            <img src='https://wallpaperaccess.com/full/1225257.jpg' className='zoom-image open'/>
        </div>
        console.log('The image was clicked')
    }

    return (
        <section className="slider">
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (<img src={slide.image} alt='castle image' className='image' onClick={zoomImage}/>)}
                    </div>
                )
            })}
            
        </section>
    )
}

export default ImageSlider;
