gsap.registerPlugin(ScrollTrigger);
const mesImages = {
  "img-1": "https://github.com/Leo-lll/portfolio/blob/main/Plan%20de%20travail%201.jpg?raw=true",
  "img-2": "https://github.com/Leo-lll/portfolio/blob/main/Plan%20de%20travail%202.jpg?raw=true",
  "img-3": "https://github.com/Leo-lll/portfolio/blob/main/Plan%20de%20travail%203.jpg?raw=true",
  "img-4": "https://github.com/Leo-lll/portfolio/blob/main/Plan%20de%20travail%204.jpg?raw=true",
  "img-5": "https://github.com/Leo-lll/portfolio/blob/main/Plan%20de%20travail%205.jpg?raw=true",
  "img-6": "https://github.com/Leo-lll/portfolio/blob/main/Plan%20de%20travail%206.jpg?raw=true"
};



window.onload = () => {
  const r1Content = document.querySelector(".row-1 .row-content");
  const r2Content = document.querySelector(".row-2 .row-content");
  const r3 = document.querySelector(".row-3");
  const r3Content = document.querySelector("#portfolio-row");
  const targetImg = document.querySelector(".target-img");
  Object.keys(mesImages).forEach(classe => { document.querySelectorAll(`.${classe}`).forEach(img => {

      img.src = mesImages[classe];

    });

  });



  const setupAnimation = () => {

    setTimeout(() => {

      ScrollTrigger.getAll().forEach(t => t.kill());



      // Calcul de la position de départ (bord droit collé)

      const initialX = window.innerWidth - (targetImg.offsetLeft + targetImg.offsetWidth);

      

      // Calcul du zoom (bord gauche collé après agrandissement)

      const finalX = -(targetImg.offsetLeft * 3);



      gsap.set(r3Content, { x: initialX });

      gsap.set(r1Content, { x: 0 });

      gsap.set(r2Content, { x: -500 });



      const tl = gsap.timeline({

        scrollTrigger: {

          trigger: ".intro-sequence",

          start: "top top",

          end: "+=1200%",

          pin: true,

          scrub: 1.5,

          invalidateOnRefresh: true

        }

      });



      // PHASE 1 : EXPULSION VERTICALE + ZOOM

      tl.to(".row-1, .row-2, .row-black", { 

         yPercent: -200, y: -39,
          duration: 1, 
          ease: "none" 
        }, 0)

        .to(r1Content, { x: -600, duration: 1, ease: "none" }, 0)

        .to(r2Content, { x: 0, duration: 1, ease: "none" }, 0)

        .to(r3, { 

          // On remonte de la hauteur de 2 rangées + les gaps (6px)

          marginTop: "calc(-66.666vh - 13px)", 

          height: "100vh", 

          duration: 1, 

          ease: "none" 

        }, 0)

        .to(r3Content, { x: finalX, duration: 1, ease: "none" }, 0);



      // PHASE 2 : DÉFILEMENT HORIZONTAL

      tl.to(r3Content, {
        x: () => -(r3Content.offsetWidth - window.innerWidth),
        ease: "none",
        duration: 6 
      }, 1);

      ScrollTrigger.refresh();
    }, 200);
  };

// 1. On définit la fonction de vérification
  const toutesLesImages = document.querySelectorAll('.intro-sequence img');
  let compteurImages = 0;

  const verifierChargement = () => {
    compteurImages++;
    // On ne lance setupAnimation QUE quand TOUTES les images (ex: 15/15) sont prêtes
    if (compteurImages === toutesLesImages.length) {
      setupAnimation();
    }
  };

  // 2. On lance la vérification pour chaque image
  toutesLesImages.forEach(img => {
    if (img.complete) {
      verifierChargement();
    } else {
      img.addEventListener('load', verifierChargement);
      img.addEventListener('error', verifierChargement); 
    }
  });

  // 3. On garde le resize pour que tout s'ajuste si on tourne le téléphone/réduit la fenêtre
  window.addEventListener("resize", setupAnimation);

}; // Fermeture finale du window.onload