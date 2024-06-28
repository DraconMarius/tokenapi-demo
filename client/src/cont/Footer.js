import React from 'react';

const FooterContainer = {

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16",
    height: "110%"
}
    ;

const IconContainer = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "200px"
}
    ;

const Footer = () => {
    return (
        <div style={FooterContainer}>
            <div style={IconContainer}>
                <a href="https://github.com/DraconMarius" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dbjhly3lm/image/upload//h_50/v1682488301/personal%20assets/logo_github_icon_143196_phgakv.png" alt="github" />
                </a>
                <a href="https://www.linkedin.com/in/mari-ma-70771585" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dbjhly3lm/image/upload/h_50/v1682488301/personal%20assets/logo_linkedin_icon_143191_nv9tim.png" alt="linkedin" />
                </a>
            </div>
            <p>
                <a href="https://draconmarius.github.io/react-cv/" target="_blank" rel="noopener noreferrer">
                    <button>
                        React Portfolio</button>
                </a>
            </p>
        </div >
    );
};

export default Footer;