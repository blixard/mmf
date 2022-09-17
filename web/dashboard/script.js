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
    // const analytics = getAnalytics(app);



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
        for(var key in snapshot.val()){
            var user = snapshot.val()[key]
            console.log(user)
            const card = document.createElement("div");
            card.className = "card"
            card.id = "key"
            var countDownDate = new Date(user['sed']).getTime();
            var counter = document.createElement("div")
            var x = setInterval(function() {

                // Get today's date and time
                var now = new Date().getTime();
              
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
              
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
              
                // Display the result in the element with id="demo"
                
                counter.innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
              
                if(days < 10 ){
                    card.style.backgroundColor = "rgb(255, 204, 204)"
                }
                else{
                    card.style.backgroundColor = "rgb(204, 255, 204)"
                }
                // If the count down is finished, write some text
                if (distance < 0) {
                  clearInterval(x);
                  document.getElementById("demo").innerHTML = "EXPIRED";
                }
              }, 1000);
            card.innerHTML = `
            <img src="./static/imgs/defaultimage.png" alt="image" >
            <div class="container">
              <h2>${user['firstname'] +" "+ user['lastname'] }</h2>
              <p class="title">MMF Member</p>
              <p class="invoiceNo">Invoice Number : ${user['invoiceno']} </p>
              <p class="doj">Joining Date : ${user['doj']} </p>
              <p class="sed">End date : ${user['sed']} </p>
              <p class="piad">Amount Paid: ${user['paid']}</p>
              <p class="due">Amount Due: ${3000-user['paid']}</p>
              <p>Address: ${user['address']} </p>
              <p>Email: ${user['email']}</p>
              <a href="tel:+${user['phonenumber']}">Phone Nmber: ${user['phonenumber']}</a>
            </div>
            `
            card.appendChild(counter)
            document.getElementById("memberslist").appendChild(card)
        }

    }else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });
    