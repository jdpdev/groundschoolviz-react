import { BoxGeometry, Material, Mesh, MeshLambertMaterial, Object3D, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { randFloat, randInt } from "three/src/math/MathUtils"

export class SceneryGenerator extends Object3D {
    private _trees: Object3D[] = []
    private _aliveTrees: Object3D[] = []

    constructor(radius: number) {
        super()
        this.loadTreeMeshes()
    }

    private loadTreeMeshes() {
        const loader = new GLTFLoader()
        const material = new MeshLambertMaterial({})

        loader.load('assets/models/trees.glb', ( gltf ) => {
            const meshes: Object3D[] = []

            gltf.scene.children.forEach(c => {
                const mesh = c
                mesh.position.y = 0;
                mesh.scale.x = 0.25;
                mesh.scale.z = 0.25;
                mesh.scale.y = 0.25;

                mesh.castShadow = true
                mesh.receiveShadow = false;

                meshes.push(mesh)
            })

            this._trees = meshes

            for (let i = 0; i < 10; i++) {
                this.instantiateTree(randFloat(-0.75, 0.75))
            }
        })
    }

    private instantiateTree(x: number = 1) {
        const index = 0 //randInt(0, this._trees.length - 1)
        const mesh = this._trees[index].clone()
                
        mesh.position.x = x
        mesh.position.z = randFloat(-0.95, 0.95)
        mesh.position.y = 0

        mesh.rotateZ(Math.PI * 2 * Math.random())
        mesh.scale.addScalar(0.1 * randFloat(-1, 1))

        this.add(mesh)
        this._aliveTrees.push(mesh)
    }

    public tick(delta: number) {
        const removes: Object3D[] = []
        const step = 0.25 * delta

        this._aliveTrees.forEach(t => {
            t.position.x -= step

            if (t.position.x < -1) {
                removes.push(t)
            }
        })

        removes.forEach(t => {
            const index = this._aliveTrees.indexOf(t)
            this.remove(t)
            this._aliveTrees.splice(index, 1)
        })

        if (Math.random() > 0.9925) {
            this.instantiateTree()
        }
    }
}