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

    const users = []
    const usersRef = ref(getDatabase());
    get(child(usersRef, 'users')).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        for(var key in snapshot.val()){
            var user = snapshot.val()[key]
            users.push(user)
            console.log(user)
            const card = document.createElement("div");
            card.className = "card"
            card.id = key +"card"
            if(user["due"] >0){
              card.style.backgroundColor = "rgb(255, 204, 204)"
            }
            const countDownDate = new Date(user['sed']).getTime();
            const counter = document.createElement("div")
            counter.className = "counter"
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
              
                if(days > 10 ){
                    counter.style.backgroundColor = "rgb(204, 255, 204)"
                }
                else if(days>1){
                    counter.style.backgroundColor = "rgb(255, 255, 204)"
                }
                else{
                    counter.style.backgroundColor = "rgb(255, 204, 204)"
                }
                // If the count down is finished, write some text
                if (distance < 0) {
                  clearInterval(x);
                  document.getElementById("demo").innerHTML = "EXPIRED";
                }
              }, 1000);

            card.innerHTML = `
            <img src="./static/imgs/defaultimage.png" alt="image" >
            <h2>${user['firstname'] +" "+ user['lastname'] }</h2>
            `
            const container = document.createElement("div")
            container.className = "container"
            container.id = key + "container"
            container.innerHTML =`
            <p class="title">MMF Member</p>
            <p class="invoiceNo">Invoice Number : ${user['invoiceno']} </p>
            <p class="doj">Joining Date : ${user['doj']} </p>
            <p class="sed">End date : ${user['sed']} </p>
            <p class="tamount">Total Amount : ${user['total']} rs </p>
            <p class="duration">Duration : ${user['duration']} month </p>
            <p class="piad">Amount Paid: ${user['paid']} rs</p>
            <p class="due">Amount Due: ${user['due']} rs</p>
            <p>Address: ${user['address']} </p>
            <p>Email: ${user['email']}</p>
            <a href="tel:${user['phonenumber']}">Phone Nmber: ${user['phonenumber']}</a>
            `
            card.appendChild(container)
            card.appendChild(counter)

            container.style.display= "none"
            card.onclick = ()=>{
              if(container.style.display == "none"){
                container.style.display = "flex"
              }
              else{
                container.style.display= "none"
              }
              
            }
            document.getElementById("memberslist").appendChild(card)
        }

    }else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });

  function setView(users){
    document.getElementById("memberslist").innerHTML = ''
    for(var i in users){
      var user = users[i]
      console.log(user)
      const card = document.createElement("div");
      card.className = "card"
      // card.id = key +"card"
      if(user["due"] >0){
        card.style.backgroundColor = "rgb(255, 204, 204)"
      }
      const countDownDate = new Date(user['sed']).getTime();
      const counter = document.createElement("div")
      counter.className = "counter"
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
        
          if(days > 10 ){
              counter.style.backgroundColor = "rgb(204, 255, 204)"
          }
          else if(days>1){
              counter.style.backgroundColor = "rgb(255, 255, 204)"
          }
          else{
              counter.style.backgroundColor = "rgb(255, 204, 204)"
          }
          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
          }
        }, 1000);

      card.innerHTML = `
      <img src="./static/imgs/defaultimage.png" alt="image" >
      <h2>${user['firstname'] +" "+ user['lastname'] }</h2>
      `
      const container = document.createElement("div")
      container.className = "container"
      // container.id = key + "container"
      container.innerHTML =`
      <p class="title">MMF Member</p>
      <p class="invoiceNo">Invoice Number : ${user['invoiceno']} </p>
      <p class="doj">Joining Date : ${user['doj']} </p>
      <p class="sed">End date : ${user['sed']} </p>
      <p class="tamount">Total Amount : ${user['total']} rs </p>
      <p class="duration">Duration : ${user['duration']} month </p>
      <p class="piad">Amount Paid: ${user['paid']} rs</p>
      <p class="due">Amount Due: ${user['due']} rs</p>
      <p>Address: ${user['address']} </p>
      <p>Email: ${user['email']}</p>
      <a href="tel:${user['phonenumber']}">Phone Nmber: ${user['phonenumber']}</a>
      `
      card.appendChild(container)
      card.appendChild(counter)

      container.style.display= "none"
      card.onclick = ()=>{
        if(container.style.display == "none"){
          container.style.display = "flex"
        }
        else{
          container.style.display= "none"
        }
        
      }
      document.getElementById("memberslist").appendChild(card)
    }
  }

  document.getElementById("sort").onchange = ()=>{
    var sortDiv = document.getElementById("sort")
    if(sortDiv.value == "da"){
      users.sort((a,b)=> (a.due > b.due ? 1 : -1))
      console.log(users)
      setView(users)
    }
    else if(sortDiv.value == "dd"){
      users.sort((a,b)=> (a.sed > b.sed ? 1 : -1))
      console.log(users)
      setView(users)
    }
    else if(sortDiv.value == "jd"){
      users.sort((a,b)=> (a.doj > b.doj ? 1 : -1))
      console.log(users)
      setView(users)
    }
  }
    