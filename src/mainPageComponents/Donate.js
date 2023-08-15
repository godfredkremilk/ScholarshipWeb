import React,{useState} from 'react';
import im1 from '../images/im1.jpg';
import im2 from '../images/im2.jpg';
import '../css/DonateStyle.css';

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonateNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="DonateContainer">
      <div className="DonateContentContainer">
        <h1 className="DonateTitle">FundmyFuture Scholarship Foundation</h1>
        <p className="DonateDescription">
          The FundmyFuture Scholarship Foundation is a non-profit organization dedicated to helping university students
          achieve their academic goals by providing scholarships and financial support. Your generous donations can make a
          significant impact on students' lives.
        </p>
        <button className="DonateButton" onClick={handleDonateNowClick}>
          Donate Now
        </button>
      </div>

      <div className="DonateStepsContainer">
        <h2 className="DonateRequirementsTitle">How to Donate:</h2>
        <ol>
          <li className="DonateStep">
            <span className="StepNumber">1</span>
            <div className="StepContent">
              <h3 className="StepTitle">Visit our secure donation page on our website.</h3>
              <p className="StepDescription">Make a difference by visiting our secure donation page on our website.</p>
            </div>
          </li>
          <li className="DonateStep">
            <span className="StepNumber">2</span>
            <div className="StepContent">
              <h3 className="StepTitle">Choose the amount you wish to donate.</h3>
              <p className="StepDescription">Select the desired amount you would like to contribute to our cause.</p>
            </div>
          </li>
          <li className="DonateStep">
            <span className="StepNumber">3</span>
            <div className="StepContent">
              <h3 className="StepTitle">Select a payment method and provide the necessary details.</h3>
              <p className="StepDescription">
                Choose a payment method and securely provide the necessary details for your donation.
              </p>
            </div>
          </li>
          <li className="DonateStep">
            <span className="StepNumber">4</span>
            <div className="StepContent">
              <h3 className="StepTitle">Review your donation and submit it securely.</h3>
              <p className="StepDescription">Double-check your donation details and securely submit your contribution.</p>
            </div>
          </li>
          <li className="DonateStep">
            <span className="StepNumber">5</span>
            <div className="StepContent">
              <h3 className="StepTitle">Receive a confirmation email and our heartfelt gratitude!</h3>
              <p className="StepDescription">
                After completing your donation, you will receive a confirmation email and our sincere appreciation for your
                support.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="DonateRequirementsContainer">
        <h2 className="DonateRequirementsTitle">Scholarship Application Requirements:</h2>
        <ul className="DonateRequirementsList">
          <li>Be currently enrolled as a university student.</li>
          <li>Maintain a minimum GPA of 3.5 or equivalent.</li>
          <li>Submit a completed online application form.</li>
          <li>Provide proof of enrollment and academic achievements.</li>
          <li>Write a compelling essay or personal statement showcasing your aspirations and achievements.</li>
        </ul>
      </div>

      <div className="HowToApplyContainer">
        <h2 className="HowToApplyTitle">How to Apply:</h2>
        <p className="HowToApplyDescription">
          To apply for the scholarship, please fill out our online application form by clicking the following link:
          <br />
          <a className="ApplyLink" href="https://forms.google.com/">Scholarship Application Form</a>
        </p>
      </div>

      <div className="DonateSuccessStoriesContainer">
        <h2 className="DonateSuccessStoriesTitle">Success Stories:</h2>
        <div className="DonateSuccessStory">
          <img className="SuccessStoryImage" src={im1} alt="John Doe" />
          <div className="SuccessStoryContent">
            <h3 className="SuccessStoryName">John Doe</h3>
            <p className="SuccessStoryText">
              John Doe, a previous recipient of the FundmyFuture scholarship, graduated with honors in Computer Science. He
              went on to pursue a successful career as a software engineer at a renowned tech company, and he attributes his
              success to the scholarship's impact on his education.
            </p>
          </div>
        </div>
        <div className="DonateSuccessStory">
          <img className="SuccessStoryImage" src={im2} alt="Jane Smith" />
          <div className="SuccessStoryContent">
            <h3 className="SuccessStoryName">Jane Smith</h3>
            <p className="SuccessStoryText">
              Jane Smith, another beneficiary of the FundmyFuture scholarship, majored in Mechanical Engineering. With the
              scholarship's assistance, she was able to excel academically without the burden of excessive student loans.
              Jane's dedication and hard work paid off, and she now works as a senior engineer in a leading manufacturing
              company.
            </p>
          </div>
        </div>
      </div>

      <footer className="Footer">
        <p className="FooterText">© 2023 FundmyFuture Scholarship Foundation. All rights reserved.</p>
      </footer>

      {isModalOpen && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            {/* Donation Form */}
            <h2>Payment Form</h2>
            {/* Add your payment form JSX code here */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
