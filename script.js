
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, setDoc, getDoc, where, writeBatch, query, orderBy, doc, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwhpcAFerwA-M1ZPJiERUgrDvRn_UxUAo",
    authDomain: "afrik-art-4bd4e.firebaseapp.com",
    projectId: "afrik-art-4bd4e",
    storageBucket: "afrik-art-4bd4e.appspot.com",
    messagingSenderId: "509827109455",
    appId: "1:509827109455:web:1d36ef7a907d5ef171903a",
    measurementId: "G-KZLDNWM2YP"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// fonction pour récupèrer une collection (READ)
const getDocument = async (collectionName) => {
    const DocumentColRef = collection(db, collectionName);
    const DocumentSnapshot = await getDocs(DocumentColRef);
    const DocumentList = DocumentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return DocumentList
  }


const userExist = async (name, password) => {
  
    const DocumentColRef = collection(db, "users");
    const q = await query(DocumentColRef, where("name", "==", name), where("password", "==", password))
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot docs", querySnapshot.docs)
    const DocumentList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    console.log('test user already exists', name, password, DocumentList);
    return DocumentList;
  };


/*const getData = async() => {
   const data = await fetch("https://json-ece.glitch.me/burgers.json")
   const json = await data.json()
   console.log("json", json)
   displayBurgers(json.data)

   const burgers = document.querySelectorAll('.burger')
    burgers.forEach((burgerHTML, index) => {
        burgerHTML.addEventListener('click', () => {
            displayBurger(burgerList[index])
        })
    })
}*/

const getDataFirebase = async() => {
    
    const Oeuvres = await getDocument("Oeuvres")
    const contentHTML = document.querySelector('.content')
    Oeuvres.forEach((Oeuvre,index) => {
        contentHTML.innerHTML += `<div class="flex justify-center ">
        <div class=" max-w-md m-24 w-100 hover:scale-125 duration-75 	">
            <div class="h-full border-2 border-yellow-950 p-4 rounded-lg overflow-hidden  ">
               
              <img class="lg:h-60 md:h-40 w-screen object-cover object-center  " src="${Oeuvre.image}" alt="blog"></img>
              
              <div class="p-6 ">
                <h1 class="mb-3 textFont font-bold">${Oeuvre.nom}</h1>
                <h2class="leading-relaxed mb-3 textFont"><strong>auteur</strong>: ${Oeuvre.auteur}</h2>
                <p class="leading-relaxed mb-3 textFont"><strong>Descriptions</strong> : ${Oeuvre.description}</p>
                <p class="leading-relaxed mb-3 textFont"><strong>Types</strong> : ${Oeuvre.type}</p>
                <a  class=" cursor-pointer hover:text-yellow-700 text-white font-bold py-2 px-4 rounded" href=${Oeuvre.lien}>En savoir plus</a>
                <div class="flex items-center flex-wrap">
            </div>
          </div>
          </div> `
    })
    console.log('Oeuvres', Oeuvres) 
}

getDataFirebase()


