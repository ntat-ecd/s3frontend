import styles from './Widgets.module.css'

import Widget from './Widget';
import Switch from '../Switch/Switch';
import Slider from '../Slider/Slider';
import { useState } from 'react';
import CheckItem from '../CheckItem/CheckItem';

const BodyWidgetsTest = () => {
  const [profile, setProfile] = useState({
    swPhone: true,
    slPhoneRange: 70,
    swSensi: true,
    slSensiRange: 40,
    swSide: false,
    slSideRange: 60,
    checkNorm: false,
    slNormRange: 70,
    checkAmb: false,
    slAmbRange: 50,
    checkClarity: false,
    slClarityRange: 80,
  });

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`${styles['body-widgets']} flex`}>
      <div className={`${styles['widget-col']} ${styles['col-left']} flex`}> 
        {/* MICPHONE WIDGET */}
        <Widget id='micPhone'>
          <Widget.Title>
            microphone
            <Switch
              id='swPhone'
              isOn={profile.swPhone}
              onToggle={() => updateProfile('swPhone', !profile['swPhone'])}
            ></Switch>
          </Widget.Title>
          <Widget.H2Title>mic volume</Widget.H2Title>
          <Slider
            id='slPhone'
            isOn={profile.swPhone}
            value={profile.slPhoneRange}
            onMouseUp={(id, val) => updateProfile(id, val)}
          ></Slider>
          <Widget.H2Title>
            mic sensitivity
            <Switch
              id='swSensi'
              isOn={profile.swSensi}
              onToggle={() => updateProfile('swSensi', !profile['swSensi'])}
            ></Switch>
          </Widget.H2Title>
          <Widget.H2Body>
            Adjust this setting to remove unwanted background noise or increase the amount of mic output heard
          </Widget.H2Body>
          <Slider
            id='slSensi'
            isOn={profile.swSensi}
            value={profile.slSensiRange}
            onMouseUp={(id, val) => updateProfile(id, val)}
          ></Slider>
        </Widget>
      </div>
        <div className={`${styles['widget-col']} ${styles['col-right']} flex`}> 
        {/* MIC SIDETONE WIDGET */}
        <Widget id='micSidetone'>
          <Widget.Title>
            sidetone
            <Switch
              id='swSide'
              isOn={profile.swSide}
              onToggle={() => updateProfile('swSide', !profile['swSide'])}
            ></Switch>
          </Widget.Title>
          <Slider
            id='slSide'
            isOn={profile.swSide}
            minText='0'
            min={0}
            maxText='100'
            value={profile.slSideRange}
            onMouseUp={(id, val) => updateProfile(id, val)}
          ></Slider>
        </Widget>
        {/* ENHANCMENTS WIDGET */}
        <Widget id='micEnhance'>
          <Widget.Title>enhancements</Widget.Title>
          <CheckItem
            id='checkNorm'
            isOn={profile.checkNorm}
            onToggle={() => updateProfile('checkNorm', !profile['checkNorm'])}
          >
            Volume Normalization
          </CheckItem>
          <Slider
            id='slNorm'
            isOn={profile.checkNorm}
            value={profile.slNormRange}
            onMouseUp={(id, val) => updateProfile(id, val)}
          ></Slider>
          <CheckItem
            id='checkAmb'
            isOn={profile.checkAmb}
            onToggle={() => updateProfile('checkAmb', !profile['checkAmb'])}
          >
            Ambient Noise Reduction
          </CheckItem>
          <Slider
            id='slAmb'
            isOn={profile.checkAmb}
            value={profile.slAmbRange}
            onMouseUp={(id, val) => updateProfile(id, val)}
          ></Slider>
          <CheckItem
            id='checkClarity'
            isOn={profile.checkClarity}
            onToggle={() => updateProfile('checkClarity', !profile['checkClarity'])}
          >
            Voice Clarity
          </CheckItem>
          <Slider
            id='slClarity'
            isOn={profile.checkClarity}
            value={profile.slClarityRange}
            onMouseUp={(id, val) => updateProfile(id, val)}
          ></Slider>
        </Widget>
      </div>
    </div>
  );
};

export default BodyWidgetsTest;
