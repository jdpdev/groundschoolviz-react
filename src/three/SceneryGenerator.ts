import { BoxGeometry, Material, Mesh, MeshLambertMaterial, Object3D, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { lerp, randFloat, randInt } from "three/src/math/MathUtils"
import { LinkedList } from "../LinkedList"

const marker = 'scenery-measure'

const PI2 = Math.PI / 2
const PI32 = Math.PI + PI2

export class SceneryGenerator extends Object3D {
    private _treeMeshes: Object3D[] = []
    private _treePool: Object3D[] = []
    private _aliveTrees: Object3D[] = []

    constructor(private _radius: number) {
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

            for (let i = 0; i < 20; i++) {
                const index = 0 //randInt(0, this._trees.length - 1)
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

            // bottom
            /*for (let i = 0; i < 10; i++) {
                const tree = this.instantiateTree(randFloat(-0.75, 0.75))

                if (tree) {
                    tree.rotation.set(PI2, PI32, 0)
                    tree.position.y = -0.1
                }
            }*/

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
        const step = 0.25 * delta
        const diff = 0.1
        const edge = this._radius - 0.5
        const zone = edge - diff

        let t: Object3D
        for (let i = 0; i < this._aliveTrees.length; i++) {
            t = this._aliveTrees[i]

            t.position.x -= step

            if (t.position.x < -this._radius) {
                t.position.x = this._radius
                t.position.z = randFloat(-0.9, 0.9)
            }

            /*if (t.position.x < -0.9) {
                const d = (t.position.x + 0.9) / -0.1

                t.rotation.y = t.position.y < 0 
                    ? lerp(Math.PI, PI2, d) 
                    : lerp(0, PI2, d)
            } else if (t.position.x > 0.9) {
                const d = (t.position.x - 0.9) / 0.1

                t.rotation.y = t.position.y < 0 
                    ? lerp(Math.PI, PI32, d) 
                    : lerp(Math.PI * 2, PI32, d)
            }*/
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