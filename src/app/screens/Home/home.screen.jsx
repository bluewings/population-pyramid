import { useState } from 'react';
import { useClientRect } from 'hooks';
import { default as testa } from '../../shared/styles/variables';
// import ThemeDropdown from 'components/ThemeDropdown';
import Pyramid from 'components/Pyramid';

// jsx
import template from './home.screen.pug';
import { primary } from './home.screen.scss';


// console.log(primary);
// console.log(testa);

function Home() {
  const [year, setYear] = useState(2018);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  }
  // const [rect, clientRef] = useClientRect(['height', 'width'], null);

  return template({
    // variables
    handleYearChange,
    year,
    // components
    Pyramid,
  });
}

export default Home;
