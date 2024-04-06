function navAnimation() {
  let nav = document.querySelector("nav");
  nav.addEventListener("mouseenter", () => {
    let tl = gsap.timeline();

    tl.to("#nav-bottom", {
      height: "20vh",
      duration: 0.5,
    });

    tl.to("#nav-2nd-sec h5", {
      display: "block",
      duration: 0.1,
    });

    tl.to("#nav-2nd-sec h5 span", {
      y: 0,
      stagger: {
        amount : 0.5
      }
    });

    nav.addEventListener("mouseleave", () => {
      let tl = gsap.timeline();

      tl.to("#nav-2nd-sec h5 span", {
        y: 25,
        stagger: {
          amount : 0.2
        }
      });
      tl.to("#nav-2nd-sec h5", {
        display: "none",
        duration: 0.1,
      });

      tl.to("#nav-bottom", {
        height: "0",
        duration: 0.2,
      });
    });
  });
}

navAnimation();

const page2Animation =()=>{
let rElems = document.querySelectorAll(".r-elem")
rElems.forEach((elem)=>{
  elem.addEventListener("mouseenter",()=>{
  gsap.to(elem.childNodes[3],{/*CHILD NODE3 IS THE MOVING IMG*/
    opacity: 1,
    scale: 1.8,
  })
  })

  elem.addEventListener("mouseleave",()=>{
    gsap.to(elem.childNodes[3],{
      opacity: 0,
      scale: 0,
    })
    })

    elem.addEventListener("mousemove",function (dets) {
      gsap.to(elem.childNodes[3],{
       x:dets.x - elem.getBoundingClientRect().x - 90, /*dets.x will give the cursor posn & getBoundingClientRect() will give element posn on x & y axis*/
       y:dets.y - elem.getBoundingClientRect().y - 70
      })
      })
})
}
page2Animation()