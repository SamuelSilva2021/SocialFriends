import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
      console.log(activities)
    }).catch(error => {
      console.error(error)
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='ConnectFriends'/>
        <List>{activities.map((activitie: any) => (
          <List.Item key={activitie.id}>
            {activitie.title}
          </List.Item>
        ))}</List>   
    </div>
  )
}

export default App
