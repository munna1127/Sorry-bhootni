let app = document.getElementById("app");

app.innerHTML = `
<div class="screen active" id="intro">
<h1>Meri Bhootni 👻❤️</h1>
<p>Mujhe tujhse kuch kehna hai 😔</p>
<button onclick="go('story')">Start</button>
</div>

<div class="screen" id="story">
<p>Mujhse galti ho gayi 😔</p>
<button onclick="go('game')">Next</button>
</div>

<div class="screen" id="game">
<h1>Game 🎮</h1>
<p>5 baar Sorry dabao</p>
<button onclick="clickSorry()">Sorry 😭</button>
<p id="score"></p>
</div>

<div class="screen" id="choice">
<h1>Ab bata 😭</h1>
<button onclick="yes()">Theek hai 😊</button>
<button id="noBtn" onmouseover="run()">Nahi 😒</button>
</div>

<div class="screen" id="cartoon">
<h1>Scene 💖</h1>
<div id="girl" class="avatar">😡</div>
<p id="dialog">Gussa hu 😒</p>
<button onclick="flower()">🌹 Phool do</button>
</div>

<div class="screen" id="end">
<h1>❤️ Happy Ending ❤️</h1>
<p>Tu maan gayi 🥺</p>
</div>
`;

// navigation
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// game
let c = 0;
function clickSorry(){
  c++;
  document.getElementById("score").innerText = "Sorry: " + c;
  if(c >= 5) go('choice');
}

// no button
function run(){
  let btn = document.getElementById("noBtn");
  btn.style.left = Math.random()*300 + "px";
  btn.style.top = Math.random()*300 + "px";
}

// yes
function yes(){
  document.getElementById("voice").play();
  go('cartoon');
}

// flower animation
function flower(){
  let girl = document.getElementById("girl");
  let dialog = document.getElementById("dialog");

  girl.innerText = "😳";
  dialog.innerText = "Ye mere liye? 😳";

  setTimeout(()=>{
    girl.innerText = "😊";
    dialog.innerText = "Theek hai... maaf kiya ❤️";
  },1200);

  setTimeout(()=>{
    go('end');
  },2500);
}

/* ================= 3D FIXED ================= */

document.getElementById("start3d").addEventListener("click", () => {
  init3D();
});

function init3D(){

  // remove old canvas
  let old = document.querySelector("canvas");
  if(old) old.remove();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff,1);
  light.position.set(10,10,10);
  scene.add(light);

  const boy = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshStandardMaterial({color:0x00ffcc})
  );
  boy.position.set(-5,1,0);
  scene.add(boy);

  const girl = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshStandardMaterial({color:0xff0000})
  );
  girl.position.set(5,1,0);
  scene.add(girl);

  const flower = new THREE.Mesh(
    new THREE.SphereGeometry(0.3,16,16),
    new THREE.MeshStandardMaterial({color:0xff4d6d})
  );
  flower.visible = false;
  scene.add(flower);

  let hearts = [];

  function createHeart(){
    let h = new THREE.Mesh(
      new THREE.SphereGeometry(0.1),
      new THREE.MeshBasicMaterial({color:0xff4d6d})
    );
    h.position.set(girl.position.x,2,0);
    scene.add(h);
    hearts.push(h);
  }

  camera.position.set(0,3,12);

  let state = "walk";

  function animate(){
    requestAnimationFrame(animate);

    if(state==="walk"){
      if(boy.position.x < 2){
        boy.position.x += 0.02;
      } else {
        state="flower";
        flower.visible=true;
        flower.position.copy(boy.position);
      }
    }

    if(state==="flower"){
      if(flower.position.x < girl.position.x-1){
        flower.position.x += 0.08;
      } else {
        state="impact";
      }
    }

    if(state==="impact"){
      girl.material.color.set(0x00ff00);

      if(camera.position.z > 6){
        camera.position.z -= 0.05;
      }

      if(Math.random()<0.3){
        createHeart();
      }

      hearts.forEach(h=>h.position.y += 0.05);
    }

    renderer.render(scene,camera);
  }

  animate();
    }
