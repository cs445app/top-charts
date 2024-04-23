
import React, { useState } from 'react';
import { IonImg, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonToast } from '@ionic/react';
import { personOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { ToastPosition } from '@ionic/core'; // Import ToastPosition type
import appLogo from '../theme/Top charts.png'; // Import appLogo icon
import './Login.css'; // Import CSS file

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    userName: null,
    password: null
  });
  
  const [isOpen, setIsOpen] = useState(false); // Toast open state
  const [message, setMessage] = useState(''); // Message to be displayed in the toast
  const [duration, setDuration] = useState(2000); // Duration in ms
  const [position, setPosition] = useState<ToastPosition>('top'); // Position of the toast
  const history = useHistory(); // Use history to navigate to other pages
  const [logoVisible, setLogoVisible] = useState(true); // State to track whether logo should be visible or not

  const handleInputChange = (e: any) => { // Handle input change
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handleInputFocus = () => {
    setLogoVisible(false); // Hide logo when input field is focused
  }

  const login = () => {
    if (loginData.userName === 'admin' && loginData.password === 'password') {
      history.push('/home');
    } else {
      showToast('Invalid Username or Password', 2000, 'top');
    }
  }

  const showToast = (message: any, duration: any, position: ToastPosition) => {
    setMessage(message);
    setDuration(duration);
    setPosition(position);
    setIsOpen(true);
  }

  // Inside your Login component

const loginAsGuest = () => {
  // Perform actions to log in the user as a guest
  // For example, you can set up a temporary session or navigate to a guest page
  history.push('/Home'); // Example: navigating to a guest page
}

return (
  <IonPage>
    <IonContent scrollY={false} color={'light'} className="ion-padding">
      {logoVisible && <IonImg className='appLogo' src={appLogo} alt="Logo"></IonImg>}
      <IonGrid className='formContainer'>
        <IonRow>
          <IonCol size='12' size-md='12'>
            <form className='loginForm'>
              <IonInput
                name='userName'
                className='inputFields'
                value={loginData.userName}
                onInput={(e) => handleInputChange(e)}
                placeholder="Username"
                onFocus={handleInputFocus} // Handle focus event
              >
                <div slot='label'>
                  <IonIcon icon={personOutline} className='icons'></IonIcon>
                </div>
              </IonInput>
              <IonInput
                name='password'
                type='password'
                className='inputFields'
                value={loginData.password}
                onInput={(e) => handleInputChange(e)}
                placeholder="Password"
                onFocus={handleInputFocus} // Handle focus event
              >
                <div slot='label'>
                  <IonIcon icon={lockClosedOutline} className='icons'></IonIcon>
                </div>
              </IonInput>
              <IonButton shape='round' className='button' expand='full' onClick={login}>Login</IonButton>
              <IonButton shape='round' className='button' expand='full' onClick={loginAsGuest}>Guest</IonButton>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className='circle1'></div>
      <div className='circle2'></div>
      <span className='dot'></span>
      <IonToast
        color={'tertiary'}
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        message={message}
        duration={duration}
        position={position}
      />
    </IonContent>
  </IonPage>
);

};

export default Login;


