import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PageTittle from "../../PageTittle";
import Container from "@material-ui/core/Container";
import ToolbarCustom from './Toolbar';
import FirstIcon from '../../../library/icon/FistIcon';
import SecondIcon from '../../../library/icon/SecondIcon';
import ThirdIcon from '../../../library/icon/ThirdIcon';
import UserContext from "../../../contexts/UserContext";
import moment from 'moment';
import userApi from "../../../api/userApi";
import {
    Avatar,
    Box,
    Button,
    Collapse 
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MatchModal from "./matchModal/allMatchModal";
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// const headCells = [
//     { id: 'detail', numeric: false, label: 'Detail' },
//     { id: 'name', numeric: false, label: 'User' },
//     { id: 'rank', numeric: true, label: 'Rank' },
//     { id: 'cup', numeric: true, label: 'Cup' },
//     { id: 'match', numeric: true, label: 'Match' },
//     { id: 'win', numeric: true, label: 'Win' },
//     { id: 'active', numeric: null, label: 'Active' },
//     { id: 'history', numeric: null, label: 'History' },
// ];

const headCells = [
    { id: 'detail', numeric: false, label: 'Detail' },
    { id: 'user', numeric: false, label: 'User' },
    { id: 'rank', numeric: true, label: 'Rank' },
    { id: 'elo', numeric: true, label: 'Elo' },
    { id: 'name', numeric: true, label: 'Name' },
    { id: 'email', numeric: true, label: 'Email' },
    { id: 'date', numeric: true, label: 'Date Join' },
    { id: 'active', numeric: null, label: 'Active' },
    { id: 'history', numeric: null, label: 'History' },
];

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '& > *': {
            borderBottom: 'unset',
          },
    },
}))(TableRow);

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow >
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric === true ? 'right' : headCell.numeric === false ? 'left' : 'center'}
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ fontSize: '17px' }}
                    >
                        {index === 7 || index === 8 ? headCell.label : <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    active: {
        backgroundColor: theme.palette.success.dark,
        borderRadius: '5px',
        padding: '4px',
        color: theme.palette.common.white,
        textAlign: 'center',
        width: 'fit-content'
    },
    deny: {
        backgroundColor: theme.palette.error.dark,
        borderRadius: '5px',
        padding: '4px',
        color: theme.palette.common.white,
        textAlign: 'center',
        width: 'fit-content'
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('elo');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const {
        listUsers,
        isChanged,
        handleDisableAccess,
        handleEnableAccess,
        handleIsChanged,
        setListUsers,
        setListUsersTemp,
        handleSetListUsers
    } = useContext(UserContext);
    
    const handleClickPlayer = (id) => {
        setIdUser(id);
        setOpenModal(true);
    }
    
    const handleToggle = () => {
        setOpenModal(false);
    };
//   useEffect(() => {
//     const getAllUsers = async () => {
//       try {
//         const fetchUsersUpdate = await userApi.getAllUsers();
//         handleSetListUsers(fetchUsersUpdate);
//         console.log('Enable/Disable users');
//       } catch (err) {
//         console.log('Error :', err.response);
//       }
//       };
//       getAllUsers();  
//   },[isChanged]);
    
    useEffect(() => {
        setOpen(Array(listUsers.length).fill(false));
    }, [listUsers])
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = (indexItem) => {
        const changeArray = open.map((item, index) => index === indexItem ? item = !item : item = false);
        setOpen(changeArray);
    };
    
    return (
        <PageTittle className={classes.root} title="Users">
            <Container maxWidth={false}>
                <div className={classes.root}>
                    <MatchModal
                        idUser={idUser}
                        status={openModal}
                        handleToggle={handleToggle} />
                    <ToolbarCustom />
                    <Paper className={classes.paper}>
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size='medium'
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                
                                <TableBody>
                                    {stableSort(listUsers, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            const date = new Date(row.date);
                                            const dateText = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
                                            const timeText = moment(date).format('HH:mm:ss');
                                            return (
                                                <React.Fragment key={row._id}>
                                                <StyledTableRow
                                                        hover
                                                        key={row._id}
                                                    tabIndex={-1}
                                                    
                                                >
                                                    <TableCell>
                                                    <IconButton aria-label="expand row" size="small" onClick={() => handleClick(index)}>
                                                         {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                    </TableCell>
                                                    <TableCell component="th" id={labelId} scope="row">
                                                        <Box
                                                            alignItems="center"
                                                            display="flex"
                                                        >

                                                            <Avatar
                                                                className={classes.avatar}

                                                                src={row.isUploadAvatar ? `${process.env.REACT_APP_ENDPOINT}/api/image/file/${row._id}` : '/static/logo.svg'}
                                                            >
                                                            </Avatar>
                                                            <Box
                                                                flexDirection="column"
                                                                display="flex">
                                                                <Typography
                                                                    color="textPrimary"
                                                                    variant="body1"
                                                                >
                                                                    {row.username}
                                                                </Typography>
                                                                {row.isActive ? (<Typography
                                                                    variant="caption"
                                                                    display="block"
                                                                    className={classes.active}
                                                                >
                                                                    Active
                                                                </Typography>) : (<Typography
                                                                    variant="caption"
                                                                    display="block"
                                                                    className={classes.deny}
                                                                >
                                                                    Denied
                                                                </Typography>)}

                                                            </Box>
                                                        </Box>

                                                        </TableCell>
                                                        {order === 'desc'?<TableCell align="right">
                                                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                             
                                                            {index === 0 ? <FirstIcon /> : index === 1 ? <SecondIcon /> : index === 2 ? <ThirdIcon /> : index+1}
                                                            
                                                        </Box>
                                                        </TableCell>:<TableCell align="right">
                                                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                            {index === listUsers.length-1 ? <FirstIcon /> : index === listUsers.length-2 ? <SecondIcon /> : index === listUsers.length-3 ? <ThirdIcon /> : listUsers.length -index}
                                                            
                                                        </Box>
                                                        </TableCell>}
                                                    
                                                        <TableCell align="right">
                                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                                {row.elo}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell align="right">                                                        
                                                        {dateText}{ ','}{timeText}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {!row.isActive ? <Button
                                                                onClick={() => {
                                                                    handleEnableAccess(row._id);
                                                            }}
                                                            style={{ backgroundColor: '#388e3c', color: '#fff' }}
                                                            size="small"
                                                            variant="contained"
                                                        >
                                                            Enabled
                                                    </Button> : <Button
                                                                    onClick={() => {
                                                                        handleDisableAccess(row._id);
                                                                    }}
                                                                style={{ backgroundColor: '#d32f2f', color: '#fff' }}
                                                                size="small"
                                                                variant="contained"
                                                            >
                                                                Disabled
                                                                
                                                    </Button>}

                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            onClick={()=>{handleClickPlayer(row._id)}}
                                                            color="primary"
                                                            size="small"
                                                            variant="contained"
                                                        >
                                                            Lịch sử
                                                    </Button>
                                                    </TableCell>
                                                </StyledTableRow>
                                                    <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} variant='head'>
                                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                        <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                            <TableCell>Match</TableCell>
                                                            <TableCell align="right">Win</TableCell>
                                                            <TableCell align="right">Percent Win</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        <TableRow>
                                                                <TableCell>
                                                                                    {row.numOfMatches}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                                    {row.winMatches}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {row.numOfMatches>0?Math.round((row.winMatches / row.numOfMatches) * 100, 2):0}{' %'}
                                                                                    
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        </Table>
                                                    </Box>
                                                    </Collapse>
                                                </TableCell>
                                                </TableRow>
                                                </React.Fragment>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={listUsers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </Container>
        </PageTittle>
    );
}

