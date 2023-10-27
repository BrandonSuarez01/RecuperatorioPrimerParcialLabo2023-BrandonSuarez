class Persona {
    constructor(id, nombre, apellido, edad){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
    }
}

export class Heroe extends Persona{
    constructor(id, nombre, apellido, edad, alterego, ciudad, publicado){
        super(id, nombre, apellido, edad);
        this.alterego=alterego;
        this.ciudad=ciudad;
        this.publicado=publicado;
    }
}

export class Villano extends Persona{
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos){
        super(id, nombre, apellido, edad);
        this.enemigo=enemigo;
        this.robos=robos;
        this.asesinatos=asesinatos;
    }
}
