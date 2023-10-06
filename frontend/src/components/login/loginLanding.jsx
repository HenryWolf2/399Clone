import PostGraph from "../individual-posts/postGraph";

const LoginLanding = () => {
    
    return(
        <div>
            <div class= "landing-desc-box">
              <p class= "landingText">
                Mass spectrometry is a powerful analytical technique that has revolutionized research and analysis in various fields. From determining the structure of complex molecules to identifying unknown compounds, mass spectrometry offers countless possibilities and applications. With the ability to provide both qualitative and quantitative data, researchers can gain valuable insights into the chemical composition of substances.
              </p>
              <p class= "landingText">
                Our platform takes mass spectrometry to the next level by providing an innovative environment for storing, sharing, and analyzing mass spectrometry data. Through advanced data analysis tools, researchers can perform various analytical techniques, making the most out of their mass spectrometry experiments. Our intuitive interface ensures easy navigation, even for users new to mass spectrometry, allowing everyone to explore the fascinating world of mass spectrometry research.
              </p>
              <p class='landingText'>
                Collaboration and data sharing are at the heart of our platform. By creating profiles, researchers can connect with like-minded individuals, form research groups, and share their analyzed data securely. Imagine the possibilities of collaborating with experts from different fields, pooling your knowledge, and collectively advancing research in mass spectrometry. Our platform facilitates this collaboration, fostering new ideas and driving innovation.
              </p>
              <p class= "landingText">
                In addition to a collaborative environment, our platform offers unique features and tools specifically designed for mass spectrometry researchers. Easily upload your data, add contributors, and keep track of your experiments and findings. Share your data within research groups, allowing for real-time discussions and feedback. Our platform also provides comprehensive analytical tools and visualizations to help you gain actionable insights and present your findings with utmost clarity.
              </p>
              <p class= "landingText">
                Don't miss out on this opportunity to join a vibrant community of mass spectrometry researchers. Register now and unlock the endless possibilities for collaboration, data sharing, and analysis on our platform. Together, let's push the boundaries of mass spectrometry research and make groundbreaking discoveries! 
              </p>
            </div>
            <PostGraph post_id={1} style={{fontsize: '1.5vh'}} />
        </div>
    )
}

export default LoginLanding;