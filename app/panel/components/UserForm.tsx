'use client';

import { findUser, State } from '../../lib/actions';
import { useActionState } from 'react';

export default function UserForm() {  
  const initialState: State = { message: null};


  const [state, formAction] = useActionState(findUser, initialState);


  return (
    <>
      <form action={formAction}>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      {state.message && <p>{state.message}</p>}

    </>
  );
}


/**
'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function UserForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const term = e.target.querySelector('input[type="text"]').value; // Get the input value

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    replace(`/deneme/?${params.toString()}`);

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={searchParams.get('query')?.toString()}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Submit</button>
      </form>      
    </>
  );
}
 */

/*function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const term = e.target.querySelector('input[type="text"]').value; // Get the input value

    // Check if the input value is not empty
    if (term) {
      replace(`/${term}`); // Navigate to a route based on the input value
    } else {
      replace(`/`); // Navigate to the root if the input is empty
    }
  }
    */