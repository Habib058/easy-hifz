import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '28px 5px',
        padding: '15px 0',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '96%',
    },
    formControl2: {
        margin: theme.spacing(1),
        minWidth: '90%',
    },
    formControlLabel: {
        margin: '0 0 0 25px',
    },
    play: {
        margin: '-9px 20px 0px 5px',
        [theme.breakpoints.down('sm')]: {
            margin: '-6px 20px 0px 5px',
        },
    },
    mode: {
        float: 'right',
        margin: '12px 8px 0px 0px',
        [theme.breakpoints.down('sm')]: {
            margin: '5px 8px 0px 0px',
        },
    },
}));

export default useStyles;