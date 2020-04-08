import {
  makeStyles
} from '@material-ui/core/styles';

const defColor = {
  primary: '#512da8',
  secondary: '#5e35b1',
  dark: '#311b92',
  light: '#9575cd',
  superLight: '#d1c4e9'
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: '60%',
    minWidth: '60%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: defColor.superLight
  },
  header: {
    backgroundColor: defColor.primary,
    color: 'white',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: '180px',
    paddingBottom: theme.spacing(1)
  },
  newCaseImage: {
    width: '80%',
    padding: theme.spacing(3)
  },
  title: {
    backgroundColor: defColor.superLight,
    padding: theme.spacing(4, 0, 4, 0)
  },
  primaryButton: {
    backgroundColor: defColor.superLight,
    margin: theme.spacing(1)
  },
  submitButton: {
    backgroundColor: defColor.primary,
    color: defColor.superLight,
    margin: theme.spacing(3, 0, 2)
  },
  cardGrid: {
    padding: theme.spacing(4, 4, 4, 4)
  },
  spaceLeft: {
    marginLeft: theme.spacing(2)
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 2, 0, 2)
  },
  cardContent: {
    flexGrow: 1,
    minHeight: '300px'
  },
  footer: {
    backgroundColor: defColor.primary,
    color: 'white',
    padding: theme.spacing(2),
    marginTop: 'auto'
  },
  whiteLink: {
    color: 'white'
  },
  loading: {
    height: '60%',
    padding: theme.spacing(2,0,1,0)
  },
}));

export default useStyles
