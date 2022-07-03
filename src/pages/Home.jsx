import style from '../styles/Window.module.css'
import { useState } from 'react';
import Image from 'next/image';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';
// import firstCodigo from "./img/Capturarpfc2.jpg"
// import secondCodigo from './img/Capturarprfc2-2.jpg'
import { motion } from "framer-motion";
import Link from 'next/link';
class CircularQueue {
  #list;
  #capacity;
  #tail = -1;
  #head = -1;
  #size = 0;

  constructor(capacity = 10) {
    this.#capacity = Math.max(Number(capacity), 0) || 10;
    this.#list = Array.from({ length: this.#capacity });
  }

  get size() {
    return this.#size;
  }
  get list() {
    return this.#list;
  }

  get isFull() {
    return this.size === this.#capacity;
  }

  get isEmpty() {
    return this.size === 0;
  }
  get tail() {
    return this.#tail;
  }
  get head() {
    return this.#head;
  }

  enqueue(item) {
    if (!this.isFull) {
      this.#tail = (this.#tail + 1) % this.#capacity;
      this.#list[this.#tail] = item;
      this.#size += 1;

      if (this.#head === -1) {
        this.#head = this.#tail;
      }
    }

    return this.#tail;
  }

  dequeue() {
    let item = null;
    let aux = null;
    if (!this.isEmpty) {
      item = this.#list[this.#head];
      delete this.#list[this.#head];
      aux = this.#head;
      this.#head = (this.#head + 1) % this.#capacity;
      this.#size -= 1;

      if (!this.size) {
        this.#head = -1;
        this.#tail = -1;
      }
    }
    return aux;
  }

  peek() {
    return this.#list[this.#head];
  }

  toString() {
    return this.#list.filter((el) => el !== undefined).toString();
  }
}


const cq = new CircularQueue(10);
cq.enqueue(1);

export default function Home() {

  const [vetor, setvetor] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [string, setString] = useState('');
  const [contorno, setContorno] = useState(0);
  const [contador, setcontador] = useState(0);
  const [showHelp, setShowHelp] = useState(false);


  function popUp() {
    setShowHelp(true)
  }
  function popUpClose() {
    setShowHelp(false)
  }

  function executar(e) {
    e.preventDefault()
    verificar(string);

    console.log(`string é ${string} + o `)
  }
  function acumular() {

    if (contador < 9) {
      const aux = cq.enqueue(1);
      setContorno(1)
      setcontador(state => state + 1);

    }

  }
  function subtrair() {

    if (cq.size > 1) {
      cq.dequeue();
      setContorno(-1)
      setcontador(state => state - 1);
    }
    // else {
    //   setContorno(0)
    // }
  }


  let instrucoes = [];

  function setInstrucoes() {
    for (var i = 0; i < string.length; i++) {
      var aux = string[i].toUpperCase();
      instrucoes.push(aux)
    }
  }
  async function verificar(string) {
    // let cont = contador;
    setInstrucoes()


    for (const aux of instrucoes) {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (aux == 'P') {
        // cont++;
        acumular()
      } else if (aux == 'C') {
        // cont--;
        subtrair()
      }
    }

  } const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2
      }
    }
  };

  const item1 = {
    hidden: { y: 1, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  function zerar() {
    location.reload()
  }

  return (
    <div className={style.window}>

      <div className={style.container1 + ` shadow  bg-body rounded`}>
        <div className={style.topBar}>
          <div className={style.buttonVoltar} nClick={zerar}>
            <Link href="/" >
              <a className='text-light '><ArrowBackIcon /></a>
            </Link>
          </div>
          <div className={style.titles}>
            <h1>IPC com memória compartilhada </h1>
            <h3>Problema Produtor-Consumidor</h3>
          </div>
          <div className={style.reload} onClick={zerar}>

            <div className='text-light p-2'><CachedIcon /></div>

          </div>
        </div>

        <div className={style.part1}>
          <div className={style.bufferTitle + ` card text-center  shadow-sm p-2  bg-body rounded`}>
            <div className={style.bufferTitle2 + ` fs-5 card-title`}>Buffer de memória compartilhada</div>
          </div>
          <div className={style.notifications}>
            {(contador == 0) ? <div className="alert alert-danger m-3" role="alert" >Buffer vazio, consumidor esperando pelo produtor</div> : ' '}
            {(contador == 9) ? <div className="alert alert-danger m-3" role="alert" >Buffer cheio, produtor esperando pelo consumidor</div> : ' '}
          </div>
          <div className={style.box}>

            <motion.div variants={container} initial="hidden" animate="visible" className={style.vetor}>
              {vetor.map((item, i) => (<div className={style.vetorCard} key={Math.random()} >
                <div className={style.in}> {(i == cq.tail) ? <div className='d-flex flex-column align-items-center'> <span className='text-success'>in</span> <ArrowDownwardIcon /></div> : ' '}</div>
                <motion.div variants={item1} className={(1 == cq.list[i] && contador > 0 && i != cq.tail) ? style.item + ` bg-warning` : style.item}>{i}</motion.div>
                <div className={style.down}> {(i == cq.head && contador > 0) ? <div className='d-flex flex-column align-items-center'> <ArrowUpwardIcon /><span className='text-danger'>out</span>  </div> : ' '}</div>
                <div className={style.down}> {(cq.size == 1 && i == cq.tail) ? <div className='d-flex flex-column align-items-center'> <ArrowUpwardIcon /><span className='text-danger'>out</span>  </div> : ' '}</div>

              </div>
              ))}
            </motion.div>
          </div>

        </div>
        <div className={style.part2}>
          <h5 className={style.titleButtons}>Sequência de escalonamento</h5>
          <div className={style.boxButtons}>

            <div className={style.buttons + ` container d-flex justify-content-between `}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-danger" onClick={subtrair}>Consumidor</motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-success" onClick={acumular}>Produtor</motion.button>
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

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={style.boxBuffer}>
            <div className={style.p0 + ` pb-3`}>Memória</div>
            <div className={(contorno == 1) ? style.p1 + ` bg-success ` : style.p1 + ` text-white`}><span>P</span></div>
            <div className={style.p2}><span>buffer[10] in, out </span></div>
            <div className={(contorno == -1) ? style.p3 + ` bg-success` : style.p3 + ` text-white`}><span>C</span></div>
            <div className={style.p4}><span>...</span></div>
            <div className={style.p5}><span>Kernel</span></div>
          </motion.div>
        </div>
        <div className={style.painel3}>
          <div className={style.titleCodigo}><h4>Código em linguagem C </h4></div>
          <div className={(contorno == 1) ? style.codigo1 + ` shadow p-3  bg-white rounded bg-gradient-success text-white ` : style.codigo1}>

            <h5 className={(contorno == 1) ? ` text-success` : `text-warning`}>Produtor</h5>
            <Image className={style.img1} src="/Capturarpfc2.JPG" alt="codigo1" width={370} height={200} />
          </div>
          <div className={(contorno == -1) ? style.codigo2 + ` shadow p-3  bg-white rounded` : style.codigo2}>
            <h5 className={(contorno == -1) ? ` text-success` : `text-warning`}>Consumidor</h5>
            <Image className={style.img1} src="/Capturarpfc2-2.JPG" width={370} height={200} alt="codigo2" />
          </div>
          <div className={style.popUp}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-success " onClick={popUp}>Ajuda</motion.button>
            {showHelp ?
              <div className={style.ajuda}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }} className={style.conteudoPopUp + ` card`}>
                  <div className={style.menuPopUp + ` card-header`}>
                    <div className={style.popUpTitle + ` card-title`}>Ajuda</div>
                    <div className={style.btnPopUp}>

                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-danger btn-sm " onClick={popUpClose}><CloseIcon /></motion.button>

                    </div>
                  </div>
                  <div className={style.textoPopUp + ` card-body p-5`}>
                    <div className='p3'>Este problema, também conhecido como problema de
                      buffer limitado, inclui coordenar o acesso de processos a um buffer compartilhado cuja
                      capacidade de armazenamento é limitada a 10 itens (neste exemplo). Para tanto, simularemos dois processos:
                      <ul>
                        <li className='p-3'> Produtor: Produz e insere um item no buffer em caso de haver um espeço. Caso
                          contrário, será necessário esperar até que haja uma vaga. Ao depositar um item, o
                          produtor ocupará um espaço livre.
                        </li>

                        <li className='p-3'> Consumidor: Consumirá um item do buffer, se estiver vazio, será necessário esperar
                          o produtor depositar um novo item. Ao consumir um item, o consumidor gera um
                          espaço livre.
                        </li>
                      </ul>
                    </div>
                    <div className='p-3'>Para executar uma sequência automaticamente use &quot;p&quot; para inserir (produtor) e &quot;c&quot; para consumir (consumidor), em seguida clique em executar. Exemplo de uma sequência: &quot;pppcppccpcpc&quot;.</div>
                  </div>

                </motion.div>
              </div>
              : null}
          </div>
        </div>
        <div className={style.footer}>
          <div className="text-center " >
            Marcos Vinicius Vilela Franco |
            <a className="text-white text-decoration-none" href="https://computacao.jatai.ufg.br/"> Ciência da computação UFJ</a>
          </div>
        </div>
      </div>
    </div>
  )
}
