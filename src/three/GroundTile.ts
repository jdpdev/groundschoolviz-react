import { BoxGeometry, Mesh, MeshLambertMaterial, Object3D } from "three";

export class GroundTile extends Object3D {
    private _mesh: Mesh
    
    constructor() {
        super()

        const geometry = new BoxGeometry()
        const material = new MeshLambertMaterial({
            color: 0x75d675,
            wireframe: false,
        })

        this._mesh = new Mesh(geometry, material)
        this._mesh.receiveShadow = true
        this._mesh.castShadow = false
        this._mesh.scale.x = this._mesh.scale.z = 2
        this._mesh.scale.y = 0.1
        this.add(this._mesh)
    }
}