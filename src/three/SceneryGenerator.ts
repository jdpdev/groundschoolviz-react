import { Object3D } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { randFloat } from "three/src/math/MathUtils"

const marker = 'scenery-measure'

const PI2 = Math.PI / 2

export class SceneryGenerator extends Object3D {
    private _treeMeshes: Object3D[] = []
    private _treePool: Object3D[] = []
    private _aliveTrees: Object3D[] = []

    constructor(private _radius: number) {
        super()
        this.loadTreeMeshes()
    }

    private loadTreeMeshes() {
        const loader = new GLTFLoader()

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

            this._treeMeshes = meshes

            for (let i = 0; i < 20; i++) {
                const index = 0
                const mesh = this._treeMeshes[index].clone()

                this._treePool.push(mesh)
            }

            // top
            for (let i = 0; i < 10; i++) {
                const tree = this.instantiateTree(randFloat(-0.95, 0.95))
                    
                if (tree) {
                    tree.rotation.set(PI2, 0, 0)
                }
            }

            performance.mark(marker)
        })
    }

    private instantiateTree(x: number = 1) {
        const mesh = this._treePool.shift()

        if (mesh) {
            mesh.position.x = x
            mesh.position.z = randFloat(-0.9, 0.9)
            mesh.position.y = 0

            //mesh.rotateZ(PI2 * Math.random())
            mesh.rotation.set(0, 0, 0)
            mesh.scale.addScalar(0.1 * randFloat(-1, 1))

            this.add(mesh)
            this._aliveTrees.push(mesh)
        }

        return mesh
    }

    public tick(delta: number) {
        const step = 0.15 * delta

        for (let i = 0; i < this._aliveTrees.length; i++) {
            const t = this._aliveTrees[i]

            t.position.x -= step

            if (t.position.x < -this._radius) {
                t.position.x = this._radius
                t.position.z = randFloat(-0.9, 0.9)
            }
        }
    }
}