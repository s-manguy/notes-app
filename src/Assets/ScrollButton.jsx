// Feature/Component added by Sandrine MANGUY

import '../Styles/ScrollButton.css';
import { PropTypes } from 'prop-types';

const ScrollButton = ({onClick}) => {
    return (
        <button 
          className="scroll-button"
          onClick={onClick}
          aria-hidden
        >^</button>
    )
}

ScrollButton.propTypes = {
  onClick: PropTypes.func,
};

export default ScrollButton