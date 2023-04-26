import React from 'react';
import './profile.css';
import Typical from 'react-typical'


function Profile() {
    return (
        <div className='profile-container'>
            <div className="profile-parent">
                <div className="profile-details">
                    
                    <div className="colz">
                        <a href="https://www.linkedin.com/in/akshay-neje-41a448230/">
                            <i className="fa fa-linkedin"></i>
                        </a>
                        <a href="#">
                            <i className='fa fa-google-plus-square'></i>
                        </a>
                        <a href="#">
                            <i className='fa fa-instagram'></i>
                        </a>
                        <a href="#">
                            <i className='fa fa-twitter'></i>
                        </a>
                    </div>

                    <div className="profile-details-name">
                        <span className="primary-text">
                            {" "}
                            Hello, I'M <span className="highlight-text">Akshay</span>
                        </span>
                    </div>

                    <div className="profile-details-role">
                        <span className="primary-text">
                            <h1>
                                {' '}

                                <Typical
                                    steps={[
                                        'Enthusiastic Dev', 1000,
                                        'MERN Stack Developer', 1000,
                                        'Cross Platform',
                                        1000,
                                        'React Developer',
                                        1000
                                    ]}
                                    loop={Infinity}
                                    wrapper="p"
                                />
                            </h1>
                            <span className="profile-role-tagline">
                                Knack of building application with front and back end
                                operations.
                            </span>
                        </span>
                    </div>

                    <div className="profile-options">
                        <button className='btn btn-primary'>Hire Me </button>
                        <a href="Akshay.pdf" download='Akshay.pdf'>
                            <button className='btn highlightrd-btn'>Get Resume</button>
                        </a>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Profile