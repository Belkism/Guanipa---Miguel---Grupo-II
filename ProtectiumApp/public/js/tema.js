const temaGuardado = localStorage.getItem("tema");

if(temaGuardado==="dark"){
    document.body.classList.add("dark");
}

const temaBtn=document.getElementById("temaBtn");

if(temaBtn){

    temaBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            localStorage.setItem("tema","dark");
        }else{
            localStorage.setItem("tema","light");
        }

    });

}