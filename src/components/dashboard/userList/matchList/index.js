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
import MatchModal from "./macthModal/matchModal";
import {
    Avatar,
    Box,
    Button,
    Collapse
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

const headCells = [
    { id: 'stt', numeric: false, label: 'STT' },
    { id: 'user1', numeric: true, label: 'User 1' },
    { id: 'null', numeric: null, label: '' },
    { id: 'user2', numeric: false, label: 'User 2' },
    { id: 'win', numeric: false, label: 'Winner' },
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
                        {headCell.label}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


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
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('rank');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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

    const handleClickPlayer = () => {
        setOpenModal(true);
    }

    const handleToggle = () => {
        setOpenModal(false);
    };

    return (
        <PageTittle className={classes.root} title="Users">
            <Container maxWidth={false}>
                <div className={classes.root}>
                    <MatchModal
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
                                    {listUsers.map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <StyledTableRow
                                                hover
                                                key={row._id}
                                                tabIndex={-1}

                                            >
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" align="right">
                                                    <Box
                                                        justifyContent="flex-end"
                                                        alignItems="center"
                                                        display="flex"
                                                    >

                                                        <Box
                                                            justifyContent="flex-end"
                                                            flexDirection="column"
                                                            display="flex">
                                                            <Typography
                                                                color="textPrimary"
                                                                variant="body1"
                                                            >
                                                                {row.username}
                                                            </Typography>
                                                            <Box
                                                                display="flex"
                                                                justifyContent="flex-end">
                                                                {row.isActive ? (<Typography
                                                                    variant="caption"
                                                                    display="block"
                                                                    className={classes.active}

                                                                >
                                                                    Win
                                                                </Typography>) : (<Typography
                                                                    variant="caption"
                                                                    display="block"
                                                                    className={classes.deny}
                                                                >
                                                                    Lose
                                                                </Typography>)}
                                                            </Box>
                                                        </Box>
                                                        <Avatar
                                                            style={{ marginLeft: '16px' }}
                                                            className={classes.avatar}
                                                            src={row.isUploadAvatar ? `${process.env.REACT_APP_ENDPOINT}/api/image/file/${row._id}` : '/static/logo.svg'}
                                                        >
                                                        </Avatar>
                                                    </Box>

                                                </TableCell>
                                                <TableCell>
                                                    {' - '}
                                                </TableCell>
                                                <TableCell align="right">
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
                                                                Win
                                                            </Typography>) : (<Typography
                                                                variant="caption"
                                                                display="block"
                                                                className={classes.deny}
                                                            >
                                                                Lose
                                                            </Typography>)}

                                                        </Box>
                                                    </Box>

                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.username}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={handleClickPlayer}
                                                        color="primary"
                                                        size="small"
                                                        variant="contained"
                                                    >
                                                        Play
                                                    </Button>
                                                </TableCell>
                                            </StyledTableRow>
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

