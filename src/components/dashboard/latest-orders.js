import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

const orders = [
  {
    id: uuid(),
    ref: 'Việt Nam',
    amount: 30.5,
    customer: {
      name: 'Vo Thai Bao'
    },
    createdAt: 1555016400000,
    status: 'Pending'
  },
  {
    id: uuid(),
    ref: 'Việt Nam',
    amount: 25.1,
    customer: {
      name: 'Nguyen Anh Vu'
    },
    createdAt: 1555016400000,
    status: 'Approved'
  },
  {
    id: uuid(),
    ref: 'Việt Nam',
    amount: 10.99,
    customer: {
      name: 'Tran Van Tri'
    },
    createdAt: 1554930000000,
    status: 'Cancelled'
  },
  {
    id: uuid(),
    ref: 'Việt Nam',
    amount: 96.43,
    customer: {
      name: 'Nguyen Thi Anh My'
    },
    createdAt: 1554757200000,
    status: 'Paying'
  },
  {
    id: uuid(),
    ref: 'Việt Nam',
    amount: 32.54,
    customer: {
      name: 'Nguyen Manh Viet'
    },
    createdAt: 1554670800000,
    status: 'Approved'
  },
  {
    id: uuid(),
    ref: 'Việt Nam',
    amount: 16.76,
    customer: {
      name: 'Ho Van Hoai'
    },
    createdAt: 1554670800000,
    status: 'Pending'
  }
];

export const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Orders" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nationality
              </TableCell>
              <TableCell>
                Customer
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell>
                  {format(order.createdAt, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(order.status === 'Paying' && 'success')
                    || (order.status === 'Cancelled' && 'error')
                    || (order.status === 'Pending' && 'warning')
                    || 'primary'}
                  >
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
