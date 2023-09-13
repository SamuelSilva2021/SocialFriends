import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Ops, procuramos em todos os lugares, mas não encontramos o que você procura!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Voltar para pagina de atividades
                </Button>
            </Segment.Inline>
        </Segment>
    )
}