import React from 'react' 

const User = ({ user }) => {
    console.log(user)
    return (
        <div>
            <div>
                {`${user.name} you\'re signed in'`}
            </div>
        </div>
    )
}

export default User