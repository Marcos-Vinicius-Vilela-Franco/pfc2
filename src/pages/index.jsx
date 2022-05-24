import style from '../styles/Window.module.css'
import { useState } from 'react';
import Image from 'next/image';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import firstCodigo from "../img/Capturarpfc2.jpg"
import secondCodigo from '../img/Capturarprfc2-2.jpg'

export default function Home() {
  const [vetor, setvetor] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [string, setString] = useState('');
  const [contorno,setContorno] = useState(0);
  const [contador, setcontador] = useState(0);
  function executar(e) {
    e.preventDefault()
    verificar(string);

    console.log(`string é ${string} + o `)
  }
  function acumular() {
    if (contador <= 9) {
      setContorno(1)
      setcontador(contador + 1);

    }
  }
  function subtrair() {
    if (contador >= 1) {
      setContorno(-1)
      setcontador(contador - 1);
    }else{
      setContorno(0)
    }
  }



  function verificar(string) {
    let cont = contador;
    for (var i = 0; i < string.length; i++) {
      var aux = string[i].toUpperCase();
      if (aux == 'P') {
        cont++;
      } else if (aux == 'C') {
        cont--;
      }
      if (cont <= 0) {
        setcontador(0)
        break
      } else if (cont >= 10) {
        setcontador(10)
        break
      }
    }
    if (cont < 0) {
      setcontador(0)
      setContorno(0)
    } else { 
      setcontador(cont)
    setContorno(1) }



  }


  return (
    <div className={style.window}>
      <div className={style.container1+ ` shadow  bg-body rounded`}>
        <div className={style.topBar}>
          <h1>IPC com memória compartilhada </h1>
          <h3>Problema Produtor-Consumidor</h3>
        </div>

        <div className={style.part1}>
          <div className={style.bufferTitle + ` card text-center  shadow-sm p-3 mb-2 bg-body rounded`}>
            <div className={style.bufferTitle2+` fs-5 card-title`}>Buffer de memória compartilhada</div>
          </div>
          <div className={style.notifications}>
            {(contador == 0) ? <div className="alert alert-danger m-3" role="alert" >Buffer vazio, consumidor esperando pelo produtor</div> : ' '}
            {(contador == 10) ? <div className="alert alert-danger m-3" role="alert" >Buffer cheio, produtor esperando pelo consumidor</div> : ' '}
          </div>
          <div className={style.box}>

            <div className={style.vetor}>
              {vetor.map(item => (<div className={style.vetorCard} key={item} >
                <div className={style.in}> {(item == contador) ? <ArrowDownwardIcon /> : ' '}</div>
                <div className={(item <= contador) ? style.item + ` bg-warning` : style.item}>{item}</div>
                <div className={style.down}> {(item == contador) ? <ArrowUpwardIcon /> : ' '}</div>
              </div>))}
            </div>
          </div>

        </div>
        <div className={style.part2}>
          <h5 className={style.titleButtons}>Sequência de escalonamento</h5>
          <div className={style.boxButtons}>

            <div className={style.buttons + ` container d-flex justify-content-between `}>
              <button type="button" className="btn btn-danger" onClick={subtrair}>Consumidor</button>
              <button type="button" className="btn btn-primary" onClick={acumular}>Produtor</button>
            </div>
            <form onSubmit={executar}>
              <div className={style.formBox + ` input-group`}>
                <input type="text" className="form-control" placeholder="Digite a sequêcia" onChange={(e) => setString(e.target.value)} />
                <div className="input-group-append">
                  <button className="btn btn-success" type="submit">Submeter</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={style.painel2}>
          <div className={style.boxBuffer}>
            <h5 className={style.p0}>Memória</h5>
            <div className={style.p1}><span>P</span></div>
            <div className={style.p2}><span>buffer[10] in, out </span></div>
            <div className={style.p3}><span>C</span></div>
            <div className={style.p4}><span>...</span></div>
            <div className={style.p5}><span>Kernel</span></div>
          </div>
        </div>
        <div className={style.painel3}>
          <div className={style.titleCodigo}><h4>Código em linguamgem C </h4></div>
          <div className={(contorno == 1) ? style.codigo1+ ` shadow p-3  bg-white rounded bg-gradient-success text-white `:style.codigo1}>
            
            <h5 className={(contorno ==1) ? ` text-success`:`text-warning`}>Produtor</h5>
            <Image className={style.img1} src={firstCodigo} alt="codigo1" />
          </div>
          <div className={(contorno == -1) ? style.codigo2+` shadow p-3  bg-white rounded` :style.codigo2}>
            <h5 className={(contorno ==-1) ? ` text-success`:`text-warning`}>Consumidor</h5>
            <Image className={style.img1} src={secondCodigo} alt="codigo2" />
          </div>
        </div>
        <div className={style.footer}>
          <div className="text-center " >
            Marcos Vinicius |
            <a className="text-white text-decoration-none" href="https://computacao.jatai.ufg.br/"> Ciência da computação UFJ</a>
          </div>
        </div>
      </div>
    </div>
  )
}
