import React from 'react';
import image1 from '../../../images/b2.jpg';


const HeaderTop = () => {
    return (
        <div style={{ height: "500px", 'width': '100%' }} className="row d-flex align-items-center container">
            
            <div>
                <img src={image1} className="img-fluid rounded" alt="" />
            </div>

           
        </div>
        
    );
};

export default HeaderTop;