import React from 'react' 

const User = ({ user }) => {
    return (
        <div>
            <div>
                {`${user.name} you\'re signed in'`}
            </div>
        </div>
    )
}

export default User