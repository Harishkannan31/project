import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{ }}>
        <Card.Img variant="top" style={{height:'450px',width:'500px',display: 'flex', justifyContent: 'center', alignItems: 'center'}} src="https://higherlogicdownload.s3.amazonaws.com/NLA/6afabec0-4411-463d-8243-8e55e4dc4e2b/UploadedImages/phone-login-trouble.png" />
        <Card.Body>
          <Card.Title><h3>Welcome To Learny..!!</h3></Card.Title>
          <a href='http://localhost:3000/login'><Button style={{color:'white',textDecoration:'none'}}>
          Click Here to Login</Button></a>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BasicExample;

