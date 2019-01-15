import { useState } from 'react';
import { useClientRect } from 'hooks';
import Pyramid from 'components/Pyramid';
import { default as testa } from '../../shared/styles/variables';
// import ThemeDropdown from 'components/ThemeDropdown';

// jsx
import template from './home.screen.pug';
import { primary } from './home.screen.scss';


// console.log(primary);
// console.log(testa);

const allTypes = ['high', 'principal', 'low'];

function Home() {
  const [year, setYear] = useState(2060);

  const [displayGeneration, setDisplayGeneration] = useState(true);

  const [types, setTypes] = useState([allTypes[1]]);

  const handleDisplayGenerationChange = (event) => {
    setDisplayGeneration(!displayGeneration);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleTypeClick = (event) => {
    const type = event.target.getAttribute('data-type');
    
    if (types.indexOf(type) !== -1) {
      if (types.length > 1) {
        // setTypes(types.filter(e ))
        setTypes(types.filter(e => e !== type));
      }
    } else {
      setTypes([
        ...types,
        type,
      ].sort());
    }
    // alert(type);
  };
  // const [rect, clientRef] = useClientRect(['height', 'width'], null);

  return template({
    // variables
    allTypes,
    displayGeneration,
    handleDisplayGenerationChange,
    handleTypeClick,
    handleYearChange,
    types,
    year,
    // components
    Pyramid,
  });
}

export default Home;
