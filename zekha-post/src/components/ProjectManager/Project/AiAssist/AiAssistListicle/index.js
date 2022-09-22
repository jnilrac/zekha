import React from 'react'

import { useImmer } from 'use-immer';
import Title from './Title';
import IntroProblem from './IntroProblem';
import IntroBenefit from './IntroBenefit';
import SubheadingTitle from './SubheadingTitle';
import SubheadingClearBenefit from './SubheadingClearBenefit';
import ActionItems from './ActionItems';
import Conclusion from './Conclusion';






const AiAssistListicle = ({handleUpdate, assistShow, data, templateEvent}) => {
   
    const [assister, setAssister] = assistShow;

    const ElementPicker = () => {
      switch(templateEvent){
        case "topic":
          return <Title update={handleUpdate} assistShow = {assistShow} />;
        case "problem":
          return <IntroProblem update={handleUpdate} assistShow = {assistShow}/>;
        case "introBenefit":
          return <IntroBenefit update={handleUpdate} assistShow = {assistShow} />
        case "subheadingTitle":
          return <SubheadingTitle update={handleUpdate} assistShow = {assistShow} />
        case "clearBenefit":
          return <SubheadingClearBenefit update={handleUpdate} assistShow = {assistShow}/>
        case "actionItems":
          return <ActionItems update={handleUpdate} assistShow = {assistShow}/>
        case "conclusion":
          return <Conclusion update={handleUpdate} assistShow = {assistShow} />
        default:
          return null;
      }
    };
    
  return (
    <ElementPicker />
  )
}

export default AiAssistListicle