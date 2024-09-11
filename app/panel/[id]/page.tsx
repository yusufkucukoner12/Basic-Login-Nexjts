import { fetchNusersByName } from '../../lib/userData';
import  UserForm  from '../components/UserForm';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const userData = await fetchNusersByName(id);

    if(!userData){
      notFound();
    }

    return (
      <div>
        <h1> Welcome to deneme page</h1>  
        <h2>Name: {userData.name}</h2>
        <h2>Name: {userData.age}</h2>
        <h2>Name: {userData.gender}</h2>


        <UserForm/>
  
      </div>
    );
}