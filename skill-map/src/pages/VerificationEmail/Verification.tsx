import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { verify, send_code_in_email } from '../../api/api'
import { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {AppContext} from '../../App'

function VerificationPage() {
  const context = useContext(AppContext)!
  let [codeTimeot, setCodeTimeot] = useState<number>(60);
  let {error, isLoading, setError, setIsLoading} = context
  let navigate = useNavigate()

  const sentRef = useRef(false);
  const email = localStorage.getItem("verifyEmail");

  const onSendCode = async() =>{
    setIsLoading(true);
    const response = await send_code_in_email(email)
    setIsLoading(false);
    if (response.ok == false){
        setError({isError: true, detail: response.detail});
        return
    }
    setCodeTimeot(60);
  }

  const onFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({isError: false, detail: undefined});
    
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string
    setIsLoading(true);
    const response = await verify(email, password)
    setIsLoading(false);
    if (response.ok == false){
        setError({isError: true, detail: response.detail});
        return
    }
    localStorage.removeItem("verifyEmail")
    navigate("/login");
  }
  
  useEffect(()=>{
    if (!email) {
        navigate("/reg");
        return;
    }
    if (sentRef.current) return;
    sentRef.current = true;
    onSendCode()
    }, [])

    useEffect(() => {
        if (codeTimeot <= 0) return;

        const interval = setInterval(() => {
            setCodeTimeot((prev: number) => {
            if (prev <= 1) {
                clearInterval(interval);
                return 0;
            }
            return prev - 1;
            });
        }, 1000 );
        return () => clearInterval(interval);
    }, [codeTimeot]);

  return (
    <div className="form-container">
      <Card className="form-card">
        <Card.Body>
          {error.isError && 
          (<Alert key="danger" variant="danger">
            {error?.detail ? error.detail: "Неизвестная ошибка!"}
          </Alert>)
          }
          <Card.Title className="text-center mb-4">
            Подтвердите почту
          </Card.Title>
          
          <Form onSubmit={onFormSubmit} className="basic-form">
            <Col xs="auto">
            <Form.Control
                className="mb-2"
                id="inlineFormInput"
                name="password"
                placeholder="Введите код из письма"
            />
            </Col>
            <Button
                variant="success"
                type="submit" 
                className="submit-button w-100 mb-3" 
                disabled={isLoading}
            >
                {!isLoading ? "Подтвердить" : "Подождите..."}
            </Button>
             {codeTimeot == 0 ? (
                    <>
                       <Link onClick={async()=>{
                            onSendCode()
                        }} to="#" >
                        
                            <p>Отправить код повторно</p>
                        </Link>
                    </>
                ) : (<p> Отправить код повторно через {codeTimeot}</p>)}
            
          </Form>

        </Card.Body>
      </Card>
    </div>
  )
}

export default VerificationPage


