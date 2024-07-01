import LinearProgress from '@mui/material/LinearProgress';
import styles from './LinearWithValueLabel.module.scss';

interface Props {
    value: number;
}

export default function LinearWithValueLabel({value}: Props) {
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
