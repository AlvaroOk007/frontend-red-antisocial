import { ArrowLeft, ArrowRight } from 'lucide-react';
import './CarrouselImages.css';
import { useState } from 'react';

export function CarrouselImages({ images }) {
  const [numImg, setNumImg] = useState(0);
  const handleClick = (num) => {
    if(numImg + num>=0 && numImg+num< images.length) {
      setNumImg(numImg + num)
    }
  };
  return (
    <div className='container-carrousel-images'>
      <span className='cant-imgs'>{`${numImg+1}/${images.length}`}</span>
      <img src={images[numImg]?.url} className='img-carrousel' />
      <ArrowLeft className='btn-left custom-btn' onClick={()=>handleClick(-1)}/>
      <ArrowRight className='btn-rigth custom-btn' onClick={()=>handleClick(1)}/>
    </div>
  );
}
