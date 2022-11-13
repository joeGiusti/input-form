import { useEffect, useRef } from 'react';
import './App.css';
import InputForm from './Pages/InputForm';
import { initializeApp } from 'firebase/app';
import {getDatabase} from 'firebase/database'
import {getStorage} from 'firebase/storage'
/*
Steps

done
Create app

done
Create input form

Create input form functionality
  done
  image selection
  done
  upload after typing duration
  done
  firebase setup 

  image upload
  text upload  

View form submissions page

create account / login options

phone media styling

*/

function App() {

  const firebase = useRef()

  useEffect(()=>{
    firebaseSetup()
  },[])

  function Page(){
    return <InputForm firebase={firebase}></InputForm>
  }
  
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
    
    firebase.current = {
      database: database,
      storage: storage,
    }
  }

  return (
    <div className="App">
      <div className="topNav"></div>
      {Page()}
    </div>
  );
}

export default App;
