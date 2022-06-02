import style from '../styles/Main.module.css'
import { motion } from "framer-motion";
import Home from "./Home";


export default function Index() {
    return (
       <div className={style.main}>
            <div className= {style.container1+ ` container bg-white`}>
                <div className={style.topBar + ` d-flex justify-content-center align-items-center`}>
                    <div className={style.title+ ` display-1 pb-2`}>Sistemas Operacionais</div>
                </div>
                <div className={style.containerMain + ` m-2`}>
                    <div className={style.titleCards + ` display-4  card text-center  shadow-sm pb-2  bg-body rounded`}>Conteúdos</div>
                    <div className={style.boxCards}>


                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} class={style.card}>

                            <h5 class="card-title ">Problema Produtor-Consumidor</h5>
                            <p class="card-text text-center ">O problema descreve dois processos, o produtor e o consumidor, que compartilham um buffer de tamanho fixo.</p>
                            <a href='/Home' class="btn btn-primary">Acessar</a>

                        </motion.div>


                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} class={style.card}>

                            <h5 class="card-title  ">Escalonamento de CPU Preemptivo</h5>
                            <p class="card-text text-center ">Escalonamento Preemptivo escolhe um processo e lhe concede a CPU durante certo tempo. Findado esse tempo, a CPU é de outro processo.</p>
                            <a href="/RoundRobin" class="btn btn-primary">Acessar</a>

                        </motion.div >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} class={style.card}>

                            <h5 class="card-title  ">Título do Conteúdo</h5>
                            <p class="card-text text-center ">Breve descrição</p>
                            <a href="#" class="btn btn-primary">Acessar</a>

                        </motion.div >


                    </div>
                </div>
                <div className={style.footer}>
                    <div className="text-center" >
                        <span>Marcos Vinicius Vilela Franco |</span>
                        <a className="text-dark text-decoration-none" href="https://computacao.jatai.ufg.br/"> Ciência da computação UFJ</a>
                    </div>
                </div>
            </div>
        </div>
    )
}