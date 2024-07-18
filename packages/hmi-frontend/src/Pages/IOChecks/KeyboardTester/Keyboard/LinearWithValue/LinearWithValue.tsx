import LinearProgress from '@mui/material/LinearProgress';
import styles from './LinearWithValue.module.scss';

interface LinearWithValueProps {
    value: number;
}

export default function LinearWithValue({value}: LinearWithValueProps) {
  return (
    <div className={styles.linearWithValue_container}>
        <div className={styles.linearWithValue}>
            <LinearProgress variant="determinate" color='inherit' value={value} className={styles.linearProgress}
            style={{color: value < 100 ? 'var(--dark-red)' : 'var(--dark-green)' }} />

            <div className={styles.textValue}>
                {value + "%"}
            </div>
        </div>
    </div>
  );
};
