import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function CubeWithCV() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Light background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6; // Move the camera further for a larger cube

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // OrbitControls for camera movement (faster user-controlled rotation)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1.5;
    controls.zoomSpeed = 1.2;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create a cube geometry
    const geometry = new THREE.BoxGeometry(3, 3, 3); // Increased cube size

    // Create canvases with text for each face of the cube
    const createTextTexture = (text) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 1024; // Larger canvas for better text quality
      canvas.height = 1024;

      // Background color
      context.fillStyle = '#333';  // Dark gray background for the text
      context.fillRect(0, 0, 1024, 1024);

      // Text style
      context.fillStyle = '#ffffff'; // White text
      context.font = 'bold 50px Arial'; // Larger, clearer text
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Split the text into multiple lines if it's too long
      const lines = text.split('\n');
      lines.forEach((line, index) => {
        context.fillText(line, 512, 450 + index * 60); // Adjust line spacing
      });

      // Create texture
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // Define the text for each face of the cube
    const materials = [
      new THREE.MeshBasicMaterial({ map: createTextTexture("Fatrah Ahmed\n+212 643-811028\nfatrah.ahmed@gmail.com") }),
      new THREE.MeshBasicMaterial({ map: createTextTexture("MIAGE Engineering Student\nSeeking PFE Internship\nSkills: Adaptability, Rigor, Punctuality") }),
      new THREE.MeshBasicMaterial({ map: createTextTexture("Skills\nJava, Python, SQL\nReact, Spring Boot, .NET\nDocker, Linux, Git") }),
      new THREE.MeshBasicMaterial({ map: createTextTexture("Experience\nKabo Medias (2024)\nZaim Digital (2023)\nBotsfactory (2021)") }),
      new THREE.MeshBasicMaterial({ map: createTextTexture("Academic Projects\nPassword Manager w/ Facial Recognition\nKanban Task App\nNetflix Data Analysis") }),
      new THREE.MeshBasicMaterial({ map: createTextTexture("Education\nEMSI, Marrakech\nOFPPT ISGI Khouribga\nBaccalaureate (Science)") }),
    ];

    // Create the cube mesh and apply the textures
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Add edges to the cube for better visibility
    const edges = new THREE.EdgesGeometry(geometry); 
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // White edges for contrast
    const line = new THREE.LineSegments(edges, lineMaterial);
    scene.add(line);

    // Animation loop (no cube rotation, user-controlled rotation only)
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls for smooth movement
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div />;
}

export default CubeWithCV;
