    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
    import { getDatabase, ref, set, child, onValue, get } from  "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCtvmkl0hvhr9jem7hf5p_jNKL9wfhKYgE",
      authDomain: "mmfg-4c2de.firebaseapp.com",
      projectId: "mmfg-4c2de",
      storageBucket: "mmfg-4c2de.appspot.com",
      messagingSenderId: "675138702436",
      appId: "1:675138702436:web:2f5be537e8fc7b0d86e371",
      measurementId: "G-R47CDGH1LN"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);



    // const db = getDatabase();
    // const changeUserRef = ref(db, 'users');
    // onValue(changeUserRef, (snapshot) => {
    //     const data = snapshot.val();
    //     updateUserData(data);
    // });

    // const li = []
    // function updateUserData(data){
    //     li.push(data)
    // }

    const usersRef = ref(getDatabase());
    get(child(usersRef, 'users')).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        document.getElementById("userdata").elements[0].value = Object.keys(snapshot.val()).length +1 
        document.getElementById("userdata").elements[3].disabled = false
    }else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });

    document.getElementById("userdata").onsubmit = ()=>{
        var srno = document.getElementById("userdata").elements[0].value;
        var firstName = document.getElementById("userdata").elements[1].value;
        var lastName = document.getElementById("userdata").elements[2].value;
        
        const dbRef = getDatabase();
        set(ref(dbRef,'users/' + srno+firstName+lastName ), {
            firstname: firstName,
            lastname: lastName 
        });
    }
    