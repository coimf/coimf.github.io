const store = document.querySelectorAll("#store path");
for (let i=0; i<store.length; i++){
    console.log(`letter ${i+1} is ${store[i].getTotalLength()}`);
}
