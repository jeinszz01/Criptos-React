import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Heading = styled.h1 `
  font-family: 'lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
// Sub elemento
  &::after {
    content: '';
    width: 150px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`
//las imagenes tienen un display inline
const Imagen = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [monedas, setMonedas] = useState({}) //se llenara con los datos del formulario
  const [cotizacion, setCotizacion] = useState({}) //almacenamos el resultado de la moneda
  const [cargando, setCargando] = useState(false) //creando el spiner de carga
  
  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () => {
        setCargando(true) // una vez q carge la consulta pasara a false
        setCotizacion({}) //resetear a un objeto basio y luego se llenara
        const {moneda, criptomoneda} = monedas //destructuring para el link
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //accedemos a las propiedades de la API de forma dinamica al elegir
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas}/>
        
        {cargando && <Spinner/>}
        {cotizacion.PRICE && <Resultado cotizacion={cotizacion}/>}
      </div>
    </Contenedor>
    
  )
}

export default App
