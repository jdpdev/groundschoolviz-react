import { BoxGeometry, Material, Mesh, MeshLambertMaterial, Object3D } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Airplane extends Object3D {
    private _material!: Material
    private _mesh: Object3D | null = null

    constructor() {
        super()

        this._material = new MeshLambertMaterial({})
        this.makeAirplaneMesh(this._material)
    }

    private makeAirplaneMesh(material: Material) {
        const loader = new GLTFLoader()
        loader.load('assets/models/airplane.glb', ( gltf ) => {

            //const mesh = gltf.scene.children[ 0 ];

            gltf.scene.children.forEach(c => {
                const mesh = c
                const s = 0.1;
                mesh.scale.set( s, s, s );
                mesh.position.y = 0;

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                this.add( mesh )
                this._mesh = mesh
            })
        })
    }

    public tick(time: number, delta: number) {
        if (this._mesh == null) return

        this._mesh.position.z = Math.sin(time) * 0.04
        this._mesh.position.y = Math.sin(time * 1.3) * 0.01

        this._mesh.rotation.x = this._mesh.position.z
    }
}
