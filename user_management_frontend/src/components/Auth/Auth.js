// import axios from 'axios'

function login() {
    fetch('http://10.30.192.92:3000/oauth/login')
        .then((res) => {
            console.log(res)
            // axios.get(res.data).then(res => console.log(res));
            // return true;
        })
        .catch(error => console.log(error));
}


function Auth() {
  return (
    <div className="App">
      <button onClick={login}>Sign in</button>
    </div>
  );
}

export default Auth;
