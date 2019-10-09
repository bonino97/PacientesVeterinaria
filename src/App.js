import React, {Component} from 'react';
import './bootstrap.min.css';

import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  state = {
    citas:[]
  }

  //CUANDO LA APLICACION CARGA.
  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS) 
      })
    }
  }

  //CUANDO ELIMINAMOS O AGREGAMOS UNA NUEVA CITA.

  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    //COPIAR EL STATE ACTUAL.
    const citas = [...this.state.citas,datos];
    //AGREGAR EL NUEVO STATE.
    this.setState({
      citas:citas
    });
  }

  //ELIMINA LA CITA DEL STATE

  eliminarCita = id =>{
    // TOMAR UNA COPIA DEL STATE.
    const citasActuales = [...this.state.citas];

    //UTILIZAR FILTER PARA SACAR EL ELEMENTO @ID DEL ARREGLO
    const citas = citasActuales.filter(cita => cita.id !== id) 

    //ACTUALIZAR EL STATE
    this.setState({
      citas
    })
  }

  render() { 
    return (
      <div className="container"> 
        <Header 
          titulo='Administrador Pacientes Veterinaria'
        />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas = {this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;

