import styles from './Slider.module.css';

import { useState, useRef, useEffect } from 'react';

const Slider = ({
  id,
  isOn,
  value,
  minText = 'low',
  midText = 'medium',
  maxText = 'high',
  min = 10,
  mid = 50,
  max = 100,
  onMouseUp,
}) => {
  const [localValue, setLocalValue] = useState(value);
  //
  const trackRef = useRef(null);
  const tipRef = useRef(null);

  const [trackWidth, setTrackWidth] = useState(0);
  const [tipWidth, setTipWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.getBoundingClientRect().width);
      if (tipRef.current) setTipWidth(tipRef.current.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (tipRef.current) setTipWidth(tipRef.current.getBoundingClientRect().width);
    //DEBUG console.log(`ID: ${id}\nLocalValue: ${localValue}\nPercent: ${percent},fillPx: ${fillPx} `);
  }, [localValue]);

  const percent = (localValue - min) / (max - min);
  const usable = Math.max(0, trackWidth - 16);
  const fillPx = percent * usable + 8;
  const tipLeftPx = percent * usable - tipWidth / 2 + 8;

  return (
    <div className={`${styles['slider-container']} ${isOn ? styles.on : ''}`} id={id} ref={trackRef}>
      <div className={`${styles.foot} ${styles.min}`}>{minText}</div>
      <div className={`${styles.foot} ${styles.mid}`}>{midText}</div>
      <div className={`${styles.foot} ${styles.max}`}>{maxText}</div>
      <div id={`${id}Fill`} className={`${styles.left}`} style={{ width: `${fillPx}px` }}></div>
      <div className={styles.track}></div>
      <div id={`${id}Tip`} ref={tipRef} className={`${styles['slider-tip']}`} style={{ left: `${tipLeftPx}px` }}>
        {localValue}
      </div>
      <input
        type='range'
        min={min}
        max={max}
        value={localValue}
        step='1'
        className={`${styles.slider}`}
        id={`${id}Range`}
        onChange={(e) => {
          setLocalValue(e.target.value);
        }}
        onMouseUp={() => onMouseUp(`${id}Range`, localValue)}
        disabled={!isOn}
      />
    </div>
  );
};

export default Slider;
