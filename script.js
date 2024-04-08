function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  });

  // --- PURPLE/GREEN PANEL ---
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

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
        amount: 0.5,
      },
    });

    nav.addEventListener("mouseleave", () => {
      let tl = gsap.timeline();

      tl.to("#nav-2nd-sec h5 span", {
        y: 25,
        stagger: {
          amount: 0.2,
        },
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

const page2Animation = () => {
  let rElems = document.querySelectorAll(".r-elem");
  rElems.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.to(elem.childNodes[3], {
        //CHILD NODE3 IS THE MOVING IMG opacity: 1,
        opacity: 1,
        scale: 1.8,
      });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });

    elem.addEventListener("mousemove", function (dets) {
      gsap.to(elem.childNodes[3], {
        x:
          dets.x -
          elem.getBoundingClientRect().x -
          90 /*dets.x will give the cursor posn & getBoundingClientRect() will give element posn on x & y axis*/,
        y: dets.y - elem.getBoundingClientRect().y - 70,
      });
    });
  });
};
const page3Animation = () => {
  let page3Center = document.querySelector("#page-3-center");
  let video = document.querySelector("#page-3 video");
  page3Center.addEventListener("click", () => {
    video.play();
    gsap.to(video, {
      opacity: 1,
      transform: "translateY(0%) scaleX(1.1) scaleY(1.2)",
      borderRadius: "0",
    });
  });
  video.addEventListener("click", () => {
    video.pause();
    gsap.to(video, {
      opacity: 0,
      transform: "translateY(10%) scaleX(0.5) scaleY(0.2)",
      duration: 0.5,
      borderRadius: "100px",
    });
  });
};

const page5Animation = () => {
  let page5Right = document.querySelector("#page-5-right");
  page5Right.addEventListener("mouseenter", () => {
    page5Right.childNodes[1].style.opacity = 0;
    page5Right.childNodes[3].style.opacity = 1;
    page5Right.childNodes[3].play();
  });
  page5Right.addEventListener("mouseleave", () => {
    page5Right.childNodes[1].style.opacity = 1;
    page5Right.childNodes[3].style.opacity = 0;
    page5Right.childNodes[3].load();
  });
  page5Right.addEventListener("mousemove", (dets) => {
    gsap.to(page5Right.childNodes[5], {
      opacity: 1,
      scale: 1.5,
      x: dets.x - page5Right.getBoundingClientRect().x,
      y: dets.y - page5Right.getBoundingClientRect().y,
    });
  });
  page5Right.addEventListener("mouseleave", () => {
    gsap.to(page5Right.childNodes[5], {
      opacity: 0,
      scale: 0,
    });
  });
};

locomotiveAnimation();
navAnimation();
page2Animation();
page3Animation();
page5Animation();
