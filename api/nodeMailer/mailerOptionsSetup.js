function mailerOptionsSetup(userToken, userName) {
    return {

        from: "Corey's Social Media Team",
        to: "lewisc503@gmail.com",
        subject: "CSM Authentication Email",
        html:
            `<h1>Complete your sign up!</h1>
        <a href="https://localhost:8000/verify/email?token=${userToken}?id=${userName}"> 
          Click this link to verify your email address!
        </a>`
    }
};

module.exports = mailerOptionsSetup;