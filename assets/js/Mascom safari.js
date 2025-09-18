/********** MASCOM js **********/

/* shrink navbar on scroll */
window.onscroll = function()
{scrollfunction()};

function scrollfunction() {
  if (document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50){

      document.getElementById("navbar").style.height = "10vh";
   } else {

    document.getElementById("navbar").style.height = "12vh";
   }
}



/* Mobile nav toggle */
function myFunction () {
    var x =
    document.getElementById("mynav");
    if(x.style.display ==="block"){
        x.style.display = "none";
    }   else{
        x.style.display = "block";
    }
}

/* active nav && navlink */
const navlink= Array.from(document.querySelectorAll("#navlink"));

for(let i = 0;i < navlink.length;i++){
    navlink[i].addEventListener("click",function(){
        for(let j = 0;j < navlink.length;j++){
            navlink[j].classList.remove("active");
        }
        navlink[i].classList.add("active");
    })
}

/* carousel */
let t0
let t1

const carousel = document.getElementById('myCarousel')
carousel.addEventListener('slid.bs.carousel', event => {
    t1 = performance.now()
    console.log('transition-duration took ' + (t1 - t0) + 'ms, slid at ' + event.timeStamp)
})
carousel.addEventListener('slide.bs.carousel', () => {
    t0 = performance.now()
})
