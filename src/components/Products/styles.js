import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: {
     marginTop: '70px',
    // theme.mixins.toolbar,
  } ,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  title:{
    padding: '20px',
    textAlign: 'center'
  }
}));