import style from '../styles/Main.module.css'
import { motion } from "framer-motion";
import Link from 'next/link';
import Home from "./Home";


export default function Index() {
    return (
        <div className={style.main}>
            <div className={style.container1 + ` container bg-white`}>
                <div className={style.topBar + ` d-flex justify-content-center align-items-center`}>
                    <div className={style.title + ` display-1 pb-2`}>Sistemas Operacionais</div>
                </div>
                <div className={style.containerMain + ` m-2`}>
                    <div className={style.titleCards + ` display-4  card text-center  shadow-sm pb-2  bg-body rounded`}>Conteúdos</div>
                    <div className={style.boxCards}>


                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} className={style.card}>

                            <h5 className="card-title ">Problema Produtor-Consumidor</h5>
                            <p className="card-text text-center ">O problema descreve dois processos, o produtor e o consumidor, que compartilham um buffer de tamanho fixo.</p>
                            <Link href="/Home">
                                <a className="btn btn-primary">Acessar</a>
                            </Link>
                            {/* <a href='/Home' className="btn btn-primary">Acessar</a> */}

                        </motion.div>


                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} className={style.card}>

                            <h5 className="card-title  ">Escalonamento de CPU Preemptivo (Protótipo)</h5>
                            <p className="card-text text-center ">Escalonamento Preemptivo escolhe um processo e lhe concede a CPU durante certo tempo. Findado esse tempo, a CPU é de outro processo.</p>
                            {/* <a href="/RoundRobin" className="btn btn-primary">Acessar</a> */}
                            <Link href="/RoundRobin">
                                <a className="btn btn-primary">Acessar</a>
                            </Link>
                        </motion.div >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }} className={style.card}>

                            <h5 className="card-title  ">Título do Conteúdo</h5>
                            <p className="card-text text-center ">Breve descrição</p>
                            <Link href="/">
                                <a className="btn btn-primary">Acessar</a>
                            </Link>
                            {/* <a href="#" className="btn btn-primary">Acessar</a> */}

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