import { useEffect, useRef, useState } from 'react';
import './App.css';
import InputForm from './Pages/InputForm';
import { initializeApp } from 'firebase/app';
import {DataSnapshot, getDatabase, refFromURL, onValue, ref as dbRef} from 'firebase/database'
import {getStorage} from 'firebase/storage'
import Complete from './Pages/Complete';
import Auth from './Components/Auth';
import userCircle from './Images/userCircleIcon120px075opacity.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Admin from './Pages/Admin';

/*
Steps

done
Create app

done
Create input form

done
Create input form functionality
  done
  image selection
  done
  upload after typing duration
  done
  firebase setup 
  done
  image upload
  done
  text upload  

done
completed form page

new submission option functionality 
  can clear the cached data and bring back to input form
  if already input form can also refresh it
  have a confirmation popup though if already in the input form page

create account / login options
  done
  create popup window
  functionality 
    create account, put data under userID/submissions/submissionID
  when logged in they have option to log out or view submissions

View form submissions page
  when logged in and admin property is true show this page  

phone media styling

*/


function App() {

  const [page, setPage] = useState("Input")
  const [showAuth, setShowAuth] = useState(false)
  const [userId, setUserId] = useState()
  const [isAdmin, setIsAdmin] = useState()

  const firebase = useRef()
  const setup = useRef()

  useEffect(()=>{
    if(!setup.current){
      firebaseSetup()
      authSetup()
      setup.current = true
    }
  },[])

  function firebaseSetup(){
    // Get the config data
    const firebaseConfig = {
      apiKey: "AIzaSyBDWCKZwSBi_Qp4U0u3D2tKrcIU290IrDE",
      authDomain: "defaultproject-c023e.firebaseapp.com",
      databaseURL: "https://defaultproject-c023e-default-rtdb.firebaseio.com",
      projectId: "defaultproject-c023e",
      storageBucket: "defaultproject-c023e.appspot.com",
      messagingSenderId: "147977670881",
      appId: "1:147977670881:web:fe1532718095f374bbe7a0",      
    }
    // Connect the app, datebase, and storage
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app)
    const storage = getStorage(app)
    const auth = getAuth(app);

    firebase.current = {
      database: database,
      storage: storage,
      auth: auth,
    }
  }

  function authSetup(){
    onAuthStateChanged(firebase.current.auth, user => {
      if(user)
        setUserId(user.uid)
      else
        setUserId(null)
      console.log("user signed in")
      console.log(user)
      // look in the db for that user and if they have admin=true property change the page and display the data
      onValue(dbRef(firebase.current.database, "users/"+user.uid+"/admin"), snap => {
        console.log(snap)
        console.log(snap.val())
        if(snap.val())
          setIsAdmin(true)
      })            
    })
  }

  function Page(){
    if(page == "Input")
      return <InputForm firebase={firebase} togglePage={togglePage}></InputForm>
    if(page == "Complete")
      return <Complete  togglePage={togglePage}></Complete>
    if(page == "Admin")
      return <Admin firebase={firebase}></Admin>
  }  

  function togglePage(){
    if(page == "Input")
      setPage("Complete")
      if(page == "Complete")
      setPage("Input")
  }

  return (
    <div className="App">
      <div className="topNav">
        <div className='accountButton' onClick={()=>setShowAuth(true)}>
          <img src={userCircle}></img>
          
        </div>
      </div>
      {showAuth && <Auth setShowAuth={setShowAuth} firebase={firebase} userId={userId} isAdmin={isAdmin} setPage={setPage}></Auth>}
      {Page()}
    </div>
  );
}

export default App;
