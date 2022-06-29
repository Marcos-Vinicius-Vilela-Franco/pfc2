import style from "../styles/RR.module.css"
import { useState } from "react";
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

    enqueue(item, id, pri) {
        if (!this.isFull) {
            this.#tail = (this.#tail + 1) % this.#capacity;
            this.#list[this.#tail] = { time: item, identificador: id, priority: pri };
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
        return this.#list[this.#head].time;
    }

    toString() {
        return this.#list.filter((el) => el !== undefined).toString();
    }
}


const cq = new CircularQueue(5);
const clone = [];
let listaProntos = [];
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
    const [executanto2, setExecutando2] = useState(-1);
    const [contadorProntos, setContadorProntos] = useState(0);
    const [contadorID, setContadorID] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [isOn2, setIsOn2] = useState(false);
    const [prioridade, setPrioridade] = useState(3);


    function priority1() {
        setPrioridade(1);

    }
    function priority2() {
        setPrioridade(2);

    }
    function priority3() {
        setPrioridade(3);

    }
    function toggleSort() {
        cq.list.sort(compareP);
        setIsOn2(!isOn2);
    }
    function compareP(a, b) {
        if (a.priority < b.priority)
            return -1;
        if (a.priority > b.priority)
            return 1;
        return 0;
    }
    function compare(a, b) {
        if (a.time < b.time)
            return -1;
        if (a.time > b.time)
            return 1;
        return 0;
    }


    function toggleSwitch() {
        cq.list.sort(compare);
        setIsOn(!isOn);
    }

    function addTimer() {
        setTimer(timer + 100)
    }
    function removeTimer() {
        if (timer > 100) {
            setTimer(timer - 100)
        }
    }

    function add() {
        setContadorID(contadorID + 1);
        if (contador <= 5) {

            cq.enqueue(timer, contadorID, prioridade);
            listaExe.push(timer);
            setContador(contador + 1);
            setPrioridade(3);
            let aux = { time: timer, id: contadorID, prio: prioridade };
            clone.push(aux);
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

    function off() {
        setIsOn(false);
    }

    function compareID(a, b) {
        if (a.identificador < b.identificador)
            return -1;
        if (a.identificador > b.identificador)
            return 1;
        return 0;
    }
    function zerar() {
        setExecutando2(0);
    }
    function somar() {
        setExecutando2(state => state + 1);
    }
    function diminuir() {
        setExecutando2(state => state - 1);
    }
    async function start() {
        let i = 0, aux2, cont = 0;
        acao2();
        clone.sort(compareID);
        console.log(clone);
        somarContador(0);
        listaProntos.length = 0;
        if (i = cq.head == 0) {
            for (i = cq.head; !cq.isEmpty; i++) {


                if (cq.list[i].time > 0) {

                    aux2 = cq.list[i].time - quantum;
                    if (aux2 > 0) {
                        await new Promise(resolve => setTimeout(resolve, quantum))
                        cq.list[i].time = aux2;
                    } else {
                        await new Promise(resolve => setTimeout(resolve, quantum))
                        const b = cq.list[i].identificador;
                        listaProntos.push(b);
                        somarContador();

                        cq.list[i].time = 0;
                    }
                }
                if (cq.peek() == 0) {
                    cq.dequeue()
                }

                if (i == cq.tail || executanto == 5) {
                    i = cq.head - 1;
                    acao2()
                } else {


                    acao()

                }
                cont++;

            }
            /*zerar(0)
            let size = clone.length;
            for (i = 0; i <= size; i++) {
    
                console.log("tamanho " + size)
    
                console.log("i:" + i);
                if (i == size && i != 0) {
                    zerar()
                    i = 0;
    
                }
    
                if (clone[i].time > 0) {
    
                    let aux = clone[i].time - quantum;
                    if (aux > 0) {
                        clone[i].time = aux;
                        await new Promise(resolve => setTimeout(resolve, quantum))
                        setMostrar(i);
    
                    } else {
                        await new Promise(resolve => setTimeout(resolve, quantum))
                        setMostrar(i);
                        listaProntos.push(clone[i].id);
                        clone.splice(i, 1);
    
                        size = clone.length;
                        i = i - 1;
    
                    }
    
    
                    if (size == 0) {
                        break;
                    }
                    somar();
    
                }
            }*/

        } else {
            alert("comando inválido, para este exemplo é nessessário começar da primeira posição");
            cq.esvaziar()
        }
        cq.esvaziar()
        setContador(0);
        acao2();
        off();
        setIsOn2(false);
        setContadorID(0);
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
                        <div className={style.title + ` display-4 text-center pt-4 text-white`}>Escalonamento de CPU </div>
                    </div>
                    <div className={style.part1}>

                        <div className={style.painel1 + ` d-flex align-items-center p-2`}>
                            <div className={style.bufferTitle + ` card text-center  shadow-sm p-2  bg-body rounded`}>
                                <div className={style.bufferTitle2 + ` fs-5 card-title`}>Fila de Processos </div>
                            </div>
                            <div className={style.fila}>
                                <div className="d-flex flex-column align-items-center p-2 text-danger">
                                    <span className="border-bottom">ID</span>
                                    <span className="border-bottom">Tempo  </span>
                                    <span>Prioridade  </span>
                                </div>
                                {vetor.map((item, i) => (<div key={i} className={(executanto == i && cq.list[i].time != 0) ? style.item + ` bg-danger` : style.item}>{(cq.list[i] != undefined) ? <div className="d-flex flex-column"> <span className="border-bottom">{cq.list[i].identificador}</span><span className="border-bottom"> {cq.list[i].time}</span> <span> {cq.list[i].priority}</span> </div> : ''} </div>))}

                            </div>
                            {/* <div className={style.fila}>
                                {vetor.map((item, i) => (<div key={i} className={(executanto2 == i) ? style.item + ` bg-danger` : style.item}>{(clone[i] != undefined) ? <div className="d-flex flex-column"> <span className="border-bottom">{clone[i].id}</span><span className="border-bottom"> {clone[i].time}</span> <span> {clone[i].prio}</span> </div> : ''} </div>))}

                            </div> */}

                        </div>
                        
                            
                        <div className={(prioridade == 1) ? style.painel2 + `  border-danger ` : (prioridade == 2) ? style.painel2 + ` border-warning` : style.painel2 + ` border-success`}>


                            <div className={style.boxButton + ` d-flex flex-column`}>
                                <span className="text-muted"> Criar Processo </span>
                                <div className={style.TimerBox}>
                                    <div className={style.spanTimer}>
                                        <h5 className={style.texto}>Tempo de execução para cada processo: {timer} Un.t</h5>
                                    </div>
                                    <div className={style.addandRemove + ` d-flex justify-content-around `}>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={style.buttonsInc + `  rounded-circle`} onClick={removeTimer} ><RemoveIcon /></motion.div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.buttonsInc + ` rounded-circle`} onClick={addTimer}><AddIcon /></motion.div>
                                    </div>
                                </div>
                                <div className={style.prioridadeBox}>
                                    <h5 className={style.textPriorizar + ` text-center `} >Prioridade</h5>
                                    <div className={style.prioriButtons}>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.priori1 + ` bg-success`} onClick={priority3}></motion.div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.priori1 + ` bg-warning`} onClick={priority2}></motion.div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.priori1 + ` bg-danger`} onClick={priority1}></motion.div>
                                    </div>
                                </div>
                                <div className={style.buttons + ` input-group d-flex justify-content-between pb-3`}>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-danger" onClick={remove}>Remover</motion.button>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-success" onClick={add}>Adicionar</motion.button>
                                </div>
                                <span className="text-muted"> Executar simulação</span>
                                <div className={style.boxTungle}>
                                    <h5 className={style.textPriorizar + ` text-center `} >Ordenar por tempo</h5>
                                    <div className={style.switch} data-isOn={isOn} onClick={toggleSwitch}>
                                        <motion.div className={style.handle} layout transition={spring} />
                                    </div>
                                </div>
                                <div className={style.prioriBox}>
                                    <h5 className={style.textPriorizar + ` text-center `} >Ordenar por prioridade</h5>
                                    <div className={style.switch2} data-isOn2={isOn2} onClick={toggleSort}>
                                        <motion.div className={style.handle} layout transition={spring} />
                                    </div>
                                </div>


                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="btn btn-success mt-2" onClick={start}>Executar</motion.button>
                            </div>
                        </div>
                        
                    </div>
                    <div className={style.part2}>
                        <div className={style.cpuArea}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={style.cpu}>
                                <div className={(executanto != -1) ? style.cpuFront + ` text-danger` : style.cpuFront}><span>CPU</span>{(executanto > -1 && cq.list[executanto].time > 0) ? `Processo ` + executanto : ''}</div >
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

                        <div className={style.lista + ` d-flex flex-column align-items-center justify-content-center p-2`}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={style.vetorProntos}>
                                <span className={style.spanVetor}>Processos Finalizados</span>
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