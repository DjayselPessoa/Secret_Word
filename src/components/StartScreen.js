import styles from './StartScreen.module.css'

const StartScreen = ({startGame}) => {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão para iniciar o jogo</p>
      <button onClick={startGame}>START</button>
    </div>
  )
}

export default StartScreen