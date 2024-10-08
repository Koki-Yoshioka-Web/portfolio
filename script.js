let scene, camera, renderer, textMesh, stars, starGeo;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg"),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = 1;
  }, 100);

  const loader = new THREE.FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      const textGeometry = new THREE.TextGeometry("Koki Yoshioka", {
        font: font,
        size: 20,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });

      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      scene.add(textMesh);
    }
  );

  starGeo = new THREE.BufferGeometry();
  let starVertices = [];
  for (let i = 0; i < 10000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    starVertices.push(star.x, star.y, star.z);
  }
  starGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  let starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa });
  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (textMesh) {
    textMesh.rotation.x += 0.01;
    textMesh.rotation.y += 0.01;
  }

  stars.rotation.x += 0.001;
  stars.rotation.y += 0.001;

  renderer.render(scene, camera);
}

init();

window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
