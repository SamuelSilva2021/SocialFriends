import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


export default function NavBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    ConnectFriends
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Atividades" />
                <Menu.Item as={NavLink} to='/errors' name="Erros" />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Criar Atividade' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
