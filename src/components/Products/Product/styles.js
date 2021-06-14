import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    transition: 'all 0.3s ease-in-out',
    // marginRight:'0px',

    '&:hover' : {
      transform: 'scale(1.05)',
      boxShadow: '0 0 10px 5px #03dac5'
    }
  },
  link:{
    color: 'grey',
    textDecoration:'none',
    display: 'block',
    position:'relative'
  },
  view: {
    left:'0',
    top:'-0px',
    opacity: '0',
    width:'100%',
    height:'100%',
    display:'flex',
    color: "#03dec5",
    fontSize:'30px',
    position: 'absolute',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'rgb(0,0,0,0.7)',
    transition: 'opacity 0.3s ease-in',

    '&:hover' :{
        opacity:'1',
     }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));