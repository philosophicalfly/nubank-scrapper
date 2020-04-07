import {
  makeStyles
} from '@material-ui/core/styles';

import landing0 from '../img/landing/landing0.svg';
import landing1 from '../img/landing/landing1.svg';
import landing2 from '../img/landing/landing2.svg';
import landing3 from '../img/landing/landing3.svg';
const landingObj = [landing0, landing1, landing2, landing3];
let getLanding = () => {
  const landToReturn = Math.floor(Math.random() * 4);
  return landingObj[landToReturn];
}

const defColor = {
  primary: '#512da8',
  secondary: '#5e35b1',
  dark: '#311b92',
  light: '#9575cd',
  superLight: '#d1c4e9'
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: "url(" + getLanding() + ")",
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ?
      theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'center',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qr: {
    height: '60%',
    padding: theme.spacing(2,0,1,0)
  },
  primaryButton: {
    margin: theme.spacing(3, 0, 2)
  },
  primaryText: {
    textCcolor: defColor.primary,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  }
}));

export default useStyles
