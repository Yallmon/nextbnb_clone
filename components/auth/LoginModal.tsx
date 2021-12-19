import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg"
import MailIcon from "../../public/static/svg/input/mail.svg"
import PersonIcon from "../../public/static/svg/input/person.svg"
import OpenedEyeIcon from "../../public/static/svg/input/opened-eye.svg"
import ClosedEyeIcon from "../../public/static/svg/input/closed_eye.svg"

import Button from '../common/Button';
import Input from '../common/Input';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import palette from '../../styles/palette';
import useValidate from '../../hooks/useValidateMode';
import { loginAPI } from '../../lib/api/auth';
import { userActions } from '../../store/user';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .modal-close-x-icon {
      cursor: pointer;
      display: block;
      margin: 0 0 40px auto;
  }
  .login-input-wrapper {
      position: relative;
      margin-botton: 16px;
  }
  .login-password-input-wrapper {
      svg{
          cursor: pointer;
      }
  }
  .login-modal-submit-button-wrapper {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${palette.gray_eb};
  }
  .login-modal-set-signup {
      color: ${palette.dark_cyan};
      margin-left: 8px;
      cursor: pointer;
  }

`;

interface Iprops {
    closeModal: (event: React.MouseEvent<HTMLDivElement>) => void;
};

function LoginModal({closeModal}: Iprops) {
    const dispatch = useDispatch();
    const changeToSignUpModal = () => {
        dispatch(authActions.setAuthMode("signup"));
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPasswordHided, setIsPasswordHided] = useState(true);

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const togglePasswordHiding = () => {
        setIsPasswordHided(!isPasswordHided);
    };

    const {setValidateMode} = useValidate();

    const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // submit tag의 페이지의 새로고침을 막음 
        setValidateMode(true);

        if(!email || !password) {
            alert("이메일과 비밀번호를 입력하세요.");
        } else{
            const loginBody = {email, password};
            try{
                // console.log(await loginAPI(loginBody));
                const{data} = await loginAPI(loginBody);
                dispatch(userActions.setLoggedUser(data));
                alert("로그인이 완료되었습니다.");
            } catch(error){
                console.log(error);
            }
        }
    };

    useEffect(() => {
        return () => {
            setValidateMode(false);
        }
    }, []);

    return ( <Container onSubmit={onSubmitLogin}>
        <CloseXIcon className="modal-close-x-icon" onClick={closeModal}/>
        <div className="login-input-wrapper">
            <Input type="email" placeholder="이메일 주소" icon={<MailIcon/>} onChange={onChangeEmail}
                isValid={!!email}
                errorMessage="이메일이 필요합니다."
            />
        </div>
        <div className="login-input-wrapper login-password-input-wrapper">
            <Input placeholder="비밀번호" 
                icon={isPasswordHided? <ClosedEyeIcon onClick={togglePasswordHiding}/> : <OpenedEyeIcon onClick={togglePasswordHiding}/>}
                type={isPasswordHided? "password": "text"}
                onChange={onChangePassword}
                isValid={!!password}
                errorMessage="비밀번호를 입력하세요."
            />
        </div>
        <div className="login-modal-submit-button-wrapper">
            <Button type="submit"> 로그인 </Button>
        </div>
        <p>
            이미 에어비엔비 계정이 있나요?
            <span className="login-modal-set-signup" onClick={changeToSignUpModal}>회원가입</span>
        </p>
    </Container> );
}

export default LoginModal;