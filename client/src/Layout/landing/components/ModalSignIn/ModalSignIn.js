import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from "react-router-dom";
import './ModalSignIn.scss'
import axios from 'axios'
import {connect} from 'react-redux'
import {hideModalLogin} from '../../../../redux/actions/menuActionsFuncs'
import {checkIsAuth} from '../../../../redux/actions/authActionsFuncs'


const ModalSignIn = props => {
  const refToPassInput = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState({ error: null, isError: false })
  const history = useHistory()


  useEffect(() => {
    if (showPassword) {
      refToPassInput.current.setAttribute('type', 'text')
    } else {
      refToPassInput.current.setAttribute('type', 'password')
    }
  }, [showPassword])


  const onFormSubmit = event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    if (username.trim() && password.trim()) {

      try {
        axios
          .post('https://reqres.in/api/login', { email: username, password })
          .then(res => {
            if (+res.status === 200 && res.data.token) {
              localStorage.setItem('token', res.data.token)
              setShowError({
                error: null,
                isError: false
              })
              props.onHideLoginModal()
              props.isAuth(true)
              history.push('/student')
            } else {
              setShowError({
                error: res,
                isError: true
              })
            }
          })
          .catch(err => {
            if (err.response) {
              setShowError({
                error: err.response.data.error,
                isError: true
              })
            }
          })
      } catch (e) {
        console.log(e)
      }

    }
  }

  const onOverlayClick = event => {
    if (event.target.classList.contains('modalActive')) {
      props.onHideLoginModal()
    }
  }


  return (
    <div onClick={onOverlayClick} className={['modalSignIn__overlay', props.showLoginModal ? 'modalActive' : null].join(' ')}>
      <div className="modalSignIn">
        <h3 className="modalSignIn__title">Кіру</h3>
        <p className="modalSignIn__text">
          <span className="modalSignIn__red">Қош келдіңіз! </span>
          Кіру үшін мәліметтерді енгізіңіз.
        </p>

        {
          showError.isError
            ? <p className="modalSignIn__text">
                <span className="modalSignIn__red">{showError.error}</span>
              </p>
            : null
        }

        <form onSubmit={onFormSubmit} className="modalSignIn__form SignInform">

          <label htmlFor="phoneSignIn" className="SignInform__label SignInform__label__phone">phone</label>
          <input
            defaultValue="eve.holt@reqres.in"
            required className="SignInform__phone SignInform__input"
            id="phoneSignIn" name="username"
            type="text" placeholder="+7(7__)-___-__-__"
          />

          <label  htmlFor="passSignIn"
                 className="SignInform__label">
            <span onClick={() => setShowPassword(prev => !prev)} className={['SignInform__label__eye', showPassword ? 'active' : null].join(' ')}>
              <span>Password</span>
            </span>
            <input
              defaultValue="cityslicka"
              ref={refToPassInput} required id="passSignIn"
              className="SignInform__password SignInform__input"
              name="password" type="password" placeholder="Құпиясөз"
            />
          </label>
          {/*<input id="passSignIn" className="SignInform__password SignInform__input" name="password" type="text" placeholder="Құпиясөз"/>*/}

          <div className="SignInform__questions questionsSignIn">

            <div className="questionsSignIn__remember">
              <input className="remember" id="SignInformRemember" type="checkbox"/>
              <label htmlFor="SignInformRemember">Есте сақтау</label>
            </div>

            <a href="/resetPassword" className="questionsSignIn__reset">Құпиясөзді ұмыттыңыз ба?</a>

          </div>

          <button type="submit" className="SignInform__button">Кіру</button>

        </form>

      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    ...state.menu
  }
}


const matchDispatchToProps = dispatch => {
  return {
    onHideLoginModal: () => dispatch(hideModalLogin()),
    isAuth: boolean => dispatch(checkIsAuth(!!boolean))
  }
}


export default connect(mapStateToProps, matchDispatchToProps)(ModalSignIn)