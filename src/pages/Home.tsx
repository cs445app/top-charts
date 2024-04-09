import React from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import './Home.css'; // Import CSS file

const Home: React.FC = () => {
  const history = useHistory(); // Use history to navigate to other pages

  const handleStart = () => {
    history.push('/search'); // Navigate to the search page
  };

  return (
    <IonPage>
      <IonContent scrollY={false} color={'dark'} className="ion-padding">
        <div className='header'>
          <h1>Top Charts</h1>
        </div>
        <div className='subheader'>
          <h2>Visualize Music Trends</h2>
        </div>
        <div className='paragraph'>
          <p>Track music trends with ease. Explore top charts and artists visually. Stay updated on the latest hits.</p>
          <p>Analyze streaming data to understand which songs and artists are trending and gaining popularity.</p>
          <p>Visualize music trends through interactive graphs and charts for a better understanding of the data.</p>
          <p>Enjoy an intuitive and easy-to-use interface that makes navigating through music trends a breeze.</p>
        </div>
        <div className='circle1'></div>
        <div className='circle2'></div>
        <span className='dot'></span>

        <IonButton onClick={handleStart} className='button' shape='round'>Get Started</IonButton> {/* IonButton to navigate to the search page */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
