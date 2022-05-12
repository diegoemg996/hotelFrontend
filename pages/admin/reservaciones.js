import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Box, Button, Chip, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { apiDb } from "../../api/apiDb";
import { format, parseISO } from "date-fns";
import { AddCircle } from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "Nombre",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Apellido",
    width: 150,
  },
  {
    field: "arriveDate",
    headerName: "Check-in",
    type: "date",
    width: 100,
  },
  {
    field: "leaveDate",
    headerName: "Check-out",
    type: "date",
    width: 100,
  },
  {
    field: "nameRoom",
    headerName: "Habitación",
    width: 100,
  },
  {
    field: "totalPaid",
    headerName: "Total",
    width: 100,
  },
  {
    field: "isPaid",
    headerName: "Pagado",
    width: 100,
    renderCell: (params) => {
        return (
            params.row.isPaid
            ? <Chip color="success" label="Pagada" variant='outlined' />
            : <Chip color="error" label="No pagada" variant='outlined' />
        )
    }
  }
];

export default function ReservacionesPage() {
  const [reservations, setReservations] = useState([]);

  let dollarUSLocale = Intl.NumberFormat("en-US");

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    try {
      const { data } = await apiDb.get("/reservation/search");
      setReservations(transformData(data.data));
    } catch ({ response }) {
      console.log(response);
    }
  };

  const transformData = (data) => {
    return data.map((reservation) => {
      return {
        id: reservation.reservationCode,
        firstName: reservation.idUser.firstName,
        lastName: reservation.idUser.lastName,
        arriveDate: format(parseISO(reservation.arriveDate), "dd/MM/yyyy"),
        leaveDate: format(parseISO(reservation.leaveDate), "dd/MM/yyyy"),
        totalPaid: dollarUSLocale.format(reservation.totalPaid),
        nameRoom: reservation.idRoom.name,
        isPaid: reservation.isPaid,
      };
    });
  };

  return (
    <AdminLayout
      title={"Hotel Posada Real - Administración"}
      pageDescription={"Disfruta las mejores vacaciones de tu vida"}
    >
      <Container>
        <Box sx={{display: "flex", justifyContent:"flex-end"}}>
        <IconButton 
            color="secondary" 
            aria-label="upload picture" 
            component="span"
        >
            <AddCircle 
                sx={{
                    margin: "0px 10px",
                    padding: "0px",
                    fontSize: "3rem",
                }}
            />
        </IconButton>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={reservations}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Container>
    </AdminLayout>
  );
}
