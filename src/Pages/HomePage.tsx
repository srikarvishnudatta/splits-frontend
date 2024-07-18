import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext'
import { customFetch } from '../api/customFetch';
import './HomePage.css'
import { GroupType } from '../types/types';
import Group from '../components/Group';
import Button from '../components/Button';
import GroupModal from '../components/GroupModal';
import { useGroup } from '../context/GroupContext';

function HomePage() {
    const {id} = useUser();
    const [groups, setGroups] = useState<GroupType[]>([]);
    const { handleModal} = useGroup()
    useEffect(()=>{
        async function fetchData(){
            const response = await customFetch(`/${id}`, "GET")
            if(!response.ok) throw new Error('cannot fetch items');
            const resData = await response.json();
            setGroups(resData)
        }
        fetchData()
    },[]);      
  return (
    <>
    <div className='home-page'>
    <div className='home-page-heading'>
    <h1>Your Groups: </h1>
    <Button borderRadius='1em' text='New' type='button'
    textOnly={false}
    onClick={handleModal}
    />
    </div>
    {groups.length ===0 ? <p>wow such empty</p> : <div className='groups'>
      {groups.map(group => <Group key={group.groupId}{...group}/>)}
      </div>}
    </div>
    <GroupModal/>
    </>
  )
}

export default HomePage