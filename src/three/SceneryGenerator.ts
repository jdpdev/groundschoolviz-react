import { BoxGeometry, Material, Mesh, MeshLambertMaterial, Object3D, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { randFloat, randInt } from "three/src/math/MathUtils"
import { LinkedList } from "../LinkedList"

const marker = 'scenery-measure'

export class SceneryGenerator extends Object3D {
    private _treeMeshes: Object3D[] = []
    private _treePool: Object3D[] = []
    private _aliveTrees: Object3D[] = []

    constructor(radius: number) {
        super()

        //this._treePool = new LinkedList<Object3D>()
        //this._aliveTrees = new LinkedList<Object3D>()

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

            this._treeMeshes = meshes

            for (let i = 0; i < 10; i++) {
                const index = 0 //randInt(0, this._trees.length - 1)
                const mesh = this._treeMeshes[index].clone()

                this._treePool.push(mesh)
            }

            for (let i = 0; i < 10; i++) {
                this.instantiateTree(randFloat(-0.75, 0.75))
            }

            performance.mark(marker)
        })
    }

    private instantiateTree(x: number = 1) {
        const mesh = this._treePool.shift()

        if (mesh) {
            mesh.position.x = x
            mesh.position.z = randFloat(-0.95, 0.95)
            mesh.position.y = 0

            mesh.rotateZ(Math.PI * 2 * Math.random())
            mesh.scale.addScalar(0.1 * randFloat(-1, 1))

            this.add(mesh)
            this._aliveTrees.push(mesh)
        }
    }

    public tick(delta: number) {
        const step = 0.25 * delta

        let t: Object3D
        for (let i = 0; i < this._aliveTrees.length; i++) {
            t = this._aliveTrees[i]
            t.position.x -= step

            if (t.position.x < -1) {
                t.position.x = 1
            }
        }

        /*this._aliveTrees.forEach(t => {
            t.position.x -= step

            if (t.position.x < -1) {
                t.position.x = 1
                //this._aliveTrees.splice(t)
                //this._treePool.push(t)
                //this.remove(t)
            }
        })*/

        /*if (Math.random() > 0.9925) {
            this.instantiateTree()
        }*/
    }
}