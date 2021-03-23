<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="/">Inscripción de usuarios</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendInfoPersonal">
                <div class="form-group">
                  <input type="text" v-model="infoPersonal.nombre" class="form-control" placeholder="Ingrese un nombre">
                </div>
                <div class="form-group">
                  <input type="text" v-model="infoPersonal.apellidos" class="form-control" placeholder="Ingrese los apellidos">
                </div>
                <div class="form-group">
                  <input type="text" v-model="infoPersonal.edad" class="form-control" placeholder="Ingrese la edad">
                </div>
                <div class="form-group">
                  <input type="text" v-model="infoPersonal.trabajo" class="form-control" placeholder="Ingrese si tiene trabajo">
                </div>
                <div class="form-group">
                  <input type="text" v-model="infoPersonal.comida" class="form-control" placeholder="Ingrese la comida que le gusta">
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Edit</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Edad</th>
                <th>Trabajo</th>
                <th>Comida</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="infoPersonal of infoPersonals">
                <td>{{infoPersonal.nombre}}</td>
                <td>{{infoPersonal.apellidos}}</td>
                <td>{{infoPersonal.edad}}</td>
                <td>{{infoPersonal.trabajo}}</td>
                <td>{{infoPersonal.comida}}</td>
                <td>
                  <button @click="deleteInfoPersonal(infoPersonal._id)" class="btn btn-danger">Delete</button>
                  <button @click="editInfoPersonal(infoPersonal._id)" class="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
class InfoPersonal {
  constructor(nombre = '', apellidos = '', edad = '', trabajo = '', comida = '', ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.trabajo = trabajo;
    this.comida = comida;
  }
}

export default {
  data() {
    return {
      infoPersonal: new InfoPersonal(),
      infoPersonals: [],
      edit: false,
      infoPersonalToEdit: ''
    }
  },
  //Método de Vue que se utiliza para llamar los datos iniciales de la app
  created() {
    this.getInfoPersonals();
  },
  methods: {
      //Método para crear un usuario
    sendInfoPersonal() {
      if(this.edit === false) { //Validación para saber si estoy editando o creando un usuario
        fetch('/api/infoPersonals', {
          method: 'POST',
          body: JSON.stringify(this.infoPersonal),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getInfoPersonals();
            this.infoPersonal = new InfoPersonal();
          });
      }
      else { //Solicitud que utilizaré en caso de que este actualizando
        fetch('/api/infoPersonals/' + this.infoPersonalToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.infoPersonal),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getInfoPersonals();
            this.infoPersonal = new InfoPersonal();
            this.edit = !this.edit;
          });
      }
    },
    //Método para obtener a los usuarios
    getInfoPersonals() {
      fetch('/api/infoPersonals')
        .then(res => res.json())
        .then(data => {
          this.infoPersonals = data;
        });
    },
    //Método para eliminar a los usuarios
    deleteInfoPersonal(infoPersonalId) {
      fetch('/api/infoPersonals/' + infoPersonalId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getInfoPersonals();
        });
    },
    //Método para actualizar a los usuarios
    editInfoPersonal(infoPersonalId) {
      fetch('/api/infoPersonals/' + infoPersonalId)
        .then(res => res.json())
        .then(data => {
          const { _id, nombre, apellidos, edad, trabajo, comida } = data;
          this.infoPersonal = new InfoPersonal(nombre, apellidos, edad, trabajo, comida);
          this.infoPersonalToEdit = _id;
          this.edit = true;
        });
    }   
  }
}
</script>