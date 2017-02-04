// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVKatylZW3imXH0C5Lr8XQ_h5E3BFlFsk",
  authDomain: "fir-demo-185d6.firebaseapp.com",
  databaseURL: "https://fir-demo-185d6.firebaseio.com",
  storageBucket: "fir-demo-185d6.appspot.com",
  messagingSenderId: "583229307201"
};
firebase.initializeApp(config);

var header = document.getElementById("header");

var dbRef = firebase.database().ref().child("header");



var login = document.getElementById("login");
var logout = document.getElementById("logout");

var provider = new firebase.auth.GoogleAuthProvider();

login.addEventListener("click", function(){
	firebase.auth().signInWithPopup(provider).then(function(user){
		if (user){
			dbRef.on("value", function(snap){
				header.innerText = snap.val();
			});
			playgroundRef.on("value", function(snap){
				playground.value = snap.val();
			});
		}
	});
});

logout.addEventListener("click", function(){
	firebase.auth().signOut().then(function(){
		header.innerText = "Sign in with Google Oauth"
		playground.value = "Sign in with Google Oauth"
	});
})

var playground = document.getElementById("playground");
var playgroundRef = firebase.database().ref().child("playground");

playground.addEventListener("keyup", function(){
	playgroundRef.set(playground.value);
});