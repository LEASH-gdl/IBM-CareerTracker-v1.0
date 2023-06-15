import React from 'react'

function Users(props) {
  return (
    <div>
        <h1>These users are from the API </h1>
        {props.users.map((user) => {
            return (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.mail}</p>
                </div>
            );
        })}
    </div>
  )
}

export default Users