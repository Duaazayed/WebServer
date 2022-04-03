const doLogin= function(e){
    e.preventDefault();
    const username= document.getElementById('username').value;
    const password= document.getElementById('password').value;
    Login({
        username: username,
        password: password
    }).then(function(res){
        window.location.href = ".public/src/home.html";

    });
};

const doRegister= function(e){
    e.preventDefault();
    const username= document.getElementById('username').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    Register({
        username: username,
        email: email,
        password: password,
    }).then(function(res){
        window.location.href = './home.html';

    });
};
