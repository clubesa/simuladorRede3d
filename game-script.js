// Configurações do Jogo
const WINNING_SCORE = 150;
const NODE_RADIUS = 0.6; 
const AI_COLLECTION_INTERVAL = 2000; 
const NODE_COLLECTABLE_TIME = 1000; 
const NEW_NODES_ON_COLLECT = 3;
const NODE_SIZE_INCREASE_FACTOR = 1.02; 
// MAX_EVENT_LOG_ITEMS não é mais usado diretamente aqui, pois o log está em ui.html

// Cores
const COLOR_IA_COLLECTED = 0xFFFF00;
const COLOR_ORIGINAL_NODE = 0xFF7F00;
const COLOR_PLAYER_COLLECTED = 0xFF007F;
const COLOR_EDGE = 0xFFFFFF; 
const COLOR_NODE_DEFAULT_MATERIAL = 0x007FFF; 

let scene, camera, renderer, controls;
let world; 

// Arrays para armazenar os objetos do jogo
let nodes = []; 
let edges = []; 

// Variáveis de estado do jogo
let playerScore = 0;
let aiScore = 0;
let gameRunning = true;
let nextNodeId = 0;
let lastAICheckTime = 0;

// Elementos da UI (apenas os que pertencem a game.html)
const victoryMessageDiv = document.getElementById('victoryMessage');
const winnerTitle = document.getElementById('winnerTitle');
const finalPlayerScoreDisplay = document.getElementById('finalPlayerScore'); // Renomeado para evitar conflito
const finalAiScoreDisplay = document.getElementById('finalAiScore');       // Renomeado para evitar conflito
const playAgainButton = document.getElementById('playAgainButton');

// Função de inicialização principal do jogo
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30); 
    camera.lookAt(0,0,0); 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); 
    document.getElementById('gameContainer').appendChild(renderer.domElement); 

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false; 
    controls.minDistance = 5; 
    controls.maxDistance = 250; 
    controls.target.set(0,0,0);

    controls.touches = {
        ONE: THREE.TOUCH.NONE !== undefined ? THREE.TOUCH.NONE : null, 
        TWO: THREE.TOUCH.DOLLY_ROTATE 
    };

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    world = new CANNON.World();
    world.gravity.set(0, 0, 0); 
    world.broadphase = new CANNON.NaiveBroadphase(); 
    world.solver.iterations = 10; 

    const nodeMaterial = new CANNON.Material('nodeMaterial');
    const nodeContactMaterial = new CANNON.ContactMaterial(nodeMaterial, nodeMaterial, {
        friction: 0.1, 
        restitution: 0.5 
    });
    world.addContactMaterial(nodeContactMaterial);

    window.addEventListener('resize', onWindowResize, false); 
    renderer.domElement.addEventListener('click', onMouseClick, false); 
    renderer.domElement.addEventListener('touchend', onTouchEnd, false); 
    if(playAgainButton) playAgainButton.addEventListener('click', resetGame); 

    spawnInitialNode();
    animate(); 
}

function spawnInitialNode() {
    createNode(new THREE.Vector3(0, 0, 0), null); 
}

function createNode(position, parentNode = null) {
    const nodeId = nextNodeId++; 
    
    const geometry = new THREE.SphereGeometry(NODE_RADIUS, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: COLOR_NODE_DEFAULT_MATERIAL });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.userData = { id: nodeId, type: 'node', collected: false, collectable: false, connections: 0, baseRadius: NODE_RADIUS };
    scene.add(mesh);

    const initialRadius = NODE_RADIUS; 
    const shape = new CANNON.Sphere(initialRadius); 
    const body = new CANNON.Body({
        mass: 0.8, 
        position: new CANNON.Vec3(position.x, position.y, position.z),
        material: world.materials.find(m => m.name === 'nodeMaterial') || new CANNON.Material('nodeMaterial') 
    });
    body.addShape(shape);
    body.userData = mesh; 
    world.addBody(body);
    
    const nodeObject = { id: nodeId, mesh, body, parentNodeId: parentNode ? parentNode.id : null, connections: 0 };
    nodes.push(nodeObject);

    setTimeout(() => {
        if (nodeObject.mesh && !nodeObject.mesh.userData.collected) { 
            nodeObject.mesh.userData.collectable = true;
            nodeObject.mesh.material.color.setHex(COLOR_ORIGINAL_NODE); 
        }
    }, NODE_COLLECTABLE_TIME);

    if (parentNode) {
        createEdge(nodeObject, parentNode);
        incrementNodeConnections(nodeObject); 
        incrementNodeConnections(parentNode); 
    }
    
    return nodeObject;
}

function incrementNodeConnections(node) {
    node.connections++;
    node.mesh.userData.connections++;
    
    const scaleFactor = Math.pow(NODE_SIZE_INCREASE_FACTOR, node.connections);
    node.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    if (node.body.shapes.length > 0 && node.body.shapes[0] instanceof CANNON.Sphere) {
        node.body.shapes[0].radius = node.mesh.userData.baseRadius * scaleFactor; 
        node.body.updateBoundingRadius(); 
    }
}

function createEdge(node1, node2) {
    const material = new THREE.LineBasicMaterial({ color: COLOR_EDGE, linewidth: 2 });
    const geometry = new THREE.BufferGeometry().setFromPoints([node1.mesh.position, node2.mesh.position]);
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    const desiredDistance = NODE_RADIUS * 5.0; 
    const constraint = new CANNON.DistanceConstraint(
        node1.body, 
        node2.body, 
        desiredDistance, 
        150 
    );
    world.addConstraint(constraint);

    const edgeObject = { line, constraint, node1Id: node1.id, node2Id: node2.id };
    edges.push(edgeObject);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
    if (!gameRunning) return;
    const clickCoords = { x: event.clientX, y: event.clientY };
    performRaycast(clickCoords); 
}

function onTouchEnd(event) {
    if (!gameRunning) return;
    if (event.changedTouches.length === 0) return; 
    const touch = event.changedTouches[0]; 
    const touchCoords = { x: touch.clientX, y: touch.clientY };
    performRaycast(touchCoords); 
}

function performRaycast(coords) {
    const vec = new THREE.Vector2(); 
    const raycaster = new THREE.Raycaster(); 

    vec.x = (coords.x / renderer.domElement.clientWidth) * 2 - 1;
    vec.y = -(coords.y / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(vec, camera); 
    
    const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh), false); 

    if (intersects.length > 0) {
        const intersectedMesh = intersects[0].object; 
        if (intersectedMesh.userData.collectable && !intersectedMesh.userData.collected) {
            collectNode(intersectedMesh.userData.id, 'Jogador'); 
        }
    }
}

function collectNode(nodeId, collector) {
    const node = nodes.find(n => n.id === nodeId); 
    if (!node || node.mesh.userData.collected) return; 

    node.mesh.userData.collected = true;
    node.mesh.userData.collectable = false; 

    let collectionMessage = "";
    const spawnPositionBase = node.mesh.position.clone(); 
    const offsetMultiplier = 9; 

    if (collector === 'Jogador') {
        playerScore++;
        node.mesh.material.color.setHex(COLOR_PLAYER_COLLECTED);
        collectionMessage = `Jogador captou nó ${nodeId}`; 
    } else if (collector === 'IA') {
        aiScore++;
        node.mesh.material.color.setHex(COLOR_IA_COLLECTED);
        collectionMessage = `IA captou nó ${nodeId}`; 
    }

    for (let i = 0; i < NEW_NODES_ON_COLLECT; i++) {
        const offset = new THREE.Vector3(
            (Math.random() - 0.5) * offsetMultiplier, 
            (Math.random() - 0.5) * offsetMultiplier, 
            (Math.random() - 0.5) * offsetMultiplier
        );
        if (offset.lengthSq() < 0.1) offset.x += 0.5 * Math.sign(offset.x || 1); 
        createNode(spawnPositionBase.clone().add(offset), node);
    }

    // Comunicação com ui.html via FlutterFlow
    // Em vez de chamar addEventToLogDOM diretamente:
    if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
        window.flutter_inappwebview.callHandler('updateUI', 'logEvent', collectionMessage, collector.toLowerCase());
    } else {
        console.log(`Evento para UI: ${collectionMessage} (Tipo: ${collector.toLowerCase()})`); // Fallback para console
    }
    
    updateScoreDisplayOnGameSide(); // Atualiza o placar internamente e envia para UI
    checkWinCondition(); 
}

// Atualiza o placar no lado do jogo e envia para ui.html
function updateScoreDisplayOnGameSide() {
    // A pontuação é mantida no game.html
    // Agora, envie para ui.html
    if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
        window.flutter_inappwebview.callHandler('updateUI', 'updateScore', playerScore, aiScore);
    } else {
        console.log(`Placar para UI: Jogador ${playerScore}, IA ${aiScore}`); // Fallback
    }
}


function aiTurn(currentTime) {
    if (!gameRunning || currentTime - lastAICheckTime < AI_COLLECTION_INTERVAL) return;
    lastAICheckTime = currentTime;

    const collectableNodes = nodes.filter(n => n.mesh.userData.collectable && !n.mesh.userData.collected);
    if (collectableNodes.length > 0) {
        collectableNodes.sort((a, b) => a.mesh.userData.connections - b.mesh.userData.connections);
        const nodeToCollect = collectableNodes[0];
        collectNode(nodeToCollect.id, 'IA');
    }
}

function applyForces() {
    const centerAttractionForce = 0.002; 
    const repulsionStrength = 4.0; 
    const minRepulsionDistance = NODE_RADIUS * 6.0; 

    for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (!nodeA.body) continue; 
        
        const forceToCenter = nodeA.body.position.clone().negate().scale(centerAttractionForce * nodeA.body.mass);
        nodeA.body.applyForce(forceToCenter, nodeA.body.position);

        for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];
            if (!nodeB.body) continue; 
            
            const diff = new CANNON.Vec3();
            nodeA.body.position.vsub(nodeB.body.position, diff);
            const distance = diff.length();
            
            if (distance > 0.01 && distance < minRepulsionDistance) { 
                const isConnected = edges.some(edge => 
                    (edge.node1Id === nodeA.id && edge.node2Id === nodeB.id) ||
                    (edge.node1Id === nodeB.id && edge.node2Id === nodeA.id)
                );

                if (!isConnected) { 
                    const forceMagnitude = repulsionStrength / (distance * distance + 0.01); 
                    diff.normalize();
                    const force = diff.scale(forceMagnitude);
                    nodeA.body.applyForce(force, nodeA.body.position);
                    nodeB.body.applyForce(force.negate(), nodeB.body.position); 
                }
            }
        }
    }
}

function checkWinCondition() {
    if (!gameRunning) return;
    let winner = null;
    if (playerScore >= WINNING_SCORE) winner = 'Jogador';
    else if (aiScore >= WINNING_SCORE) winner = 'IA';

    if (winner) {
        gameRunning = false;
        if(winnerTitle) winnerTitle.textContent = `${winner} Venceu!`;
        if(finalPlayerScoreDisplay) finalPlayerScoreDisplay.textContent = `Jogador: ${playerScore}`;
        if(finalAiScoreDisplay) finalAiScoreDisplay.textContent = `IA: ${aiScore}`;
        if(victoryMessageDiv) victoryMessageDiv.style.display = 'block';
        
        if (winner === 'Jogador' && victoryMessageDiv) {
             victoryMessageDiv.style.backgroundColor = `#${COLOR_PLAYER_COLLECTED.toString(16).padStart(6, '0')}`;
        } else if (victoryMessageDiv) {
             victoryMessageDiv.style.backgroundColor = `#${COLOR_IA_COLLECTED.toString(16).padStart(6, '0')}`;
        }
    }
}

function resetGame() {
    for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        scene.remove(node.mesh);
        if (node.body) { 
            world.removeBody(node.body);
        }
    }
    nodes = [];

    for (let i = edges.length - 1; i >= 0; i--) {
        const edge = edges[i];
        scene.remove(edge.line);
        if (edge.constraint) { 
             world.removeConstraint(edge.constraint);
        }
    }
    edges = [];

    playerScore = 0;
    aiScore = 0;
    
    // Envia comando para resetar UI para FlutterFlow
    if (window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
        window.flutter_inappwebview.callHandler('updateUI', 'updateScore', 0, 0);
        window.flutter_inappwebview.callHandler('updateUI', 'clearLog');
    } else {
        console.log("Reset UI: Placar 0, IA 0, Log Limpo"); // Fallback
    }

    nextNodeId = 0;
    lastAICheckTime = 0;
    if(victoryMessageDiv) victoryMessageDiv.style.display = 'none';
    
    camera.position.set(0, 15, 30);
    camera.lookAt(0,0,0);
    controls.target.set(0,0,0);
    controls.update();
    
    gameRunning = true;
    spawnInitialNode();
}

let lastTime = 0;
function animate(currentTime = 0) {
    requestAnimationFrame(animate); 
    
    const deltaTime = (currentTime - lastTime) / 1000 || 1/60; 
    lastTime = currentTime;

    controls.update(); 

    if (gameRunning) {
         applyForces(); 
         world.step(1 / 60, deltaTime, 3); 
         aiTurn(currentTime);
    }

    for (const node of nodes) {
        if (node.mesh && node.body) { 
            node.mesh.position.copy(node.body.position);
            node.mesh.quaternion.copy(node.body.quaternion);
        }
    }

    for (const edge of edges) {
        const node1 = nodes.find(n => n.id === edge.node1Id);
        const node2 = nodes.find(n => n.id === edge.node2Id);
        if (node1 && node1.mesh && node2 && node2.mesh) { 
            const pos1 = node1.mesh.position;
            const pos2 = node2.mesh.position;
            const positions = edge.line.geometry.attributes.position;
            positions.setXYZ(0, pos1.x, pos1.y, pos1.z);
            positions.setXYZ(1, pos2.x, pos2.y, pos2.z);
            positions.needsUpdate = true;
        }
    }
    
    renderer.render(scene, camera);
}

// Garante que o DOM esteja carregado antes de tentar obter elementos e iniciar o jogo
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
