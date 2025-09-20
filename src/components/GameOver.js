import styles from './GameOver.module.css'

const GameOver = ({retry,score}) => {
  return (
    <div>
        <div className={styles.title}>GameOver</div>
        <h2>A sua pontuação foi: <span>{score}</span></h2>
        <button onClick={retry}>REINICIAR</button>
    </div>
  )
}

export default GameOver