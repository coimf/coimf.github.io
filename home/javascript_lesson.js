const hello = document.querySelectorAll("#hello path");
for (let i=0; i<hello.length; i++){
    console.log(`letter ${i+1} is ${hello[i].getTotalLength()}`);
}
