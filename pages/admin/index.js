import { Container, Toolbar } from '@mui/material'
import { AdminLayout } from '../../components/layout/AdminLayout'

const AdminHome = () => {
  return (
    <AdminLayout title={'Hotel Posada Real - Administración'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
        <Toolbar/>
        <Container>
            <p>Hola</p>
        </Container>
    </AdminLayout>
  )
}

export default AdminHome