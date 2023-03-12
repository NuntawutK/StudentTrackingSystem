import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignIn_Admin from './Signin_Admin';
import Signin_Teacher from './Signin_Teacher';
import Card from 'react-bootstrap/Card';

function SignInHome() {
  return (

        
      <Tabs
      defaultActiveKey="teacher"
      id="fill-tab-example"
      className="mb-3"
      fill>
      <Tab eventKey="admin" title="แอดมิน">
        <SignIn_Admin />
      </Tab>
      <Tab eventKey="teacher" title="คุณครู">
        <Signin_Teacher />
      </Tab>
     
    </Tabs>
    

        
   



    
  );

  
}

export default SignInHome;