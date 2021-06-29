import styles from './spinner.module.css';

export default function spinner() {
    return (
        <div className={styles.center}>
            <div className={styles.ring}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}