import style from "../styles/RR.module.css"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    esvaziar() {
        let i, aux;
        aux = this.#size;
        for (i = 0; i < aux; i++) {
            this.dequeue();
        }
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


const cq = new CircularQueue(5);

let listaProntos = []// Array.from({length:5})
let listaExe = [];
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};


export default function RR() {

    const [vetor, setvetor] = useState([1, 2, 3, 4, 5]);
    const [timer, setTimer] = useState(400);
    const [contador, setContador] = useState(0);
    const [quantum, setQuantum] = useState(300)
    const [executanto, setExecutando] = useState(-1);
    const [contadorProntos, setContadorProntos] = useState(0);
    const [isOn, setIsOn] = useState(false);
   
    function toggleSwitch () { 
        cq.list.sort()
        setIsOn(!isOn);
        
       
        
    }
     

    console.log(cq.list)


    function addTimer() {
        setTimer(timer + 100)
    }
    function removeTimer() {
        if (timer > 100) {
            setTimer(timer - 100)
        }
    }

    function add() {

        if (contador <= 5) {

            cq.enqueue(timer);
            listaExe.push(timer);
            setContador(contador + 1);

        }
    }
    function remove() {
        if (contador > 0) {
            cq.dequeue()
            setContador(contador - 1)
            listaExe.shift()
        }

    }

    function acao() {
        setExecutando(state => state + 1);

    }
    function acao2() {
        let x = cq.head;
        //console.log("veio aqui o x é "+ x)
        setExecutando(x);

    }

    function somarContador() {
        setContadorProntos(contadorProntos + 1);
        //  console.log("ta aqui")
    }
    
    function off(){
        setIsOn(false);
    }
    
       
    


    async function start() {
        let i = 0, aux2, cont = 0;
        acao2();
        
        somarContador(0);
        listaProntos.length = 0;
        if (i = cq.head == 0) {
            for (i = cq.head; !cq.isEmpty; i++) {
                await new Promise(resolve => setTimeout(resolve, quantum))
                // console.log("o i é:" + i);

                if (cq.list[i] > 0) {

                    aux2 = cq.list[i] - quantum;
                    if (aux2 > 0) {
                        cq.list[i] = aux2;
                    } else {

                        listaProntos.push(i);
                        somarContador();
                        //console.log(listaProntos);
                        cq.list[i] = 0;
                    }
                }
                if (cq.peek() == 0) {
                    cq.dequeue()
                }
                //console.log("i:" + i + "executando:" + executanto);
                if (i == cq.tail || executanto == 5) {
                    i = cq.head - 1;
                    acao2()
                } else {
                    acao()
                }
                cont++;
                // console.log("valor de i:" + i +" valor de tail:"+cq.tail + " e head é:"+ cq.head)
            }


            // i = 0;
            // cont=listaExe.length;
            // while ( cont> 0) {
            //     await new Promise(resolve => setTimeout(resolve, quantum))

            //     // console.log(listaExe.length + " tamanho")

            //     if (i >= listaExe.length) {
            //         i = 0;
            //         acaoVoltar()
            //         // console.log("ta aqui")
            //     }
            //     if (listaExe[i] > 0) {
            //         if(executanto<5){acao()}

            //         let help;
            //         help = listaExe[i] - quantum;
            //         if (help > 0) {
            //             listaExe[i] = help;

            //         } else {
            //             //listaProntos.push(i);
            //             somarContador();
            //             listaExe[i]=0;
            //             //listaExe.splice(i, 1);
            //             cont--;


            //             // i--;
            //         }

            //     }


            //     console.log("esse é o i " + i + "| tamanho: " + listaExe.length)
            //     //console.log(listaExe + " essa")

            //     i++;
            // }
        } else {
            alert("comando inválido, para este exemplo é nessessário começar da primeira posição")
            //console.log(cq.size+ " tamanho")
            cq.esvaziar()
        }
        setContador(0);
        acao2();
        off();
        

    }

    function addQuantum() {
        setQuantum(quantum + 100);
    }
    function subtrairQuantum() {
        if (quantum > 100) {
            setQuantum(quantum - 100);
        }
    }

    return (
        <div className={style.container1}>
            <div className="container bg-white">
                <div className={style.caontainerMain}>
                    <div className={style.topBar}>
                        <div className={style.buttonVoltar}><a className='text-light' href="/"><ArrowBackIcon /></a></div>
                        <div className={style.title + ` display-4 text-center pt-4 text-white`}>Escalonamento de CPU Preemptivo</div>
                    </div>
                    <div className={style.part1}>

                        <div className={style.painel1 + ` d-flex align-items-center p-2`}>
                            <div className={style.bufferTitle + ` card text-center  shadow-sm p-2  bg-body rounded`}>
                                <div className={style.bufferTitle2 + ` fs-5 card-title`}>Fila de Processos </div>
                            </div>
                            <div className={style.fila}>
                                {vetor.map((item, i) => (<div key={i} className={(executanto == i) ? style.item + ` bg-danger` : style.item}>{(cq.list[i] != undefined) ? cq.list[i] : ''} </div>))}
                            </div>


                        </div>
                        <div className={style.painel2 + ` d-flex  flex-column align-items-center`}>
                            <div className={style.boxTungle}>
                                <h4 className="" >Ordenar</h4>
                                <div className={style.switch} data-isOn={isOn} onClick={toggleSwitch}>
                                    <motion.div className={style.handle} layout transition={spring} />
                                </div>
                            </div>
                            <div className={style.boxButton + ` d-flex flex-column`}>


                                <div className={style.spanTimer}>
                                    <h3 className={style.texto}>Tempo de execução para cada processo: {timer} Un.t</h3>
                                </div>
                                <div className="d-flex justify-content-around m-3 mb-5">
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={style.buttonsInc + ` p-2 rounded-circle`} onClick={removeTimer} ><RemoveIcon /></motion.div>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.buttonsInc + ` p-2 rounded-circle`} onClick={addTimer}><AddIcon /></motion.div>

                                </div>
                                <div className={style.buttons + ` input-group d-flex justify-content-between pb-3`}>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-danger" onClick={remove}>Remover</motion.button>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-success" onClick={add}>Adicionar</motion.button>
                                </div>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-success mt-2" onClick={start}>Executar</motion.button>
                            </div>
                        </div>
                    </div>
                    <div className={style.part2}>
                        <div className={style.cpuArea}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.cpu}>
                                <div className={(executanto != -1) ? style.cpuFront + ` text-danger` : style.cpuFront}><span>CPU</span>{(executanto > -1) ? `Processo ` + executanto : ''}</div >
                            </motion.div>
                            <div className={style.quantumBox}>
                                <div className="d-flex flex-column ">
                                    <div className="text-center display-6"> Quantum: {quantum} Un.t</div>
                                    <div className="d-flex justify-content-around  m-3">
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={style.buttonsInc + ` p-2 rounded-circle`} onClick={subtrairQuantum} ><RemoveIcon /></motion.div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.buttonsInc + ` p-2 rounded-circle`} onClick={addQuantum}><AddIcon /></motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={` d-flex flex-column align-items-center justify-content-center p-2`}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={style.vetorProntos}>
                                <span className={style.spanVetor}>Processos Prontos</span>
                                {vetor.map((item, i) => (<div key={i} className={style.cardVetor}>
                                    <div className={style.position}>{i + 1 + `°`}</div>
                                    <div className={style.item2}>{(listaProntos[i] == undefined) ? '' : `Processo ` + listaProntos[i]} </div>
                                </div>))}
                            </motion.div >
                        </div>
                    </div>
                    <div className={style.footer}>
                        <div className="text-center pt-2" >
                            Marcos Vinicius Vilela Franco |
                            <a className="text-white text-decoration-none" href="https://computacao.jatai.ufg.br/"> Ciência da computação UFJ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}