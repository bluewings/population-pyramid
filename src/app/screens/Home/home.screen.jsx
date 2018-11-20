import { useClientRect } from 'hooks';
import { default as testa } from '../../shared/styles/variables';
import ThemeDropdown from 'components/ThemeDropdown';

// jsx
import template from './home.screen.pug';
import { primary } from './home.screen.scss';


// console.log(primary);
// console.log(testa);

function Home() {
  // const [rect, clientRef] = useClientRect(['height', 'width'], null);

  return template({
    // variables
    unused_ThemeDropdown: ThemeDropdown,
  });
}

export default Home;
