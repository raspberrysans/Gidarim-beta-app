import React from "react";
import { useState } from 'react';
import { BiUserCircle, BiLock, BiCalendarAlt, BiRename } from "react-icons/bi";
import { RiKakaoTalkFill, RiGoogleFill, RiMailFill } from "react-icons/ri";
import { FaLine } from "react-icons/fa";
import gidarimLogo from './gidarim_logo.svg';
import together from './together.svg'
import axios from 'axios';
import './App.css';
function App() {
    //setting the initial state of the register form
    const [signin, setSignin] = useState(true);
    const [reg, setReg] = useState({
        userid: "",
        password: "",
        confirm_password: "",
        fullname: "",
        dateOfBirth: "",
        email: ""
    });
    const [iserror, setIsError] = useState(false);
    const [error, setError] = useState({
        userid: "",
        password: "",
        confirm_password:"",
        fullname: "",
        dateOfBirth: "",
        email: ""
    })
    const handleChange = e => {
        setReg(prevState => {
            return{
                ...prevState, [e.target.name]: e.target.value,
            }
        });
      };

    const registerPage = () =>{
        setSignin(false);
    }
    const loginPage = () =>{
        setSignin(true);
    }

    const validate = () => {
        
        console.log(reg.email);
        if(!reg.userid){
            setIsError(true);
            setError({userid: "아이디 입력해주세요."});
        }
        else if(!reg.password){
            setIsError(true);
            setError({password: "비밀번호 입력해주세요."});
        }
        else if (typeof(reg.password) !== "undefined" && reg.password.length < 6) {
            setIsError(true);
            setError({password: "6개 이상 입력해주세요."});
        }
        else if(reg.password !== reg.confirm_password){
            setIsError(true);
            setError({password: "비밀번호가 일치하지 않습니다."});
        }
        else if(!reg.fullname){
            setIsError(true);
            setError({fullname: "이름 입력해주세요."});
        }
        else if(!reg.dateOfBirth){
            setIsError(true);
            setError({dateOfBirth: "생년월일 입력해주세요."});
        }
        else if(reg.email===""){
            setIsError(true);
            setError({email: "이메일 입력해주세요."});
        }
        else{
            setIsError(false);
            setError("");
        }
        return iserror;
    }
    const onRegister = (event) =>{
        event.preventDefault();
        const temp = validate();
        console.log(temp);
        console.log(error);
        console.log(reg)
        if(temp===false){
            const registered = {
                userid: reg.userid,
                password: reg.password,
                fullname: reg.fullname,
                dateOfBirth: reg.dateOfBirth,
                email: reg.email
            }
            console.log(registered);
            axios.post("http://localhost:4000/app/register", registered);

            setReg({
                userid: "",
                password: "",
                confirm_password:"",
                fullname: "",
                dateOfBirth: "",
                email: ""
            });
        }
        
    }
    return (
        <div className="container">
            <div className=""> 
                    {signin ? (
                    <div className="signin">
                        
                        <div className="panel left-panel ">
                        < img src={gidarimLogo} className="image left-img" alt=""/>
                            <div className="content">
                                <h2 className="">기다림</h2>
                                <button className="btn transparent" id="register-btn"
                                onClick={registerPage} >
                                회원가입</button>
                                
                            </div>
                            
                        </div>
                        <form className="signin-form forms-container">
                            <h2 className="title">로그인</h2>
                            <div className="input-field">
                                <BiUserCircle className="icon" />
                                <input type="text" 
                                className="form-control"
                                placeholder="아이디"
                                value = {reg.userid}
                                onChange = {(e) => setReg({userid: e.target.value})}
                                />
                            </div>
                            <div className="input-field">
                                <BiLock className="icon"/>
                                <input type="password" 
                                className="form-control"
                                placeholder="비밀번호"
                                value = {reg.password}
                                onChange = {(e) => setReg({password: e.target.value})}
                                />
                            </div>
                            <input type="submit" value="로그인" className="btn solid"/>
                            <p className="social-text">Or Sign in with</p>
                            <div className="social-media">
                                <RiGoogleFill className="social-icon"/>
                                <RiKakaoTalkFill className="social-icon"/>
                                <FaLine className="social-icon"/>
                            </div>
                            <div className="find-id-pw">
                                <button className="find-id">아이디 찾기</button>
                                <button className="find-pw">비밀번호 찾기</button>
                            </div>
                        </form>
                        
                    </div>
                    )
                    : (
                        <div className="register">
                            <div className="panel right-panel">
                                <div className="content">
                                    <h2>로그인</h2>
                                    <button className="btn transparent" id="register-btn"
                                    onClick={loginPage}>로그인</button>
                                </div>
                                <img src={together} className="image right-img" alt=""/>
                            </div>
                            <form className="register-form register-mode forms-container"
                            onSubmit={onRegister}>
                            <h2 className="title">회원가입</h2>
                                <div className="input-field">
                                    <BiUserCircle className="icon" />
                                    <input type="text" 
                                    className="form-control"
                                    placeholder="아이디"
                                    name="userid"
                                    value = {reg.userid}
                                    onChange={handleChange}/>
                                </div>
                                <div className="input-field">
                                    <BiLock className="icon"/>
                                    <input type="password" 
                                    className="form-control"
                                    placeholder="비밀번호"
                                    name="password"
                                    value = {reg.password}
                                    onChange={handleChange}/>
                                </div>
                                <div className="input-field">
                                    <BiLock className="icon"/>
                                    <input type="password" 
                                    className="form-control"
                                    name="confirm_password"
                                    placeholder="비밀번호 재입력"
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <BiRename className="icon" />
                                    <input type="text" 
                                    className="form-control"
                                    placeholder="이름"
                                    value = {reg.fullname}
                                    name="fullname"
                                    onChange={handleChange}/>
                                </div>
                                <div className="input-field">
                                    <BiCalendarAlt className="icon" />
                                    <input type="date" 
                                    className="form-control"
                                    placeholder="생년월일"
                                    value = {reg.dateOfBirth}
                                    name="dateOfBirth"
                                    onChange={handleChange}/>
                                </div>
                                <div className="input-field">
                                    <RiMailFill className="icon" />
                                    <input type="email" 
                                    className="form-control"
                                    placeholder="이메일 주소"
                                    value = {reg.email}
                                    name="email"
                                    onChange={handleChange}/>
                                </div>
                                {iserror? (
                                <div className="error">
                                   {error.userid}
                                   {error.password}
                                   {error.email}
                                   {error.fullname}
                                   {error.dateOfBirth}
                                 </div>
                                
                                ):(
                                    <div> </div>
                                )}
                                <input type="submit" value="회원가입" className="btn solid"
                                onClick={validate}/>


                                <p className="social-text">Or register with</p>
                                <div className="social-media">
                                    <RiGoogleFill className="social-icon"/>
                                    <RiKakaoTalkFill className="social-icon"/>
                                    <FaLine className="social-icon"/>
                                </div>
                            </form>
                        </div>
                    )
                    }
    
            </div>
            

            
        </div>
    );
    
}
export default App;