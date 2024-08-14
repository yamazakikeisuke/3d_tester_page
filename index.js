window.addEventListener("DOMContentLoaded", init);

function init() {
    const width = 1000;
    const height = 540;

    // レンダラーを作成
    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvasElement,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0,-5000,4000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //camera.rotation.order = "ZYX";
    //camera.rotation.x = 0.8;

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // 環境光源を作成
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 1;
    directionalLight.position.set(1, 3, 1);
    scene.add(directionalLight);

    // 3Dモデルの読み込み
    const objLoader = new THREE.OBJLoader();
    objLoader.load(
        './test_____2.obj',
        function (obj) {
            scene.add(obj);
            obj.position.x = -50;
            obj.position.y = -100;
        },
    );
    //平面追加
    //const size = 10000;
    //const divisions = 10000;
    //const gridHelper = new THREE.GridHelper( size, divisions );
    //scene.add( gridHelper );

    //軸追加
    const size_axis = 5000;
    const axesHelper = new THREE.AxesHelper( size_axis );
    scene.add( axesHelper );

    tick();

    function tick() {
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
}