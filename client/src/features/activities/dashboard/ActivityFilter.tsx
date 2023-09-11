import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size="large" style={{ width:'100%', marginTop:30}}>
                <Header icon={'filter'} attached color="teal" content='Filtros' />
                <Menu.Item content='Todas Atividades' />
                <Menu.Item content='Hospede' />
                <Menu.Item content='Anfitrião' />
            </Menu>
            <Header />
            <Calendar/>
        </>

    )
}