import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ISwitchPanelProps } from '../../utils/types';

const SwitchPanel: FC<ISwitchPanelProps> = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <Tab value={'0'} active={props.currentSwitchPanel === '0'} onClick={props.setCurrentSwitchPanel}>
        Булки
      </Tab>
      <Tab value={'1'} active={props.currentSwitchPanel === '1'} onClick={props.setCurrentSwitchPanel}>
        Соусы
      </Tab>
      <Tab value={'2'} active={props.currentSwitchPanel === '2'} onClick={props.setCurrentSwitchPanel}>
        Начинки
      </Tab>
    </div>
  );
};

export default SwitchPanel;
