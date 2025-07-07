const firebaseConfig = {
    apiKey: "AIzaSyBVff4fVtqj_MOjL5gcv9LwrssYl0FUl-o",
    authDomain: "myportfolio-58cba.firebaseapp.com",
    databaseURL: "https://myportfolio-58cba-default-rtdb.firebaseio.com",
    projectId: "myportfolio-58cba",
    storageBucket: "myportfolio-58cba.firebasestorage.app",
    messagingSenderId: "823142510437",
    appId: "1:823142510437:web:5b0b8c4a50c94483427b8c"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig);

  // create refernce to db
  var contactFormDB = firebase.database().ref("contactForm");
  // Handle form submission
  function showSweetAlert(message) {
    const sweetAlert = document.createElement("div");
    sweetAlert.classList.add("sweetalert");
    sweetAlert.innerHTML = `
        <div class="popup-content">
            <h3>Thank you for visiting my site!</h3>
            <p>${message}</p><br>
            <button onclick="closeSweetAlert()">OK</button>
        </div>
    `;
    document.body.appendChild(sweetAlert);
    sweetAlert.style.display = "flex";
}

// Function to close the SweetAlert popup
function closeSweetAlert() {
    const sweetAlert = document.querySelector(".sweetalert");
    sweetAlert.style.display = "none";
    document.body.removeChild(sweetAlert);
}
document.querySelector(".popup-form button[type='submit']").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default form submission

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");

    console.log(name, emailid, msgContent);

    // Save data to Firebase
    saveMessages(name, emailid, msgContent);

    // Reset form fields
    document.getElementById("name").value = "";
    document.getElementById("emailid").value = "";
    document.getElementById("msgContent").value = "";

     // Show SweetAlert popup with success message
     showSweetAlert("Message sent successfully!");
});

// Function to save messages to Firebase
const saveMessages = (name, emailid, msgContent) => {
    contactFormDB.push().set({
        name: name,
        emailid: emailid,
        message: msgContent
    });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};