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
        var size = document.getElementById("userdata").elements.length
        document.getElementById("userdata").elements[0].value = Object.keys(snapshot.val()).length +1 
        document.getElementById("userdata").elements[size-1].disabled = false
    }else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
    });

    window.onload = ()=> {
        document.getElementById("paymentbox").style.display = "none";
        document.getElementById("othersbox").style.display = "none";
        var pack = document.getElementById("package");
        var discount = document.getElementById("discount")
        var admission = document.getElementById("admission")
        var recurring = document.getElementById("recurring")
        var total = document.getElementById("tamount")
        var duration = document.getElementById("duration")
        discount.value = 0
        if(pack.value== "p1"){
            admission.value = 0
            recurring.value = 2500
            total.value = 2500
            duration.value = 3
        }
        else if(pack.value == "p2"){
            admission.value = 700
            recurring.value = 800
            total.value = 1500
            duration.value = 1
        }
    };

    document.getElementById("paymentheader").onclick= ()=>{
        var paymentBox = document.getElementById("paymentbox")
        var arrow = document.getElementById("parrow")
        if(paymentBox.style.display=="none"){
            paymentBox.style.display="flex"
            arrow.innerHTML = "  &#8613;"
        }
        else{
            paymentBox.style.display="none"
            arrow.innerHTML = "  &#8615;"
            
        }
    }

    document.getElementById("otherheader").onclick= ()=>{
        var othersBox = document.getElementById("othersbox")
        var arrow = document.getElementById("oarrow")
        if(othersBox.style.display=="none"){
            othersBox.style.display="flex"
            arrow.innerHTML = "  &#8613;"
        }
        else{
            othersBox.style.display="none"
            arrow.innerHTML = "  &#8615;"
        }
    }

    document.getElementById("package").onchange = ()=>{
        var pack = document.getElementById("package");
        var discount = document.getElementById("discount")
        var admission = document.getElementById("admission")
        var recurring = document.getElementById("recurring")
        var total = document.getElementById("tamount")
        var duration = document.getElementById("duration")
        discount.value = 0
        if(pack.value== "p1"){
            admission.value = 0
            recurring.value = 2500
            total.value = 2500
            duration.value = 3
        }
        else if(pack.value == "p2"){
            admission.value = 700
            recurring.value = 800
            total.value = 1500
            duration.value = 1
        }
    }

    document.getElementById("discount").onchange = ()=>{
        var discount = document.getElementById("discount")
        var admission = document.getElementById("admission")
        var recurring = document.getElementById("recurring")
        var total = document.getElementById("tamount")
        total.value = (parseInt( recurring.value)  + parseInt( admission.value) ) - parseInt( discount.value) 
    }

    document.getElementById("paid").onchange = ()=>{
        var due = document.getElementById("due")
        var paid = document.getElementById("paid")
        var total = document.getElementById("tamount")
        due.value = parseInt( total.value)  - parseInt( paid.value) 
    }

    document.getElementById("userdata").onsubmit = ()=>{
        var id = document.getElementById("userdata").elements[0].value;
        var srno = document.getElementById("userdata").elements[1].value;
        var invoiceNo = document.getElementById("userdata").elements[2].value;
        var doj = document.getElementById("userdata").elements[3].value;
        var firstName = document.getElementById("userdata").elements[4].value;
        var lastName = document.getElementById("userdata").elements[5].value;        
        var phoneNumber = document.getElementById("userdata").elements[6].value;

        var pack = document.getElementById("userdata").elements[7].value;
        var discount = document.getElementById("userdata").elements[8].value;
        var admission = document.getElementById("userdata").elements[9].value;
        var reccuring = document.getElementById("userdata").elements[10].value;
        var total = document.getElementById("userdata").elements[11].value;
        var duration = document.getElementById("userdata").elements[12].value;        
        var paid = document.getElementById("userdata").elements[13].value;
        var due = document.getElementById("userdata").elements[14].value;
        
        var email = document.getElementById("userdata").elements[15].value;
        var address = document.getElementById("userdata").elements[16].value;        
        var dob = document.getElementById("userdata").elements[17].value;
        var weight = document.getElementById("userdata").elements[18].value;
        var height = document.getElementById("userdata").elements[19].value;
        var bloodGroup = document.getElementById("userdata").elements[20].value;
        var gender = document.getElementById("userdata").elements[21].value;

        var dt = new Date(doj)
        console.log(dt)
        var sed = new Date (dt.setMonth(dt.getMonth() + parseInt(duration))).toDateString();
        console.log(sed);
        alert(sed)
        const dbRef = getDatabase();
        set(ref(dbRef,'users/' + id+firstName + lastName + invoiceNo), {
            id:id,
            srno:srno,
            invoiceno:invoiceNo,
            doj:doj,
            firstname: firstName,
            lastname: lastName,
            phonenumber:phoneNumber,
            email:email,
            address: address,
            dob:dob,
            weight:weight,
            height:height,
            bloodGroup:bloodGroup,
            gender:gender,
            pack:pack,
            discount:discount,
            admission:admission,
            recurring:reccuring,
            total:total,
            duration:duration,
            paid:paid,
            due:due,
            sed:sed
        });
    }
    