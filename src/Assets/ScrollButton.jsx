// Feature/Component added by Sandrine MANGUY

import '../Styles/ScrollButton.css';

const ScrollButton = ({onClick}) => {
    return (
        <button 
          className="scroll-button"
          onClick={onClick}
        >^</button>
    )
}

export default ScrollButton