import React from 'react';

function MainImage(props) {
    return (
        <div style={{ 
            position: 'relative',
            width: '100%',
            height: '500px',
            backgroundSize: 'cover',
            background: `url('${props.image}') no-repeat center center , #1c1c1c`,
            WebkitBackgroundSize: 'cover',
            backgroundSize: 'cover'
         }}>
            <div>
                <div style={{ 
                    position: 'absolute',
                    maxWidth: '500px',
                    marginLeft: '2rem',
                    bottom: '2rem',
                }}>
                    <h2 style={{ color: 'white' }}>{props.title}</h2>
                    <p style={{ color: 'white', fontSize: '1rem' }}>
                        {props.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MainImage;