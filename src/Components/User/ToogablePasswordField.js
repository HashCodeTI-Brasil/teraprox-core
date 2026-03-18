import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const ToogablePasswordField = ({ onChangeEvent, callback }) => {
    const [isPasswordSeen, setSeePassword] = useState(false);

    return (
        <Form.Group id='password'>
            <Form.Label>Senha</Form.Label>
            <InputGroup>
                <Form.Control
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') callback();
                    }}
                    type={isPasswordSeen ? 'text' : 'password'}
                    placeholder='entre com sua senha'
                    onChange={(event) => onChangeEvent(event.target.value)}
                />
                <Button variant="outline-secondary" onClick={() => setSeePassword((isSee) => !isSee)}>
                    {isPasswordSeen ? <BsEyeSlash /> : <BsEye />}
                </Button>
            </InputGroup>
        </Form.Group>
    );
};

export default ToogablePasswordField;
